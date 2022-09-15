var id = 0;
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
    return {message, errorFlag: error, lostFlag: lost};
}
function sendRequest(data) {
    const protocol = createProtocol(data)
    emmitedRequests.push(protocol.id);

    if(!data.lostFlag) socket.emit('incomingMessage', protocol);

    setTimeout(() => {
        if(!responsesRequests.includes(protocol.id)) {
            addLogMessage(`The protocol ${protocol.id} had lost!`);
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

