var id = 0;
const socket = io();
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
function sendRequest() {
    message = document.getElementById('message').value;
    error = document.getElementById('error').checked;
    lost = document.getElementById('lost').checked;
    const protocol = createProtocol({message, errorFlag: error, lostFlag: lost})
    socket.emit('incomingMessage', protocol)   
}
socket.on('receivedMessage', (protocol) => {
    addLogMessage(protocol.message);
    console.log("mss");
});

