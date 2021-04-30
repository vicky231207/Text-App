# Text-App

A simple text app with: Express, Socket.io, bad-word, figlet, uuid.

Back-End code:
```js
app.use(express.static('public'));
io.on('connection', socket => {
    // console.log(`A user has connected: ${socket.id}`);
    // socket.on('disconnect', () => console.log(`A user has disconnected: ${socket.id}`));
    socket.on('msg', ({ name, uuid, content, date}) => {
        const editedMsg = { name: filter.clean(name), uuid: uuid, content: filter.clean(content), date: date };
        console.log(`${editedMsg.name}: ${editedMsg.content}`);
        io.emit('msg', editedMsg);
    });
    socket.on('uuidReq', () => {
        socket.emit('uuid', uuidV4());
    })
});
```
Front-End:
```js
window.onload = () => {
    if (!uuid) {
        socket.emit('uuidReq', true);
    }
}
socket.on('uuid', u => {
    uuid = u;
})

input_box.addEventListener('submit', e => {
    e.preventDefault();
    if(input.value){
        const msg = {
            name: name,
            uuid: uuid,
            content: input.value,
            date: new Date()
        };
        socket.emit('msg', msg);
        input.value = '';
    };
});

name_box.addEventListener('submit', e => {
    e.preventDefault();
    if (name_element.value) {
        name = name_element.value;
        name_element.value = '';
        name_box.classList.add('hidden');
    }
})

socket.on('msg', msg => {
    const li = document.createElement('p');
    if(msg.uuid === uuid){
        li.textContent = `${msg.name} (You): \n${msg.content}`;
    }else{
        li.textContent = `${msg.name}: \n${msg.content}`;
    }
    chat_box.append(li);
})
```
