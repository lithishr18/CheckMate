import { Chess } from 'chess.js'
import { createRoom, joinRoom, leaveRoom, getRoom, getPlayerRoom, setPlayerConnected } from '../rooms/roomManager.js'

const gameStates = new Map()

function getGameState(code) {
  if (!gameStates.has(code)) {
    gameStates.set(code, new Chess())
  }
  return gameStates.get(code)
}

function broadcastGameState(io, code, move) {
  const game = getGameState(code)
  io.to(code).emit('move-made', {
    move: move || null,
    fen: game.fen(),
    turn: game.turn(),
    isCheck: game.isCheck(),
    isCheckmate: game.isCheckmate(),
    isStalemate: game.isStalemate(),
    isDraw: game.isDraw(),
    history: game.history({ verbose: true }),
  })
}

function isPlayerTurn(game, playerId) {
  const room = getPlayerRoom(playerId)
  if (!room) return false
  const player = room.players.find((p) => p.id === playerId)
  if (!player) return false
  return game.turn() === player.color
}

export default function registerGameHandlers(io, socket) {
  socket.on('create-room', () => {
    const existing = getPlayerRoom(socket.id)
    if (existing) {
      if (getRoom(existing.code)) {
        socket.emit('error', { message: 'You are already in a room' })
        return
      }
    }

    const room = createRoom(socket.id)
    getGameState(room.code)
    socket.join(room.code)
    socket.emit('room-created', {
      code: room.code,
      color: 'w',
      players: room.players.map((p) => ({ id: p.id, color: p.color, connected: p.connected })),
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
    getGameState(normalized)
    socket.join(normalized)

    socket.emit('room-joined', {
      code: room.code,
      color: 'b',
      players: room.players.map((p) => ({ id: p.id, color: p.color, connected: p.connected })),
    })

    socket.to(normalized).emit('player-joined', {
      players: room.players.map((p) => ({ id: p.id, color: p.color, connected: p.connected })),
    })

    const game = getGameState(normalized)
    if (game.history().length > 0) {
      socket.emit('game-sync', {
        fen: game.fen(),
        turn: game.turn(),
        isCheck: game.isCheck(),
        isCheckmate: game.isCheckmate(),
        isStalemate: game.isStalemate(),
        isDraw: game.isDraw(),
        history: game.history({ verbose: true }),
      })
    }
  })

  socket.on('leave-room', () => {
    const room = getPlayerRoom(socket.id)
    if (!room) return

    const updated = leaveRoom(room.code, socket.id)
    gameStates.delete(room.code)
    socket.leave(room.code)

    if (updated) {
      socket.to(room.code).emit('player-left', {
        playerId: socket.id,
        players: updated.players.map((p) => ({ id: p.id, color: p.color, connected: p.connected })),
        newHost: updated.hostId,
      })
    }

    socket.emit('room-left')
  })

  socket.on('make-move', ({ from, to, promotion }) => {
    const room = getPlayerRoom(socket.id)
    if (!room) {
      socket.emit('error', { message: 'Not in a room' })
      return
    }

    const game = getGameState(room.code)
    if (game.isGameOver()) {
      socket.emit('error', { message: 'Game is over' })
      return
    }

    if (!isPlayerTurn(game, socket.id)) {
      socket.emit('error', { message: 'Not your turn' })
      return
    }

    try {
      const move = game.move({ from, to, promotion: promotion || 'q' })
      if (!move) {
        socket.emit('error', { message: 'Illegal move' })
        return
      }
      broadcastGameState(io, room.code, {
        from: move.from,
        to: move.to,
        san: move.san,
        piece: move.piece,
        captured: move.captured || null,
        promotion: move.promotion || null,
        color: move.color,
        flags: move.flags,
        lan: move.lan,
      })
    } catch {
      socket.emit('error', { message: 'Invalid move' })
    }
  })

  socket.on('resign', () => {
    const room = getPlayerRoom(socket.id)
    if (!room) return

    const game = getGameState(room.code)
    if (game.isGameOver()) return

    const player = room.players.find((p) => p.id === socket.id)
    if (!player) return

    const winner = player.color === 'w' ? 'b' : 'w'
    io.to(room.code).emit('game-ended', { reason: 'resign', winner })
  })

  socket.on('disconnect', () => {
    const room = getPlayerRoom(socket.id)
    if (!room) return

    setPlayerConnected(room.code, socket.id, false)

    socket.to(room.code).emit('opponent-disconnected', {
      playerId: socket.id,
      players: room.players.map((p) => ({ id: p.id, color: p.color, connected: false })),
    })

    const updated = leaveRoom(room.code, socket.id)
    gameStates.delete(room.code)

    if (updated) {
      socket.to(room.code).emit('player-left', {
        playerId: socket.id,
        players: updated.players.map((p) => ({ id: p.id, color: p.color, connected: p.connected })),
        newHost: updated.hostId,
      })
    }
  })
}
