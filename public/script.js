const socket = io();
const input_box = document.getElementById('input-box');
const input = document.getElementById('input');
const chat_box = document.getElementById('chat-box');
const name_box = document.getElementById('name-box');
const name_element = document.getElementById('name');
let name = '[name err]';
let uuid = '';
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
