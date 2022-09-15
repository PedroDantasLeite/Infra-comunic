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
    }

    private sockets(): void {
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private listen(): void {

        this.io.on('connection', (socket: any) => {

            console.log('a user connected');
            console.log(socket)

            socket.on('incomingMessage', (tp: TransportProtocol) => {

                if (tp.sentBy == ServerClient.CLIENT) {
                    if (tp.errorFlag) {
                        
                    } else if (tp.lostFlag) {
                        
                    }

                    const newTp: TransportProtocol = tp;
                    newTp.message = "Tp: " +  tp.id + " was sucessfully received";
                    newTp.sentBy = ServerClient.SERVER;
                    
                    this.io.emit('receivedMessage_rec', newTp);
                    return
                }
                
                return
            });


            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

export default new App();