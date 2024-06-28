const app = require('express')
const server =  require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: process.env.URL_LINK}})

const PORT = 3001 || process.env.URL_LINK

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id)

    socket.on('disconnect', reason => {
        console.log("Usuário desconectado!", socket.id)
    })

    socket.on('set_username', username => {
        socket.data.username = username
        console.log(socket.data.username)
    })

    socket.on('message', text => {
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

server.listen(PORT, () => console.log("Server running"))