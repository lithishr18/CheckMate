import { useEffect, useRef, useState, useCallback } from 'react'
import { io } from 'socket.io-client'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'

export default function useSocket() {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const [room, setRoom] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const socket = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
    })

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('connect_error', () => setConnected(false))

    socket.on('room-created', (data) => {
      setRoom({ code: data.code, color: data.color, players: data.players })
      setError(null)
    })

    socket.on('room-joined', (data) => {
      setRoom({ code: data.code, color: data.color, players: data.players })
      setError(null)
    })

    socket.on('player-joined', (data) => {
      setRoom((prev) => (prev ? { ...prev, players: data.players } : prev))
    })

    socket.on('player-left', (data) => {
      setRoom((prev) => (prev ? { ...prev, players: data.players } : prev))
    })

    socket.on('room-left', () => {
      setRoom(null)
    })

    socket.on('error', (data) => {
      setError(data.message)
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  const createRoom = useCallback(() => {
    socketRef.current?.emit('create-room')
  }, [])

  const joinRoom = useCallback((code) => {
    socketRef.current?.emit('join-room', { code })
  }, [])

  const leaveRoom = useCallback(() => {
    socketRef.current?.emit('leave-room')
  }, [])

  return { connected, room, error, createRoom, joinRoom, leaveRoom }
}
