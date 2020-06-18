const io = require('socket.io')(8000);
var users = {};
io.on('connection', socket => {
    socket.on('new_user_joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user_joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});