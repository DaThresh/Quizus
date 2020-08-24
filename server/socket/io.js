const socketIO = require('socket.io');
const sharedSession = require('express-socket.io-session');

module.exports = (http, session) => {
    global.io = socketIO(http, {pingTimeout: 3600000});

    io.use(sharedSession(session, { autosave: true }));
}