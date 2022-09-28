"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const socketIo = require("socket.io");
const serverClient_1 = require("./serverClient");
class App {
    constructor() {
        this.PORT = 8100;
        this.receivedProtocols = [];
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
    hadReceivedProtocol(id, subId) {
        const find = this.receivedProtocols.find((protocol) => protocol.id == id && protocol.subId == subId);
        if (find)
            return true;
        return false;
    }
    listen() {
        this.io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('incomingMessage', (tp) => {
                if (tp.sentBy == serverClient_1.ServerClient.CLIENT) {
                    if (tp.errorFlag) {
                        const newErrorTp = tp;
                        newErrorTp.message = "Error Message in message " + tp.id + " package " + tp.subId;
                        newErrorTp.sentBy = serverClient_1.ServerClient.SERVER;
                        this.io.emit('errorMessage', newErrorTp);
                        return;
                    }
                    const newTp = tp;
                    if (tp.mutiplePackages) {
                        newTp.message = "Message: " + tp.id + " and package: " + tp.subId + " was sucessfully received (" + tp.message + ")";
                    }
                    else {
                        newTp.message = "Message: " + tp.id + " was sucessfully received (" + tp.message + ")";
                    }
                    if (this.hadReceivedProtocol(tp.id, tp.subId)) {
                        newTp.message = "Message " + tp.id + " and package: " + tp.subId + " was duplicated!";
                    }
                    else {
                        this.receivedProtocols.push(tp);
                    }
                    newTp.sentBy = serverClient_1.ServerClient.SERVER;
                    console.log("Received package", tp.id);
                    this.io.emit('receivedMessage', newTp);
                    return;
                }
                return;
            });
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }
}
exports.default = new App();
