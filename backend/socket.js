const { Server } = require('socket.io')
const { createServer } = require('http')

let io

const initSocket = (app) => {
    const httpServer = createServer(app)
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    })

    io.on('connection', (socket) => {
        console.log('A user connected')

        // Join room based on articleId
        socket.on('join_article', (articleId) => {
            socket.join(articleId)
            console.log(`User joined article room: ${articleId}`)
        })

        socket.on('disconnect', () => {
            console.log('User disconnected')
        })
    })

    return httpServer
}

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized')
    }
    return io
}

module.exports = {
    initSocket,
    getIO
} 