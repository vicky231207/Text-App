const figlet = require('figlet');
const {v4: uuidV4} = require('uuid');
const Filter = require('bad-words');
const filter = new Filter();
const express = require('express');
const app = express();
const server = app.listen(1010);
const io = require('socket.io')(server);
figlet('Chat Server!', (err, data) => {
    if(err) return;
    console.log(data);
    console.log('Vicky2k7 Chat Server!\nServer is running on port 1010!\n\n')
});
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
