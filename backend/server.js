import app from "./app.js";
import http from "http";
import initSocketServer from "./socket/socketServer.js";

const httpServer = http.createServer(app);

// Initialize Socket.IO
initSocketServer(httpServer);

const port = process.env.PORT || 5000;

console.log("Render PORT:", process.env.PORT);

httpServer.listen(port, () => {
  console.log("Server running on port", port);
});
