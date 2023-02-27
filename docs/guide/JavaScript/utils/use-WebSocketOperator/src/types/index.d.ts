declare type WebSocketState = {
  alive: boolean;
  message: string;
  ws: WebSocket,
  readyState: WebSocket["CLOSED"] | 
              WebSocket["CLOSING"] | 
              WebSocket["CONNECTING"] | 
              WebSocket["OPEN"];

}

declare type WebSocketEvent = "onopen" | "onclose" | "onerror" | "onmessage";

declare type sendType = string | ArrayBufferLike | Blob | ArrayBufferView