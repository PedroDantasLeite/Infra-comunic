var id = 1;
const TIMEOUT = 5;
const socket = io();
const emmitedRequests = [];
const responsesRequests = [];
function addLogMessage(message) {
    document.getElementById('console').innerHTML += message + "\n";
}
function createProtocol(data) {
    const protocol = {
        id,
        subId: 0,
        message: data.message,
        errorFlag: data.errorFlag,
        lostFlag: data.lostFlag,
        sentBy: "client"
    }
    id++;
    return protocol;
}
function sendFromCode() {
    const data = getData();
    sendRequest(data);
}
function getData() {
    message = document.getElementById('message').value;
    error = document.getElementById('error').checked;
    lost = document.getElementById('lost').checked;
    partial = document.getElementById('partil').checked;
    return {message, errorFlag: error, lostFlag: lost, partial: partial};
}
function sendPartial(data) {
    const splited = data.message.split(" ");
    const protocol = createProtocol(data);
    protocol.mutiplePackages = true;
    protocol.numberOfPackages = splited.length;
    for(let i = 1; i <= protocol.numberOfPackages; i++) {
        protocol.subId = i;
        protocol.message = splited[i - 1];
        socket.emit('partialMessage', protocol);
    }
}
function sendRequest(data) {
    if(data.partial) { 
        sendPartial(data);
        return;
    };
    const protocol = createProtocol(data)
    emmitedRequests.push(protocol.id);

    if(!data.lostFlag) socket.emit('incomingMessage', protocol);
    
    setTimeout(() => {
        if(!responsesRequests.includes(protocol.id)) {
            addLogMessage(`The protocol ${protocol.id} had lost! Resending package`);
            protocol.lostFlag = false;
            socket.emit('incomingMessage', protocol);
        }
    }, TIMEOUT * 1000);
}
socket.on('receivedMessage', (protocol) => {
    responsesRequests.push(protocol.id);
    addLogMessage(protocol.message);
});
socket.on('errorMessage', (protocol) => {
    responsesRequests.push(protocol.id);
    addLogMessage(protocol.message);
});
socket.on('partialReceived', (protocol) => {
    addLogMessage(protocol.message);
});

