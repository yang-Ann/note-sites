import { IncomingMessage } from 'http';
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';


const PORT = 8888;

const socketServer = new WebSocketServer({
  port: PORT,
  path: "/ws-test"
});

// console.log("当前已连接的ws实例: ", socketServer.clients);
// socketServer.clients.forEach(client => {
//   // 给已连接的所有ws实例发送数据
//   if (client.readyState === WebSocket.OPEN) {
//     client.send("广播数据");
//   }
// });

socketServer.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  // nginx 代理后
  // const ip = req.headers['x-forwarded-for'].split(',')[0].trim();
  const {remoteAddress: ip, readyState, remoteFamily, remotePort} = req.socket;
  console.log(`server connection: 与客户端连接成功: ${readyState} ${ip} ${remoteFamily}`);
  
  ws.on("message", (message: WebSocket.RawData, req: IncomingMessage) => {
    const clientData = message.toString();
    console.log("server message: ", clientData);

    // 客户端发送心跳数据ping, 则回应 pong
    const sendData: string = clientData === "ping" ? "pong" : `server date ${message}`;
    
    ws.send(sendData, (err: Error | void) => {
      if (err) {
        console.log("send message error: ", err);
      }
    });
  });

  ws.on("close", (code: number) => {
    console.log("server close", code);
  });
});