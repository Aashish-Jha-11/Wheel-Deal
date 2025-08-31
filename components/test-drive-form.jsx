"use client"
import { useState } from "react"

export default function TestDriveForm({ carSlug, carName }) {
  const [toastMessage, setToastMessage] = useState(null)
  const [status, setStatus] = useState("idle")
  const [form, setForm] = useState({ name: "", phone: "", when: "" })
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setToastMessage({ type: "error", message: "Please enter your name and phone." })
      return
    }
    if (form.phone.replace(/[^\d]/g, "").length < 8) {
      setToastMessage({ type: "error", message: "Please enter a valid phone number." })
      return
    }
    setStatus("submitting")
    try {
      const res = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, carSlug, carName }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) throw new Error(data?.message || "Failed")
      setStatus("success")
      setToastMessage({ type: "success", message: `We'll contact you for ${carName} shortly.` })
      setForm({ name: "", phone: "", when: "" })
    } catch (err) {
      setStatus("error")
      setToastMessage({ type: "error", message: err?.message || "Please try again." })
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
          placeholder="Your name"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
          placeholder="Phone number"
          required
        />
        <input
          type="datetime-local"
          name="when"
          value={form.when}
          onChange={onChange}
          className="sm:col-span-2 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
          placeholder="Preferred date/time"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="sm:col-span-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm backdrop-blur hover:bg-white/15 disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>
        {status === "success" && (
          <div className="sm:col-span-2 rounded-md border border-white/10 bg-green-500/20 px-3 py-2 text-sm text-green-200">
            Request submitted! Our team will contact you shortly.
          </div>
        )}
        {status === "error" && (
          <div className="sm:col-span-2 rounded-md border border-white/10 bg-red-500/20 px-3 py-2 text-sm text-red-200">
            Something went wrong. Please try again.
          </div>
        )}
      </form>

      {/* Toast Message */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg border p-4 backdrop-blur-xl ${
          toastMessage.type === "success" 
            ? "border-green-500/30 bg-green-500/20 text-green-200" 
            : "border-red-500/30 bg-red-500/20 text-red-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="text-sm">{toastMessage.message}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/60 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
