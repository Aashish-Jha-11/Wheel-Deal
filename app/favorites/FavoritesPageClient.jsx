"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cars } from "../../lib/cars-data"

export default function FavoritesPageClient() {
  const key = "wheeldeal:favorites"
  const [ids, setIds] = useState([])
  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem(key)) || [])
    } catch {}
  }, [])
  const list = cars.filter((c) => ids.includes(c.id))
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Saved Cars</h1>
      {list.length === 0 ? (
        <p className="text-white/70 mt-2">
          No saved cars yet. Browse{" "}
          <Link href="/cars" className="text-[#00C2FF]">
            all cars
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((car) => (
            <li key={car.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-black/30">
                <img
                  src={car.img || "/placeholder.svg?height=320&width=640&query=car"}
                  alt={`${car.model}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-white font-medium mt-3">{car.model}</h3>
              <p className="text-white/70 text-sm">
                {car.year} • {car.mileage}
              </p>
              <Link
                href={`/cars/${car.slug}`}
                className="mt-3 inline-block rounded-lg bg-[#00C2FF] text-black font-medium px-3 py-2 hover:bg-white"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
