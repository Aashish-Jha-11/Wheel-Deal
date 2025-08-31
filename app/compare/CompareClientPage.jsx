"use client"
import { useEffect, useMemo, useState } from "react"
import { cars } from "../../lib/cars-data"

export default function CompareClientPage() {
  const key = "wheeldeal:compare"
  const [slugs, setSlugs] = useState([])

  useEffect(() => {
    try {
      setSlugs(JSON.parse(localStorage.getItem(key)) || [])
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(slugs))
    } catch {}
  }, [slugs])

  const selected = useMemo(() => slugs.map((s) => cars.find((c) => c.slug === s)).filter(Boolean), [slugs])

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Compare Cars</h1>
      <div className="mt-4 flex gap-2">
        <input
          placeholder="Add car slug (e.g. tesla-model-3) and press Enter"
          className="rounded-lg bg-white/10 text-white px-3 py-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              const v = e.currentTarget.value.trim()
              if (v && slugs.length < 3 && !slugs.includes(v)) setSlugs((prev) => [...prev, v])
              e.currentTarget.value = ""
            }
          }}
        />
        <button onClick={() => setSlugs([])} className="rounded-lg bg-white/10 text-white px-3 py-2">
          Clear
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {selected.map((car) => (
          <div key={car.slug} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-black/30">
              <img
                src={car.img || "/placeholder.svg?height=320&width=640&query=car"}
                alt={`${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white font-semibold mt-3">{car.model}</h2>
            <ul className="text-white/80 text-sm mt-2 grid gap-1">
              <li>Price: {car.price}</li>
              <li>Year: {car.year}</li>
              <li>Mileage: {car.mileage}</li>
            </ul>
          </div>
        ))}
        {selected.length < 3 && (
          <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-white/60 flex items-center justify-center">
            Add {3 - selected.length} more to compare
          </div>
        )}
      </div>
    </main>
  )
}
