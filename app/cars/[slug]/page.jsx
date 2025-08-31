"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { cars } from "../../../lib/cars-data"
import TestDriveForm from "../../../components/test-drive-form"
import ThreeSixtyModal from "../../../components/three-sixty-modal"

export default function CarDetailPage() {
  const params = useParams()
  const [mounted, setMounted] = useState(false)
  const [car, setCar] = useState(null)
  const [show360, setShow360] = useState(false)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setMounted(true)
    const carData = cars.find(c => c.slug === params.slug)
    setCar(carData)
    
    try {
      const favs = JSON.parse(localStorage.getItem("wheeldeal:favorites")) || []
      setFavorites(favs)
    } catch {}
  }, [params.slug])

  const toggleFavorite = (id) => {
    if (!mounted) return
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
    
    setFavorites(newFavorites)
    localStorage.setItem("wheeldeal:favorites", JSON.stringify(newFavorites))
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Car not found</h1>
          <Link href="/cars" className="text-blue-400 hover:underline">
            Back to cars
          </Link>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#0b0f14] text-white">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-30">
          <div
            className="absolute -top-40 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(0,194,255,0.35), transparent 70%)" }}
          />
          <div
            className="absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(122,92,255,0.35), transparent 70%)" }}
          />
        </div>

        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <Link href="/" className="text-xl font-bold text-blue-400">
              WheelDeal
            </Link>
          </div>
        </nav>

        <div className="mx-auto max-w-6xl px-4 py-8">
          <nav className="mb-6">
            <Link href="/" className="text-white/60 hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href="/cars" className="text-white/60 hover:text-white">
              Cars
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white">{car.model}</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={car.img || "/placeholder.svg"}
                  alt={`${car.model} ${car.year}`}
                  className="w-full h-96 object-cover"
                />
                <button className="absolute bottom-4 right-4 rounded-full bg-black/50 px-4 py-2 text-sm backdrop-blur">
                  360° View
                </button>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  Save to Favorites
                </button>
                <button className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  Share
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{car.model}</h1>
                <p className="text-2xl font-semibold text-blue-400">{car.price}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-white/60">Year</div>
                  <div className="text-lg font-semibold">{car.year}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-white/60">Mileage</div>
                  <div className="text-lg font-semibold">{car.mileage}</div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Certified Pre-owned Vehicle</li>
                  <li>• Full Service History</li>
                  <li>• No Accident History</li>
                  <li>• 1 Year Warranty</li>
                  <li>• Free Home Delivery</li>
                  <li>• 7-Day Return Policy</li>
                </ul>
              </div>

              <div id="contact" className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold mb-4">Book a Test Drive</h3>
                <div className="text-sm text-white/70">Loading form...</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-30">
        <div
          className="absolute -top-40 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(0,194,255,0.35), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(122,92,255,0.35), transparent 70%)" }}
        />
      </div>

      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link href="/" className="text-xl font-bold text-blue-400">
            WheelDeal
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav className="mb-6">
          <Link href="/" className="text-white/60 hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-white/40">/</span>
          <Link href="/cars" className="text-white/60 hover:text-white">
            Cars
          </Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white">{car.model}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={car.img || "/placeholder.svg"}
                alt={`${car.model} ${car.year}`}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={() => setShow360(true)}
                className="absolute bottom-4 right-4 rounded-full bg-black/50 px-4 py-2 text-sm backdrop-blur hover:bg-black/70"
              >
                360° View
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(car.id)}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm transition ${
                  favorites.includes(car.id)
                    ? "border-green-500 bg-green-500/20 text-green-400"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {favorites.includes(car.id) ? "✓ Saved" : "Save to Favorites"}
              </button>
              <button className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                Share
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{car.model}</h1>
              <p className="text-2xl font-semibold text-blue-400">{car.price}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/60">Year</div>
                <div className="text-lg font-semibold">{car.year}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/60">Mileage</div>
                <div className="text-lg font-semibold">{car.mileage}</div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Certified Pre-owned Vehicle</li>
                <li>• Full Service History</li>
                <li>• No Accident History</li>
                <li>• 1 Year Warranty</li>
                <li>• Free Home Delivery</li>
                <li>• 7-Day Return Policy</li>
              </ul>
            </div>

            <div id="contact" className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold mb-4">Book a Test Drive</h3>
              <TestDriveForm carSlug={car.slug} carName={car.model} />
            </div>
          </div>
        </div>
      </div>

      <ThreeSixtyModal open={show360} onClose={() => setShow360(false)} imageSrc={car.img} />
    </main>
  )
}
