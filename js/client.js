const form = document.getElementById('sendcontainer');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var socket = io('http://localhost:8000');
const append = (message, position) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messageContainer.append(messageelement);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append('you:${message}', 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const name = prompt("Enter your name to join");
socket.emit('new_user_joined', name);

socket.on('user_joined', name => {
    append('${name} joined the chat', 'right');
})
socket.on('receive', data => {
    append('${data.message}:${data.user}', 'left');
})