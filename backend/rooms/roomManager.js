import crypto from 'crypto'

const rooms = new Map()

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code
  do {
    code = ''
    const bytes = crypto.randomBytes(6)
    for (let i = 0; i < 6; i++) {
      code += chars[bytes[i] % chars.length]
    }
  } while (rooms.has(code))
  return code
}

export function createRoom(hostId) {
  const code = generateCode()
  const room = {
    code,
    hostId,
    players: [{ id: hostId, color: 'w' }],
    createdAt: Date.now(),
  }
  rooms.set(code, room)
  return room
}

export function joinRoom(code, playerId) {
  const room = rooms.get(code)
  if (!room) {
    return { error: 'Room not found' }
  }
  if (room.players.length >= 2) {
    return { error: 'Room is full' }
  }
  if (room.players.find((p) => p.id === playerId)) {
    return { error: 'Already in this room' }
  }
  room.players.push({ id: playerId, color: 'b' })
  return { room }
}

export function leaveRoom(code, playerId) {
  const room = rooms.get(code)
  if (!room) return null

  room.players = room.players.filter((p) => p.id !== playerId)

  if (room.players.length === 0) {
    rooms.delete(code)
    return null
  }

  if (room.hostId === playerId && room.players.length > 0) {
    room.hostId = room.players[0].id
  }

  return room
}

export function getRoom(code) {
  return rooms.get(code) ?? null
}

export function roomExists(code) {
  return rooms.has(code)
}

export function getPlayerRoom(playerId) {
  for (const room of rooms.values()) {
    if (room.players.find((p) => p.id === playerId)) {
      return room
    }
  }
  return null
}

export function deleteRoom(code) {
  rooms.delete(code)
}
