var id = 1;
const TIMEOUT = 5;
const socket = io();
const emmitedRequests = [];
const responsesRequests = [];
function addLogMessage(message) {
    document.getElementById('console').innerHTML += message + "\n";
}
function hadReceivedProtocol(messageId, subId) {
    const find = responsesRequests.find((protocol) => protocol.id == messageId && protocol.subId == subId)
    if(find) return true;
    return false;
}
function createProtocol(data) {
    const protocol = {
        id,
        subId: 0,
        message: data.message,
        errorFlag: data.errorFlag,
        lostFlag: data.lostFlag,
        sentBy: "client",
        subId: 0,
        realId: new Date().getTime()
    }
    id++;
    return protocol;
}
function sendFromCode() {
    const data = getData();
    sendRequest(data);
}
function getData() {
   let message = document.getElementById('message').value;
   let error = document.getElementById('error').checked;
   let lost = document.getElementById('lost').checked;
   let partial = document.getElementById('partil').checked;
   let duplicate = document.getElementById('duplicated').checked;
    return {message, errorFlag: error, lostFlag: lost, partial: partial, duplicate: duplicate};
}
function sendPartial(data) {
    const subProtocols = [];
    const splited = data.message.split(" ");
    const protocol = createProtocol(data);
    protocol.mutiplePackages = true;
    protocol.numberOfPackages = splited.length;

    for(let i = 1; i <= protocol.numberOfPackages; i++) {
        protocol.lostFlag = false;
        protocol.errorFlag = false;
        const fullMessage = splited[i - 1].split("-");
        const message = fullMessage[0]
        if(fullMessage.length > 1) {
            if(fullMessage[1] == 'l') protocol.lostFlag = true;
            if(fullMessage[1] == 'e') protocol.errorFlag = true;
        }
        protocol.subId = i;
        protocol.message = message;
        protocol.realId = new Date().getTime();
        if(!protocol.lostFlag) socket.emit('incomingMessage', protocol);
        subProtocols.push(protocol);
    }
    setTimeout(() => {
        for(let i = 1; i <= protocol.numberOfPackages; i++) {
            if(!hadReceivedProtocol(protocol.id, i)) {
                protocol.lostFlag = false;
                protocol.errorFlag = false;
                const fullMessage = splited[i - 1].split("-");
                const message = fullMessage[0]
                protocol.subId = i;
                protocol.message = message;
                addLogMessage(`The message ${protocol.id} package ${i} had lost! Resending package`);
                socket.emit('incomingMessage', protocol);
            }
        }

    }, TIMEOUT * 1000);
}
function sendRequest(data) {
    if(data.partial) { 
        sendPartial(data);
        return;
    };
    const protocol = createProtocol(data)
    emmitedRequests.push(protocol.id);

    if(!data.lostFlag) socket.emit('incomingMessage', protocol);

    if(data.duplicate) socket.emit('incomingMessage', protocol);
    
    setTimeout(() => {
        if(!hadReceivedProtocol(protocol.id, protocol.subId)) {
            addLogMessage(`The message ${protocol.id} had lost! Resending package`);
            protocol.lostFlag = false;
            socket.emit('incomingMessage', protocol);
        }
    }, TIMEOUT * 1000);
}
socket.on('receivedMessage', (protocol) => {
    responsesRequests.push({id: protocol.id, subId: protocol.subId});
    addLogMessage(protocol.message);
});
socket.on('errorMessage', (protocol) => {
    responsesRequests.push({id: protocol.id, subId: protocol.subId});
    addLogMessage(protocol.message);
});
socket.on('partialReceived', (protocol) => {
    addLogMessage(protocol.message);
});

