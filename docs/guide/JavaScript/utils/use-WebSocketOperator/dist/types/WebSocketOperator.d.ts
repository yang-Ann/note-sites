export default class WebSocketOperator {
    #private;
    ws: WebSocket;
    url: string;
    heartbeatInterval: number;
    heartbeatData: string;
    heartbeatNum: number;
    defaultReconnectInterval: number;
    reconnectInterval: number;
    maxReconnectionNum: number;
    private static reconnectionInstance;
    private static isDebug;
    constructor(url: string);
    static isCompatibleWebSocket(listener?: (err: Error | void) => void): void;
    private static log;
    protected init(): void;
    onopen(ws: WebSocketState & {
        event: Event;
    }): void;
    onmessage(ws: WebSocketState & {
        event: Event;
    }): void;
    onclose(ws: WebSocketState & {
        event: Event;
    }): void;
    onerror(ws: WebSocketState & {
        event: Event;
    }): void;
    onheartbeat(ws: WebSocketState & {
        event: Event;
    }): void;
    onreconnection(ws: WebSocketState & {
        event: Event;
    }): void;
    ondestroy(ws: WebSocketState & {
        event: Event;
    }): void;
    onmaxReconnection(ws: WebSocketState & {
        event: Event;
    }): void;
    protected bindEvent(event: WebSocketEvent, listener: (e: Event | MessageEvent<any> | CloseEvent | any) => void): this;
    protected $triggerFn(key: WebSocketEvent | "onreconnection" | "onheartbeat" | "ondestroy" | "onmaxReconnection", event: Event): void;
    protected $onopenOperator(e: Event): void;
    protected $onmessageOperator(e: Event | MessageEvent<any>): void;
    protected $oncloseOperator(e: CloseEvent): void;
    protected $onerrorOperator(e: Event): void;
    send(msg: sendType): Promise<Error | void>;
    close(code?: number, reason?: string): void;
    getWebSocketState(): WebSocketState;
    startHeartbeat(): void;
    endHeartbeat(): void;
    reconnection(interval?: number, url?: string): void;
    endReconnection(): void;
    calcReconnectionInterval(): number;
    destroy(code?: number, reason?: string): void;
    getWebSocket(): WebSocket;
    setWebSocket(ws: WebSocket): void;
    getUrl(): string;
    setUrl(url: string): void;
    getBinaryType(): BinaryType;
    setBinaryType(type: BinaryType): void;
    getProtocol(): string;
    getExtensions(): string;
    getBufferedAmount(): number;
    getHeartbeatInterval(): number;
    setHeartbeatInterval(heartbeatInterval: number): void;
    getHeartbeatNum(): number;
    setHeartbeatNum(heartbeatNum: number): void;
    getHeartbeatData(): string;
    setHeartbeatData(heartbeatData: string): void;
    getDefaultReconnectInterval(): number;
    setDefaultReconnectInterval(defaultReconnectInterval: number): void;
    getReconnectInterval(): number;
    setReconnectInterval(reconnectInterval: number): void;
    getMaxReconnectionNum(): number;
    setMaxReconnectionNum(maxReconnectionNum: number): void;
}
