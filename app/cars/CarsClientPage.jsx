"use client"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import ThreeSixtyModal from "../../components/three-sixty-modal"
import { cars } from "../../lib/cars-data"

const parsePrice = (s) => Number(String(s).replace(/[^\d]/g, "")) || 0
const parseKm = (s) => Number(String(s).replace(/[^\d]/g, "")) || 0

export default function CarsClientPage() {
  const [q, setQ] = useState("")
  const [sort, setSort] = useState("relevance")
  const [page, setPage] = useState(1)
  const pageSize = 6

  const favKey = "wheeldeal:favorites"
  const cmpKey = "wheeldeal:compare"
  const savedKey = "wheeldeal:saved-searches"
  const [favorites, setFavorites] = useState([])
  const [compare, setCompare] = useState([])
  const [savedSearches, setSavedSearches] = useState([])
  const [show360, setShow360] = useState(false)
  const [img360, setImg360] = useState(null)

  const priceStats = useMemo(() => {
    const values = cars.map((c) => parsePrice(c.price)).filter(Boolean)
    const min = values.length ? Math.min(...values) : 0
    const max = values.length ? Math.max(...values) : 0
    return { min, max }
  }, [])

  const yearStats = useMemo(() => {
    const values = cars.map((c) => Number(c.year)).filter(Boolean)
    const min = values.length ? Math.min(...values) : 2000
    const max = values.length ? Math.max(...values) : new Date().getFullYear()
    return { min, max }
  }, [])

  const [minPrice, setMinPrice] = useState(priceStats.min)
  const [maxPrice, setMaxPrice] = useState(priceStats.max)
  const [minYear, setMinYear] = useState(yearStats.min)
  const [maxYear, setMaxYear] = useState(yearStats.max)

  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem(favKey)) || [])
      setCompare(JSON.parse(localStorage.getItem(cmpKey)) || [])
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(favKey, JSON.stringify(favorites))
    } catch {}
  }, [favorites])
  useEffect(() => {
    try {
      localStorage.setItem(cmpKey, JSON.stringify(compare))
    } catch {}
  }, [compare])

  useEffect(() => {
    try {
      setSavedSearches(JSON.parse(localStorage.getItem(savedKey)) || [])
    } catch {}
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sp = new URLSearchParams(window.location.search)
    const getNum = (k, fallback) => {
      const v = sp.get(k)
      const n = v ? Number(v) : Number.NaN
      return Number.isFinite(n) ? n : fallback
    }
    const q0 = sp.get("q") || ""
    const sort0 = sp.get("sort") || "relevance"
    const minP0 = getNum("minPrice", priceStats.min)
    const maxP0 = getNum("maxPrice", priceStats.max)
    const minY0 = getNum("minYear", yearStats.min)
    const maxY0 = getNum("maxYear", yearStats.max)
    setQ(q0)
    setSort(sort0)
    setMinPrice(minP0)
    setMaxPrice(maxP0)
    setMinYear(minY0)
    setMaxYear(maxY0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sp = new URLSearchParams()
    if (q) sp.set("q", q)
    if (sort && sort !== "relevance") sp.set("sort", sort)
    if (minPrice !== priceStats.min) sp.set("minPrice", String(minPrice))
    if (maxPrice !== priceStats.max) sp.set("maxPrice", String(maxPrice))
    if (minYear !== yearStats.min) sp.set("minYear", String(minYear))
    if (maxYear !== yearStats.max) sp.set("maxYear", String(maxYear))
    const query = sp.toString()
    const url = query ? `/cars?${query}` : "/cars"
    window.history.replaceState({}, "", url)
  }, [q, sort, minPrice, maxPrice, minYear, maxYear, priceStats.min, priceStats.max, yearStats.min, yearStats.max])

  const isFav = (id) => favorites.includes(id)
  const toggleFav = (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const canAddCompare = (slug) => !compare.includes(slug) && compare.length < 3
  const addCompare = (slug) => setCompare((prev) => (prev.includes(slug) || prev.length >= 3 ? prev : [...prev, slug]))
  const shareCar = async (slug) => {
    const url = `${window.location.origin}/cars/${slug}`
    try {
      if (navigator.share) await navigator.share({ title: "WheelDeal Car", url })
      else {
        await navigator.clipboard.writeText(url)
        alert("Link copied!")
      }
    } catch {}
  }

  const filtered = useMemo(() => {
    const ql = q.toLowerCase()
    const base = cars.filter((c) => {
      const price = parsePrice(c.price)
      const year = Number(c.year) || 0
      const matchesQ = c.model.toLowerCase().includes(ql)
      const inPrice = (minPrice ? price >= minPrice : true) && (maxPrice ? price <= maxPrice : true)
      const inYear = (minYear ? year >= minYear : true) && (maxYear ? year <= maxYear : true)
      return matchesQ && inPrice && inYear
    })
    const sorted = [...base].sort((a, b) => {
      if (sort === "price-asc") return parsePrice(a.price) - parsePrice(b.price)
      if (sort === "price-desc") return parsePrice(b.price) - parsePrice(a.price)
      if (sort === "year-desc") return Number(b.year) - Number(a.year)
      if (sort === "km-asc") return parseKm(a.mileage) - parseKm(b.mileage)
      return 0
    })
    return sorted
  }, [q, sort, minPrice, maxPrice, minYear, maxYear])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [q, sort, minPrice, maxPrice, minYear, maxYear])

  return (
    <main className="mx-auto w-[min(100%,92rem)] px-4 py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-semibold">All Cars</h1>
          <p className="text-sm text-white/70">Search, sort, save favorites, compare and preview 360°.</p>
        </div>
        <Link
          href="/"
          className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-sm backdrop-blur hover:bg-white/15"
        >
          Back to Home
        </Link>
      </header>

      {/* controls */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by model..."
          className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-desc">Year: Newest</option>
          <option value="km-asc">Mileage: Low to High</option>
        </select>
        <div className="flex items-center justify-between gap-2">
          <a
            href="/favorites"
            className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            View Favorites
          </a>
          <a
            href="/compare"
            className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Compare (#{compare.length})
          </a>
        </div>
        {/* Price filter */}
        <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm">
          <div className="flex items-center justify-between">
            <label htmlFor="priceMinRange" className="font-medium">
              Price
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/60">
                ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  setMinPrice(priceStats.min)
                  setMaxPrice(priceStats.max)
                }}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs hover:bg-white/10"
                aria-label="Reset price filter"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              id="priceMinRange"
              type="range"
              min={priceStats.min}
              max={priceStats.max}
              value={minPrice}
              onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
              className="block w-full cursor-pointer appearance-none bg-transparent"
              aria-label="Minimum price"
            />
            <input
              id="priceMaxRange"
              type="range"
              min={priceStats.min}
              max={priceStats.max}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
              className="block w-full cursor-pointer appearance-none bg-transparent"
              aria-label="Maximum price"
            />
          </div>
        </div>
        {/* Year filter */}
        <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm">
          <div className="flex items-center justify-between">
            <label htmlFor="yearMinRange" className="font-medium">
              Year
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/60">
                {minYear} - {maxYear}
              </span>
              <button
                onClick={() => {
                  setMinYear(yearStats.min)
                  setMaxYear(yearStats.max)
                }}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs hover:bg-white/10"
                aria-label="Reset year filter"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              id="yearMinRange"
              type="range"
              min={yearStats.min}
              max={yearStats.max}
              value={minYear}
              onChange={(e) => setMinYear(Math.min(Number(e.target.value), maxYear))}
              className="block w-full cursor-pointer appearance-none bg-transparent"
              aria-label="Minimum year"
            />
            <input
              id="yearMaxRange"
              type="range"
              min={yearStats.min}
              max={yearStats.max}
              value={maxYear}
              onChange={(e) => setMaxYear(Math.max(Number(e.target.value), minYear))}
              className="block w-full cursor-pointer appearance-none bg-transparent"
              aria-label="Maximum year"
            />
          </div>
        </div>
        {/* Reset */}
        <button
          onClick={() => {
            setQ("")
            setSort("relevance")
            setMinPrice(priceStats.min)
            setMaxPrice(priceStats.max)
            setMinYear(yearStats.min)
            setMaxYear(yearStats.max)
          }}
          className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          Reset Filters
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {q ? (
          <button
            onClick={() => setQ("")}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
          >
            Query: “{q}” ×
          </button>
        ) : null}
        {minPrice !== priceStats.min || maxPrice !== priceStats.max ? (
          <button
            onClick={() => {
              setMinPrice(priceStats.min)
              setMaxPrice(priceStats.max)
            }}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
          >
            Price: ₹{minPrice.toLocaleString()}–₹{maxPrice.toLocaleString()} ×
          </button>
        ) : null}
        {minYear !== yearStats.min || maxYear !== yearStats.max ? (
          <button
            onClick={() => {
              setMinYear(yearStats.min)
              setMaxYear(yearStats.max)
            }}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
          >
            Year: {minYear}–{maxYear} ×
          </button>
        ) : null}

        {/* spacer */}
        <span className="mx-1 h-4 w-px bg-white/10" aria-hidden />

        <button
          onClick={async () => {
            try {
              const name = prompt("Save this search as:")
              if (!name) return
              const sp = new URLSearchParams(window.location.search)
              const entry = { name, query: sp.toString(), ts: Date.now() }
              const next = [entry, ...savedSearches].slice(0, 10)
              setSavedSearches(next)
              localStorage.setItem(savedKey, JSON.stringify(next))
              alert("Search saved.")
            } catch {}
          }}
          className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
        >
          Save search
        </button>

        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href)
              alert("Link copied!")
            } catch {}
          }}
          className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
        >
          Copy link
        </button>

        {savedSearches.length > 0 ? (
          <details className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
            <summary className="cursor-pointer select-none">Saved ({savedSearches.length})</summary>
            <ul className="mt-2 space-y-1">
              {savedSearches.map((s, i) => (
                <li key={i}>
                  <a
                    href={`/cars?${s.query}`}
                    className="underline-offset-4 hover:underline"
                    onClick={(e) => {
                      e.preventDefault()
                      // apply saved params without reload
                      const sp = new URLSearchParams(s.query)
                      setQ(sp.get("q") || "")
                      setSort(sp.get("sort") || "relevance")
                      const getNum = (k, fallback) => {
                        const v = sp.get(k)
                        const n = v ? Number(v) : Number.NaN
                        return Number.isFinite(n) ? n : fallback
                      }
                      setMinPrice(getNum("minPrice", priceStats.min))
                      setMaxPrice(getNum("maxPrice", priceStats.max))
                      setMinYear(getNum("minYear", yearStats.min))
                      setMaxYear(getNum("maxYear", yearStats.max))
                    }}
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {pageItems.map((car) => (
          <article
            key={car.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
          >
            <img
              src={car.img || "/placeholder.svg?height=240&width=480&query=futuristic%20car%20photo"}
              alt={`${car.model} ${car.year}`}
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">{car.model}</h2>
                <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-xs text-white/80">
                  {car.year}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80">Mileage: {car.mileage}</p>
              <p className="text-sm text-white/80">Price: {car.price}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href={`/cars/${car.slug}`}
                  className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-sm backdrop-blur hover:bg-white/15"
                >
                  View Details
                </Link>
                <Link
                  href={`/cars/${car.slug}#contact`}
                  className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-sm backdrop-blur hover:bg-white/15"
                >
                  Test Drive
                </Link>
                <button
                  onClick={() => toggleFav(car.id)}
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs hover:bg-black/40"
                >
                  {isFav(car.id) ? "Saved ✓" : "Save"}
                </button>
                <a
                  href={`/compare?add=${encodeURIComponent(car.slug)}`}
                  onClick={(e) => {
                    if (canAddCompare(car.slug)) addCompare(car.slug)
                    else {
                      e.preventDefault()
                      alert("Compare list full (max 3)")
                    }
                  }}
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs hover:bg-black/40"
                >
                  Compare
                </a>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/cars/${car.slug}`
                    shareCar(car.slug)
                  }}
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs hover:bg-black/40"
                >
                  Share
                </button>
                <button
                  onClick={() => {
                    setImg360(car.img)
                    setShow360(true)
                  }}
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs hover:bg-black/40"
                >
                  360° View
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-white/70">
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ThreeSixtyModal open={show360} onClose={() => setShow360(false)} imageSrc={img360} />
    </main>
  )
}
