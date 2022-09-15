import { ServerClient } from './serverClient';
export class TransportProtocol {

        public id:number;
        public subId: number;
        public message:String;
        public errorFlag:boolean;
        public lostFlag:boolean;
        public numberOfPackages: number;
        public sentBy: ServerClient;
        public mutiplePackages: boolean;
}