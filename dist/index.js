"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const socketIo = require("socket.io");
const serverClient_1 = require("./serverClient");
class App {
    constructor() {
        this.PORT = 8100;
        this.routes();
        this.sockets();
        this.listen();
    }
    routes() {
        this.app = express();
        this.app.route("/").get((req, res) => {
            res.sendFile(__dirname + '/sample.html');
        });
        this.app.route('/js').get((req, res) => {
            res.sendFile(__dirname + '/form-script.js');
        });
        this.app.route('/css').get((req, res) => {
            res.sendFile(__dirname + '/style.css');
        });
    }
    sockets() {
        this.server = http_1.createServer(this.app);
        this.io = socketIo(this.server);
    }
    listen() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('incomingMessage', (tp) => {
                if (tp.sentBy == serverClient_1.ServerClient.CLIENT) {
                    if (tp.errorFlag) {
                        const newErrorTp = tp;
                        newErrorTp.message = "Error Message";
                        newErrorTp.sentBy = serverClient_1.ServerClient.SERVER;
                        this.io.emit('errorMessage', newErrorTp);
                        return;
                    }
                    const newTp = tp;
                    newTp.message = "Tp: " + tp.id + " was sucessfully received";
                    newTp.sentBy = serverClient_1.ServerClient.SERVER;
                    this.io.emit('receivedMessage', newTp);
                    return;
                }
                return;
            });
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}
exports.default = new App();
