
const write = (ws, message) => ws.send(JSON.stringify(message));
const broadcast = (sockets, message) => sockets.forEach(socket => write(socket, message));

export { write, broadcast }
