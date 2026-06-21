import { useEffect, useState, useCallback } from 'react'
import { io } from 'socket.io-client'
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'
export default function useSocket() {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [room, setRoom] = useState(null)
  const [error, setError] = useState(null)
  const [opponentConnected, setOpponentConnected] = useState(false)
  useEffect(() => {
    const s = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
    })

    s.on('connect', () => setConnected(true))
    s.on('disconnect', () => setConnected(false))
    s.on('connect_error', () => setConnected(false))

    s.on('room-created', (data) => {
      setRoom({ code: data.code, color: data.color, players: data.players })
      setOpponentConnected(false)
      setError(null)
    })

    s.on('room-joined', (data) => {
      setRoom({ code: data.code, color: data.color, players: data.players })
      setOpponentConnected(true)
      setError(null)
    })

    s.on('player-joined', (data) => {
      setRoom((prev) => (prev ? { ...prev, players: data.players } : prev))
      setOpponentConnected(true)
    })

    s.on('player-left', (data) => {
      setRoom((prev) => (prev ? { ...prev, players: data.players } : prev))
      if (data.players.length < 2) {
        setOpponentConnected(false)
      }
    })

    s.on('opponent-disconnected', () => {
      setOpponentConnected(false)
    })

    s.on('room-left', () => {
      setRoom(null)
      setOpponentConnected(false)
    })

    s.on('error', (data) => {
      setError(data.message)
    })
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  const createRoom = useCallback(() => {
    socket?.emit('create-room')
  }, [socket])

  const joinRoom = useCallback((code) => {
    socket?.emit('join-room', { code })
  }, [socket])

  const leaveRoom = useCallback(() => {
    socket?.emit('leave-room')
  }, [socket])

  const playerColor = room?.color ?? null

  return {
    connected,
    room,
    error,
    opponentConnected,
    playerColor,
    createRoom,
    joinRoom,
    leaveRoom,
    socket,
  }
}
