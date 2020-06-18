const io = require('socket.io')(8000)
const users = {};
io.on('connection', socket => {
    socket.on('new_user_joined', name => {
        console.log("new_user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user_joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    })
});