// WebSocket 操作类
class WebSocketOperator {
    url;
    ws;
    heartbeatInterval = 5000; // 心跳间隔
    heartbeatData = "ping"; // 客户端心跳数据
    #heartbeatResult = "pong"; // 服务端心跳回应数据
    #heartbeatTimeout = null; // 心跳定时器(私有属性)
    heartbeatNum = 0; // 心跳次数
    defaultReconnectInterval = 2000; // 默认重试间隔
    reconnectInterval = this.defaultReconnectInterval; // 重试间隔(会随着重试次数变快)
    maxReconnectionNum = 5; // 最大失败重试次数
    #currentReconnectionNum = 0; // 当前已重试次数(私有属性)
    #reconnectionTimeout = null; // 重试定时器(私有属性)
    #isDestroy = false; // 是否已销毁(私有属性)
    // 临时存储重新连接的 WebSocket 实例(类静态属性)
    static reconnectionInstance = null;
    static isDebug = false; // 是否打印log(类静态属性)
    constructor(url) {
        this.url = url;
        this.ws = new WebSocket(url);
        this.init();
    }
    // WebSocket 兼容性判断
    static isCompatibleWebSocket(listener) {
        let error;
        if (!window.WebSocket) {
            error = new Error("抱歉 你的设备不支持 WebSocket 请下载 Chrome 浏览器");
            WebSocketOperator.log("userAgent: ", navigator.userAgent);
        }
        listener && listener(error);
    }
    static log(...msg) {
        if (WebSocketOperator.isDebug) {
            console.log(...msg);
        }
    }
    init() {
        // 绑定内部处理事件
        this.bindEvent("onopen", this.$onopenOperator)
            .bindEvent("onmessage", this.$onmessageOperator)
            .bindEvent("onclose", this.$oncloseOperator)
            .bindEvent("onerror", this.$onerrorOperator);
    }
    // 默认事件回调(会在 WebSocket 对应的时候被触发)
    onopen(ws) { }
    onmessage(ws) { }
    onclose(ws) { }
    onerror(ws) { }
    // 内部提供事件回调
    onheartbeat(ws) { } // 心跳事件
    onreconnection(ws) { } // 连接重试事件
    ondestroy(ws) { } // 销毁事件
    onmaxReconnection(ws) { } // 达到最大重试事件
    // 通用绑定事件方法
    bindEvent(event, listener) {
        // 需要绑定 this 不然在对应的回调里面的 this 就是 WebSocket
        this.ws[event] = listener.bind(this);
        return this;
    }
    // 触发对应的事件回调
    $triggerFn(key, event) {
        const wsState = this.getWebSocketState();
        this[key]({ ...wsState, event });
    }
    // WebSocket 实例打开事件
    $onopenOperator(e) {
        const wsState = this.getWebSocketState();
        if (wsState.alive) {
            // 触发打开事件
            this.$triggerFn("onopen", e);
            // 当前已连接延迟到下一次发送心跳
            this.#heartbeatTimeout = setTimeout(() => {
                this.startHeartbeat();
            }, this.getHeartbeatInterval());
        }
        else {
            // 触发失败事件
            this.$triggerFn("onerror", e);
            if (!this.#isDestroy && !this.#reconnectionTimeout) {
                // 连接失败立即重试
                this.reconnection(16);
            }
        }
    }
    // WebSocket 接受数据事件
    $onmessageOperator(e) {
        // 触发message事件
        this.$triggerFn("onmessage", e);
        if (e instanceof MessageEvent) {
            const data = e.data;
            if (typeof data === "string") {
                if (data === this.#heartbeatResult) {
                    WebSocketOperator.log("收到服务端心跳回应: ", data);
                }
            }
            else if (data instanceof Blob) {
                // data.text().then(text => { });
                WebSocketOperator.log("收到服务端二进制对象数据: ", data);
            }
            else if (data instanceof ArrayBuffer) {
                WebSocketOperator.log("收到服务端二进制数组数据: ", data);
            }
            WebSocketOperator.log("client的数据是: ", data, this);
        }
    }
    // WebSocket 取消连接事件
    $oncloseOperator(e) {
        this.$triggerFn("onclose", e);
        this.endHeartbeat();
        this.endReconnection();
        WebSocketOperator.log("client close", e);
    }
    // WebSocket 错误事件
    $onerrorOperator(e) {
        this.$triggerFn("onerror", e);
        this.endHeartbeat();
        WebSocketOperator.log("client error", e);
        if (!this.#isDestroy && !this.#reconnectionTimeout) {
            // 连接失败立即重试
            this.#currentReconnectionNum++;
            this.reconnection(16);
        }
    }
    // 发送数据
    send(msg) {
        return new Promise((resolve, reject) => {
            const wsState = this.getWebSocketState();
            let err;
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
            }
            ;
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
    close(code, reason) {
        this.destroy(code, reason);
    }
    // 获取 WebSocket 的状态
    getWebSocketState() {
        const ws = this.getWebSocket();
        let ret = {
            alive: false,
            message: "",
            ws,
            readyState: ws.readyState,
        };
        switch (ws.readyState) {
            case WebSocket.CONNECTING: // 0
                ret = { ...ret, message: "正在连接中" };
                break;
            case WebSocket.OPEN: // 1
                ret = { ...ret, alive: true, message: "已经连接并且可以通讯" };
                break;
            case WebSocket.CLOSING: // 2
                ret = { ...ret, message: "连接正在关闭" };
                break;
            case WebSocket.CLOSED: // 3
                ret = { ...ret, message: "连接已关闭或者连接没有成功" };
                break;
            default:
                ret = { ...ret, message: "意料之外的 readyState" };
                break;
        }
        return ret;
    }
    // 发送心跳
    startHeartbeat() {
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
    endHeartbeat() {
        if (this.#heartbeatTimeout) {
            WebSocketOperator.log(`心跳停止, 一共发送心跳数: ${this.getHeartbeatNum()}`);
            this.setHeartbeatNum(0);
            clearInterval(this.#heartbeatTimeout);
            this.#heartbeatTimeout = null;
        }
    }
    // 重新创建实例
    reconnection(interval, url) {
        if (url && url.trim()) {
            this.setUrl(url);
        }
        ;
        // 重新创建实例
        const ws = WebSocketOperator.reconnectionInstance = new WebSocket(this.url);
        this.$triggerFn("onreconnection", new Event("reconnection"));
        const maxReconnectionNum = this.getMaxReconnectionNum();
        const reconnectInterval = this.getReconnectInterval();
        if (ws) {
            ws.onopen = (e) => {
                if (ws.readyState === WebSocket.OPEN) {
                    this.setWebSocket(ws);
                    this.init();
                    WebSocketOperator.log("WebSocket 已重试连接上");
                    // 重置重新连接的状态
                    this.endReconnection();
                    // 触发 WebSocketOperator 实例的 onopen 事件(开启心跳)
                    this.$triggerFn("onopen", e);
                }
            };
            ws.onerror = (e) => {
                if (this.#isDestroy || this.#currentReconnectionNum++ >= maxReconnectionNum) {
                    WebSocketOperator.log(`已到达最大重试次数 ${maxReconnectionNum} 或 已失活`);
                    this.$triggerFn("onmaxReconnection", new Event("maxReconnection"));
                    if (!this.#isDestroy)
                        this.destroy();
                }
                else {
                    // 加速频率
                    this.calcReconnectionInterval();
                    this.#reconnectionTimeout = setTimeout(() => {
                        WebSocketOperator.log(`正在重新连接...
                  当前重试次数数: ${this.#currentReconnectionNum}, 
                  最大重试次数: ${maxReconnectionNum}, 
                  当前重试频率: ${reconnectInterval}`);
                        // 重新创建实例
                        this.reconnection();
                    }, interval || this.getReconnectInterval());
                }
            };
        }
    }
    // 停止重试
    endReconnection() {
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
    calcReconnectionInterval() {
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
    destroy(code, reason) {
        WebSocketOperator.log("WebSocketOperator destroy");
        this.getWebSocket().close(code, reason);
        this.#isDestroy = true;
        this.endHeartbeat();
        this.endReconnection();
        this.$triggerFn("ondestroy", new Event("destroy"));
    }
    //// WebSocket getter / setter ////
    getWebSocket() {
        return this.ws;
    }
    setWebSocket(ws) {
        this.ws = ws;
    }
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
    getBinaryType() {
        return this.ws.binaryType;
    }
    setBinaryType(type) {
        this.ws.binaryType = type;
    }
    getProtocol() {
        return this.ws.protocol;
    }
    getExtensions() {
        return this.ws.extensions;
    }
    getBufferedAmount() {
        return this.ws.bufferedAmount;
    }
    //// getter / setter //// 
    // heartbeat
    getHeartbeatInterval() {
        return this.heartbeatInterval;
    }
    setHeartbeatInterval(heartbeatInterval) {
        this.heartbeatInterval = heartbeatInterval;
    }
    getHeartbeatNum() {
        return this.heartbeatNum;
    }
    setHeartbeatNum(heartbeatNum) {
        this.heartbeatNum = heartbeatNum;
    }
    getHeartbeatData() {
        return this.heartbeatData;
    }
    setHeartbeatData(heartbeatData) {
        this.heartbeatData = heartbeatData;
    }
    // reconnection
    getDefaultReconnectInterval() {
        return this.defaultReconnectInterval;
    }
    setDefaultReconnectInterval(defaultReconnectInterval) {
        this.defaultReconnectInterval = defaultReconnectInterval;
    }
    getReconnectInterval() {
        return this.reconnectInterval;
    }
    setReconnectInterval(reconnectInterval) {
        this.reconnectInterval = reconnectInterval;
    }
    getMaxReconnectionNum() {
        return this.maxReconnectionNum;
    }
    setMaxReconnectionNum(maxReconnectionNum) {
        this.maxReconnectionNum = maxReconnectionNum;
    }
}
export default WebSocketOperator;
