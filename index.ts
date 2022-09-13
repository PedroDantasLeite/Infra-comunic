import * as express from "express";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';

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
            res.sendFile(__dirname + '/index.html');
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

            socket.on('incomingMessage', (m: any) => {

                console.log('chegou a msg', m);
                const m2 = m.msg;
                console.log(m2);
                this.io.emit('incomingMessage_rec', m2 + " from server");
            });


            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

export default new App();