"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socket_io_client_1 = require("socket.io-client");
const httpServer = (0, http_1.createServer)();
const ioServer = new socket_io_1.Server(httpServer, {});
ioServer.on('connection', (socket) => {
    console.log('con workd');
    socket.on('teste', (msg) => {
        console.log('MSG', msg);
    });
});
const socket = (0, socket_io_client_1.io)();
socket.emit('teste', { teste: 'fabio' });
ioServer.listen(3000);
