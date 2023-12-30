const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')


app.use(cors())


const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection',(socket)=>{
    console.log('a user connected with id:',socket.id)

    socket.on('joinRoom',({name,room})=>{
        // console.log(`User with name: ${name}, joined room: ${room}`)
        socket.join(room)
    })

    socket.on('sendMessage', (data)=>{
        // console.log(`User with name: ${data.name}, sent message in room: ${data.room}, message: ${data.message}`)
        const messageData = {
            name: data.name,
            room: data.room,
            message: data.message,
            send:false,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
        socket.to(data.room).emit('receiveMessage',messageData)
    })

    
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log(`listening on port:${port}`)
})
