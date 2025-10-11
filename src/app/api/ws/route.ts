import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });
const clients = new Map<string, any>();

wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        const data = JSON.parse(msg.toString());
        if (data.type === "join") {
            clients.set(data.userId, ws);
        } else if (data.type === "send") {
            const { message } = data;
            const receiverWs = clients.get(message.receiver);
            if (receiverWs) {
                receiverWs.send(JSON.stringify({ type: "message", message }));
            }
            ws.send(JSON.stringify({ type: "message", message })); // echo back to sender
        }
    });

    ws.on("close", () => {
        for (const [id, socket] of clients.entries()) {
            if (socket === ws) clients.delete(id);
        }
    });
});

export default wss;
