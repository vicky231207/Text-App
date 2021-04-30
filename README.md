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
