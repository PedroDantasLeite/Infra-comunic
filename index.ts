import * as express from "express";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { ServerClient } from "./serverClient";
import {TransportProtocol} from './Transport';

class App {
    public app: express.Application;
    public server: Server;
    private io: SocketIO.Server;
    public PORT: number = 8100;
    private receivedProtocols: TransportProtocol[] = [];

    constructor() {
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
            res.sendFile(__dirname + '/form-script.js')
        });
        this.app.route('/css').get((req, res) => {
            res.sendFile(__dirname + '/style.css')
        });
    }

    private sockets(): void {
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private hadReceivedProtocol(id: number): boolean {
        const find = this.receivedProtocols.find((protocol) => protocol.realId == id)
        if(find) return true;
        return false;
    }
    private listen(): void {

        this.io.on('connection', (socket: any) => {

            console.log('User connected');

            socket.on('incomingMessage', (tp: TransportProtocol) => {

                if (tp.sentBy == ServerClient.CLIENT) {
                    if (tp.errorFlag) {
                        const newErrorTp: TransportProtocol = tp;
                        newErrorTp.message = "Error Message in message " + tp.id + " package " + tp.subId;
                        newErrorTp.sentBy = ServerClient.SERVER;
                        this.io.emit('errorMessage', newErrorTp)
                        return;
                    }
                    const newTp: TransportProtocol = tp;
                    if(tp.mutiplePackages) {
                        newTp.message = "Message: " +  tp.id + " and package: " + tp.subId + " was sucessfully received (" + tp.message + ")";
                    }else {
                        newTp.message = "Message: " +  tp.id + " was sucessfully received (" + tp.message + ")";
                    }
                    if(this.hadReceivedProtocol(tp.realId)) {
                        newTp.message = "Message " + tp.id + " and package: " + tp.subId + " was duplicated!";
                    }else {
                        this.receivedProtocols.push(tp);
                    }
                    console.log(tp.realId);
                    newTp.sentBy = ServerClient.SERVER;
                    console.log("Received package", tp.realId)
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

export default new App();