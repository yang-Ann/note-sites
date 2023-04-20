type EventObjType = { event: Event };

// WebSocket 操作类
export default class WebSocketOperator {

  public ws: WebSocket;
  public heartbeatInterval: number = 5000; // 心跳间隔
  public heartbeatData: string = "ping"; // 客户端心跳数据
  #heartbeatResult: string = "pong"; // 服务端心跳回应数据
  #heartbeatTimeout: NodeJS.Timeout | null = null; // 心跳定时器(私有属性)
  heartbeatNum: number = 0; // 心跳次数

  public defaultReconnectInterval: number = 2000; // 默认重试间隔
  public reconnectInterval: number = this.defaultReconnectInterval; // 重试间隔(会随着重试次数变快)
  public maxReconnectionNum: number = 5; // 最大失败重试次数
  #currentReconnectionNum: number = 0; // 当前已重试次数(私有属性)
  #reconnectionTimeout: NodeJS.Timeout | null = null; // 重试定时器(私有属性)

  #isDestroy: boolean = false; // 是否已销毁(私有属性)

  // 临时存储重新连接的 WebSocket 实例(类静态属性)
  private static reconnectionInstance: WebSocket | null = null;

  private static isDebug: boolean = false; // 是否打印log(类静态属性)

  public constructor(public url: string) {
    this.ws = new WebSocket(url);

    this.init();
  }

  // WebSocket 兼容性判断
  public static isCompatibleWebSocket(listener?: (err: Error | void) => void) {
    let error: Error | void;
    if (!window.WebSocket) {
      error = new Error("抱歉 你的设备不支持 WebSocket 请下载 Chrome 浏览器");
      WebSocketOperator.log("userAgent: ", navigator.userAgent);
    }
    listener && listener(error);
  }

  private static log(...msg: unknown[]): void {
    if (WebSocketOperator.isDebug) {
      console.log(...msg);
    }
  }

  protected init() {
    // 绑定内部处理事件
    this.bindEvent("onopen", this.$onopenOperator)
      .bindEvent("onmessage", this.$onmessageOperator)
      .bindEvent("onclose", this.$oncloseOperator)
      .bindEvent("onerror", this.$onerrorOperator);
  }

  // 默认事件回调(会在 WebSocket 对应的时候被触发)
  public onopen(ws: WebSocketState & EventObjType) { }
  public onmessage(ws: WebSocketState & EventObjType) { }
  public onclose(ws: WebSocketState & EventObjType) { }
  public onerror(ws: WebSocketState & EventObjType) { }

  // 内部提供事件回调
  public onheartbeat(ws: WebSocketState & EventObjType) { } // 心跳事件
  public onreconnection(ws: WebSocketState & EventObjType) { } // 连接重试事件
  public ondestroy(ws: WebSocketState & EventObjType) { } // 销毁事件
  public onmaxReconnection(ws: WebSocketState & EventObjType) { } // 达到最大重试事件

  // 通用绑定事件方法
  protected bindEvent(event: WebSocketEvent, listener: (e: Event | MessageEvent<any> | CloseEvent | any) => void): this {
    // 需要绑定 this 不然在对应的回调里面的 this 就是 WebSocket
    this.ws[event] = listener.bind(this);
    return this;
  }

  // 触发对应的事件回调
  protected $triggerFn(
    key: WebSocketEvent | "onreconnection" | "onheartbeat" | "ondestroy" | "onmaxReconnection", 
    event: Event
  ) {
    const wsState = this.getWebSocketState();
    this[key]({ ...wsState, event });
  }

  // WebSocket 实例打开事件
  protected $onopenOperator(e: Event): void {
    const wsState = this.getWebSocketState();
    if (wsState.alive) {
      // 触发打开事件
      this.$triggerFn("onopen", e);

      // 当前已连接延迟到下一次发送心跳
      this.#heartbeatTimeout = setTimeout(() => {
        this.startHeartbeat();
      }, this.getHeartbeatInterval());
    } else {
      // 触发失败事件
      this.$triggerFn("onerror", e);

      if (!this.#isDestroy && !this.#reconnectionTimeout) {
        // 连接失败立即重试
        this.reconnection(16);
      }
    }
  }

  // WebSocket 接受数据事件
  protected $onmessageOperator(e: Event | MessageEvent<any>): void {
    // 触发message事件
    this.$triggerFn("onmessage", e);

    if (e instanceof MessageEvent) {
      const data: sendType = e.data;
      if (typeof data === "string") {
        if (data === this.#heartbeatResult) {
          WebSocketOperator.log("收到服务端心跳回应: ", data);
        }
      } else if (data instanceof Blob) {
        // data.text().then(text => { });
        WebSocketOperator.log("收到服务端二进制对象数据: ", data);
      } else if (data instanceof ArrayBuffer) {
        WebSocketOperator.log("收到服务端二进制数组数据: ", data);
      }
      WebSocketOperator.log("client的数据是: ", data, this);
    }
  }

  // WebSocket 取消连接事件
  protected $oncloseOperator(e: CloseEvent): void {
    this.$triggerFn("onclose", e);
    this.endHeartbeat();
    this.endReconnection();
    WebSocketOperator.log("client close", e);
  }

  // WebSocket 错误事件
  protected $onerrorOperator(e: Event): void {
    this.$triggerFn("onerror", e);
    this.endHeartbeat();
    WebSocketOperator.log("client error", e);
    if (!this.#isDestroy && !this.#reconnectionTimeout) {
      // 连接失败立即重试
      this.#currentReconnectionNum++
      this.reconnection(16);
    }
  }

  // 发送数据
  public send(msg: sendType): Promise<Error | void> {
    return new Promise((resolve, reject) => {
      const wsState = this.getWebSocketState();
      let err: Error | void;
      if (!wsState.alive) {
        err = new Error(wsState.message);
      }
      if (err instanceof Error) {
        if (!this.#isDestroy && !this.#reconnectionTimeout) {
          // 发送数据失败立即重试
          this.reconnection(16);
        }
        reject(err);
        return;
      };
      this.getWebSocket().send(msg);
      resolve();
    });
  }

  // public send(msg: sendType, listner?: (err: Error | void) => void) {
  //   const wsState = this.getWebSocketState();
  //   let err: Error | void;
  //   if (!wsState.alive) {
  //     err = new Error(wsState.message);
  //   }
  //   listner && listner(err);
  //   if (err instanceof Error) {
  //     if (!this.#isDestroy && !this.#reconnectionTimeout) {
  //       // 发送数据失败立即重试
  //       this.reconnection(16);
  //     }
  //     return;
  //   };
  //   this.getWebSocket().send(msg);
  // }


  // 关闭 WebSocket
  public close(code?: number, reason?: string) {
    this.destroy(code, reason);
  }

  // 获取 WebSocket 的状态
  public getWebSocketState() {
    const ws = this.getWebSocket();
    let ret: WebSocketState = {
      alive: false, // 当前是否存活
      message: "",
      ws,
      readyState: ws.readyState,
    }
    switch (ws.readyState) {
      case WebSocket.CONNECTING: // 0
        ret = { ...ret, message: "正在连接中" }
        break;
      case WebSocket.OPEN: // 1
        ret = { ...ret, alive: true, message: "已经连接并且可以通讯" }
        break;
      case WebSocket.CLOSING: // 2
        ret = { ...ret, message: "连接正在关闭" }
        break;
      case WebSocket.CLOSED: // 3
        ret = { ...ret, message: "连接已关闭或者连接没有成功" }
        break;
      default:
        ret = { ...ret, message: "意料之外的 readyState" }
        break;
    }
    return ret;
  }

  // 发送心跳
  public startHeartbeat(): void {
    const heartbeatInterval = this.getHeartbeatInterval();
    const heartbeatData = this.getHeartbeatData();

    this.#heartbeatTimeout = setInterval(() => {
      this.heartbeatNum++;
      WebSocketOperator.log(`发送心跳, 当前心跳数: ${this.getHeartbeatNum()}`);
      this.$triggerFn("onheartbeat", new Event("heartbeat"));
      this.send(heartbeatData);
    }, heartbeatInterval);
  }

  // 停止心跳
  public endHeartbeat(): void {
    if (this.#heartbeatTimeout) {
      WebSocketOperator.log(`心跳停止, 一共发送心跳数: ${this.getHeartbeatNum()}`);
      this.setHeartbeatNum(0);
      clearInterval(this.#heartbeatTimeout);
      this.#heartbeatTimeout = null;
    }
  }

  // 重新创建实例
  public reconnection(interval?: number, url?: string): void {
    if (url && url.trim()) {
      this.setUrl(url);
    };
    
    // 重新创建实例
    const ws = WebSocketOperator.reconnectionInstance = new WebSocket(this.url);
    this.$triggerFn("onreconnection", new Event("reconnection"));
    const maxReconnectionNum = this.getMaxReconnectionNum();
    const reconnectInterval = this.getReconnectInterval();
    if (ws) {
      ws.onopen = (e: Event) => {
        if (ws.readyState === WebSocket.OPEN) {
          this.setWebSocket(ws);
          this.init();
          WebSocketOperator.log("WebSocket 已重试连接上");
          // 重置重新连接的状态
          this.endReconnection();
          // 触发 WebSocketOperator 实例的 onopen 事件(开启心跳)
          this.$triggerFn("onopen", e);
        }
      }
      ws.onerror = (e: Event) => {
        if (this.#isDestroy || this.#currentReconnectionNum++ >= maxReconnectionNum) {
          WebSocketOperator.log(`已到达最大重试次数 ${maxReconnectionNum} 或 已失活`);
          this.$triggerFn("onmaxReconnection", new Event("maxReconnection"));
          if (!this.#isDestroy) this.destroy();
        } else {
          // 加速频率
          this.calcReconnectionInterval();
          this.#reconnectionTimeout = setTimeout(() => {
            WebSocketOperator.log(
              `正在重新连接...
                  当前重试次数数: ${this.#currentReconnectionNum}, 
                  最大重试次数: ${maxReconnectionNum}, 
                  当前重试频率: ${reconnectInterval}`);

            // 重新创建实例
            this.reconnection();
          }, interval || this.getReconnectInterval());
        }
      }
    }
  }

  // 停止重试
  public endReconnection(): void {
    WebSocketOperator.log("停止重新连接");
    if (this.#reconnectionTimeout) {
      WebSocketOperator.reconnectionInstance = null;
      clearTimeout(this.#reconnectionTimeout);
      // 重置状态
      this.#currentReconnectionNum = 0;
      this.setReconnectInterval(this.getDefaultReconnectInterval());
      this.#reconnectionTimeout = null;
    }
  }

  // 根据重试次数计算重试间隔
  public calcReconnectionInterval(): number {
    const maxReconnectionNum = this.getMaxReconnectionNum();
    const reconnectInterval = this.getReconnectInterval();
    // 剩余次数
    const restNum = maxReconnectionNum - this.#currentReconnectionNum;
    // 占总数的多少比例
    const probability = restNum / maxReconnectionNum;
    // 新的重试间隔
    const newReconnectInterval = reconnectInterval * probability;
    this.setReconnectInterval(newReconnectInterval);
    return newReconnectInterval;
  }

  // 销毁
  public destroy(code?: number, reason?: string) {
    WebSocketOperator.log("WebSocketOperator destroy");
    this.getWebSocket().close(code, reason);
    this.#isDestroy = true;
    this.endHeartbeat();
    this.endReconnection();
    this.$triggerFn("ondestroy", new Event("destroy"));
  }

  //// WebSocket getter / setter ////
  public getWebSocket(): WebSocket {
    return this.ws;
  }
  public setWebSocket(ws: WebSocket): void {
    this.ws = ws;
  }
  public getUrl(): string {
    return this.url;
  }
  public setUrl(url: string): void {
    this.url = url;
  }
  public getBinaryType(): BinaryType {
    return this.ws.binaryType;
  }
  public setBinaryType(type: BinaryType): void {
    this.ws.binaryType = type;
  }
  public getProtocol(): string {
    return this.ws.protocol;
  }
  public getExtensions(): string {
    return this.ws.extensions;
  }
  public getBufferedAmount(): number {
    return this.ws.bufferedAmount;
  }

  //// getter / setter //// 

  // heartbeat
  public getHeartbeatInterval(): number {
    return this.heartbeatInterval;
  }
  public setHeartbeatInterval(heartbeatInterval: number): void {
    this.heartbeatInterval = heartbeatInterval;
  }
  public getHeartbeatNum(): number {
    return this.heartbeatNum;
  }
  public setHeartbeatNum(heartbeatNum: number): void {
    this.heartbeatNum = heartbeatNum;
  }
  public getHeartbeatData(): string {
    return this.heartbeatData
  }
  public setHeartbeatData(heartbeatData: string): void {
    this.heartbeatData = heartbeatData;
  }

  // reconnection
  public getDefaultReconnectInterval(): number {
    return this.defaultReconnectInterval;
  }
  public setDefaultReconnectInterval(defaultReconnectInterval: number): void {
    this.defaultReconnectInterval = defaultReconnectInterval;
  }
  public getReconnectInterval(): number {
    return this.reconnectInterval;
  }
  public setReconnectInterval(reconnectInterval: number): void {
    this.reconnectInterval = reconnectInterval;
  }
  public getMaxReconnectionNum(): number {
    return this.maxReconnectionNum;
  }
  public setMaxReconnectionNum(maxReconnectionNum: number): void {
    this.maxReconnectionNum = maxReconnectionNum;
  }
}