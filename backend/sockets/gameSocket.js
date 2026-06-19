import { createRoom, joinRoom, leaveRoom, getRoom, getPlayerRoom } from '../rooms/roomManager.js'

export default function registerGameHandlers(io, socket) {
  socket.on('create-room', () => {
    const existing = getPlayerRoom(socket.id)
    if (existing) {
      const room = getRoom(existing.code)
      if (room) {
        socket.emit('error', { message: 'You are already in a room' })
        return
      }
    }

    const room = createRoom(socket.id)
    socket.join(room.code)
    socket.emit('room-created', {
      code: room.code,
      color: 'w',
      players: room.players.map((p) => ({ id: p.id, color: p.color })),
    })
  })

  socket.on('join-room', ({ code }) => {
    if (!code || typeof code !== 'string') {
      socket.emit('error', { message: 'Invalid room code' })
      return
    }

    const normalized = code.toUpperCase()
    const result = joinRoom(normalized, socket.id)

    if (result.error) {
      socket.emit('error', { message: result.error })
      return
    }

    const room = result.room
    socket.join(normalized)

    socket.emit('room-joined', {
      code: room.code,
      color: 'b',
      players: room.players.map((p) => ({ id: p.id, color: p.color })),
    })

    socket.to(normalized).emit('player-joined', {
      players: room.players.map((p) => ({ id: p.id, color: p.color })),
    })
  })

  socket.on('leave-room', () => {
    const room = getPlayerRoom(socket.id)
    if (!room) return

    const updated = leaveRoom(room.code, socket.id)
    socket.leave(room.code)

    if (updated) {
      socket.to(room.code).emit('player-left', {
        playerId: socket.id,
        players: updated.players.map((p) => ({ id: p.id, color: p.color })),
        newHost: updated.hostId,
      })
    }

    socket.emit('room-left')
  })

  socket.on('disconnect', () => {
    const room = getPlayerRoom(socket.id)
    if (!room) return

    const updated = leaveRoom(room.code, socket.id)

    if (updated) {
      io.to(room.code).emit('player-left', {
        playerId: socket.id,
        players: updated.players.map((p) => ({ id: p.id, color: p.color })),
        newHost: updated.hostId,
      })
    }
  })
}
