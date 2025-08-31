"use client"
import { useEffect, useState } from "react"

export function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === "success" ? "bg-green-500/20" : type === "error" ? "bg-red-500/20" : "bg-blue-500/20"
  const borderColor = type === "success" ? "border-green-500/30" : type === "error" ? "border-red-500/30" : "border-blue-500/30"
  const textColor = type === "success" ? "text-green-200" : type === "error" ? "text-red-200" : "text-blue-200"

  return (
    <div className={`fixed top-4 right-4 z-50 rounded-lg border ${borderColor} ${bgColor} p-4 backdrop-blur-xl`}>
      <div className="flex items-center gap-3">
        <div className={`text-sm ${textColor}`}>{message}</div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.description}
          type={toast.variant === "destructive" ? "error" : "success"}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
