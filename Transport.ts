class Transport {

        private id:number;
        private message:String;
        private errorFlag:boolean;
        private lostFlag:boolean;

        constructor(newId:number, newMessage:string, isError:boolean, isLost:boolean) {
                this.id = newId;
                this.message = newMessage;
                this.errorFlag = isError;
                this.lostFlag = isLost;
        }

        public getId() {
                return this.id;
        }

        public getMessage() {
                return this.message;
        }

        public getErrorFlag() {
                return this.errorFlag;
        }

        public getLostFlag() {
                return this.lostFlag;
        }

        
}