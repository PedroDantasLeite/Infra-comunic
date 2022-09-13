import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { io } from "socket.io-client";



const httpServer = createServer();
const ioServer = new Server(httpServer, {});

ioServer.on('connection', (socket: Socket) => {
    console.log('con workd');
    socket.on('teste', (msg) => {
        console.log('MSG', msg);
    });
})

const socket = io();
socket.emit('teste', {teste: 'fabio'});



ioServer.listen(3000);