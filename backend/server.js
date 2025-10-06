import app from'./index.js';
import http from 'http';
import initSocketServer from './socket/socketServer.js';
const httpServer=http.createServer(app);
initSocketServer(httpServer);
const port=process.env.PORT||5000;
httpServer.listen(port,()=>{
    console.log("server is running on port ",port);
})
