import { useState, useCallback, useRef } from 'react'

export default function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const counterRef = useRef(0)

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const addNotification = useCallback(
    ({ type = 'info', message, duration = 4000 }) => {
      const id = ++counterRef.current
      setNotifications((prev) => [...prev, { id, type, message }])
      if (duration > 0) {
        setTimeout(() => removeNotification(id), duration)
      }
      return id
    },
    [removeNotification],
  )

  return { notifications, addNotification, removeNotification }
}
