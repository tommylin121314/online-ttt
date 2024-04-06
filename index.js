const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require("cors")
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const players = new Map()

io.on('connection', (socket) => {
    console.log(socket.id + " has connected")

    socket.on('joinGame', (data) => {
        socket.join(data.code)
        const roomSize = io.sockets.adapter.rooms?.get(data.code).size
        if (roomSize > 2) {
            socket.leave(data.code)
            socket.emit("roomFull")
        }
        else if (roomSize == 1) {
            socket.emit("assignMark", {
                "mark": 'X',
            })
            players.set(data.code, [data.name])
            io.in(data.code).emit("playerJoined", players.get(data.code))
        }
        else if (roomSize == 2) {
            socket.emit("assignMark", {
                "mark": 'O',
            })
            let currPlayers = players.get(data.code)
            if (!currPlayers.includes(data.name)) {
                currPlayers.push(data.name)
            }
            players.set(data.code, currPlayers)
            io.in(data.code).emit("playerJoined", players.get(data.code))
            io.in(data.code).emit("gameStart")
        }
        
        console.log(data.name + "(" + socket.id + ")" + " has joined room " + data.code)
    })

    socket.on('takeTurn', (data) => {
        code = data.code
        board = data.board
        socket.to(code).emit('turnTaken', board)
    })
})

server.listen(8000, () => {
    console.log("Server is running...")
})