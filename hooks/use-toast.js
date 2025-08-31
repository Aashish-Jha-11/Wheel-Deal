import { useState } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = 'default' }) => {
    const id = Date.now()
    const newToast = { id, title, description, variant }
    
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return { toast, toasts, removeToast }
}
