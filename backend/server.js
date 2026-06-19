import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import registerGameHandlers from './sockets/gameSocket.js'

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

io.on('connection', (socket) => {
  registerGameHandlers(io, socket)
})

httpServer.listen(PORT, () => {
  console.log(`CheckMate server running on port ${PORT}`)
})
