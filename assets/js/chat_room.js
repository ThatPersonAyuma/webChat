// Enable/disable send button based on input value

const username = document.getElementById('username');
const chatInput = document.getElementById('user-message');
const sendButton = document.getElementById('sendButton');
chatInput.addEventListener('input', () => {
    sendButton.disabled = chatInput.value.trim().length === 0 || username.value.trim().length === 0;
});
username.addEventListener('input', () => {
    sendButton.disabled = chatInput.value.trim().length === 0 || username.value.trim().length === 0;
});
let ChatRoom = {
    init(socket){
        let channel = socket.channel('chat_room:lobby', {})
        channel.join()
            .receive("ok", resp => { console.log("Joined successfully", resp) })
            .receive("error", resp => { console.log("Unable to join", resp) })
        this.listenForChats(channel)
    },

    listenForChats(channel){
        document.getElementById('input-form').addEventListener('submit', function(e){
            e.preventDefault()
            
            channel.push('shout', {name: username.value, msg: chatInput.value})

            chatInput.value = ''
        })
        channel.on('shout', payload => {
            
            let MessagesBox = document.querySelector('#message-box')
            let msgBlock = document.createElement('p')
            if (payload.name == username.value){
                msgBlock.insertAdjacentHTML('beforeend', `<div class="message message-out"><div class="bubble">${payload.name}: ${payload.msg}</div></div>`)
            }else{
                msgBlock.insertAdjacentHTML('beforeend', `<div class="message message-in"><div class="bubble">${payload.name}: ${payload.msg}</div></div>`)
            }
            MessagesBox.appendChild(msgBlock)
        })
    },
};

export default ChatRoom