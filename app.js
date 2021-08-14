const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const port = process.env.PORT || 4001
const index = require('./routes/index')
const app = express()
let clientes =0
let lista =[]
app.use(index)
app.use(cors())

const server = app.listen(port,()=>{
    console.log('Servidor escuchando!',port)
})

const io = socketIo(server,{
    cors:{
        origin:"*",
        method:"GET"
    }
})

io.on('connection',(socket)=>{
    console.log('new client connected')
    clientes = clientes+1
    console.log(socket.id)
     
    io.sockets.emit('chat:connected',clientes)

     socket.on("disconnect",()=>{
        console.log('client disconnected')
        clientes = clientes -1 
        io.sockets.emit('chat:connected',clientes)
        
    })

    socket.on('chat:message-send',(data)=>{
        console.log(data)
        io.sockets.emit('chat:message-recibed',data)
        let res = lista.indexOf(data.user)
        if(res < 0){
            lista.push(data.user)
        }
       
    })
})





