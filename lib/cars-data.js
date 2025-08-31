function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export const cars = [
  {
    id: 1,
    slug: slugify("Tesla Model 3"),
    model: "Tesla Model 3",
    year: 2022,
    mileage: "15,400 km",
    price: "₹ 34,50,000",
    img: "/tesla-model-3-dark-background.png",
    features: ["Electric", "Autopilot", "Glass Roof", "Premium Audio"],
    specs: {
      range: "350 km",
      acceleration: "5.6s 0-100",
      topSpeed: "225 km/h",
      battery: "75 kWh"
    },
    description: "The Tesla Model 3 is a compact executive sedan that is battery powered and produced by Tesla. It's known for its impressive range, acceleration, and advanced autopilot features."
  },
  {
    id: 2,
    slug: slugify("Hyundai Ioniq 5"),
    model: "Hyundai Ioniq 5",
    year: 2023,
    mileage: "8,200 km",
    price: "₹ 42,20,000",
    img: "/ioniq-5-studio-shot.png",
    features: ["Electric", "Fast Charging", "V2L", "Premium Interior"],
    specs: {
      range: "480 km",
      acceleration: "7.4s 0-100",
      topSpeed: "185 km/h",
      battery: "77.4 kWh"
    },
    description: "The Hyundai Ioniq 5 is a battery electric compact crossover SUV with a futuristic design inspired by the 1975 Hyundai Pony. It features ultra-fast charging and vehicle-to-load capability."
  },
  {
    id: 3,
    slug: slugify("Kia EV6 GT Line"),
    model: "Kia EV6 GT Line",
    year: 2022,
    mileage: "12,100 km",
    price: "₹ 48,90,000",
    img: "/kia-ev6-profile-night.png",
    features: ["Electric", "GT Line", "Panoramic Roof", "Advanced Safety"],
    specs: {
      range: "528 km",
      acceleration: "7.3s 0-100",
      topSpeed: "185 km/h",
      battery: "77.4 kWh"
    },
    description: "The Kia EV6 is an electric crossover SUV with a sleek, aerodynamic design. The GT Line variant offers enhanced performance and premium features with advanced driver assistance systems."
  },
  {
    id: 4,
    slug: slugify("Skoda Octavia"),
    model: "Skoda Octavia",
    year: 2021,
    mileage: "24,500 km",
    price: "₹ 19,80,000",
    img: "/skoda-octavia-studio.png",
    features: ["Petrol", "DSG", "LED Matrix", "Virtual Cockpit"],
    specs: {
      engine: "2.0L TSI",
      power: "190 PS",
      transmission: "7-speed DSG",
      fuelType: "Petrol"
    },
    description: "The Skoda Octavia is a compact car that offers excellent value for money with premium features, spacious interior, and refined driving dynamics."
  },
  {
    id: 5,
    slug: slugify("BMW i4"),
    model: "BMW i4",
    year: 2023,
    mileage: "6,800 km",
    price: "₹ 65,20,000",
    img: "/futuristic-car-electric-blue.png",
    features: ["Electric", "BMW iDrive", "Laser Lights", "Premium Sound"],
    specs: {
      range: "590 km",
      acceleration: "6.2s 0-100",
      topSpeed: "190 km/h",
      battery: "83.9 kWh"
    },
    description: "The BMW i4 is the brand's first electric Gran Coupe, combining the dynamic driving characteristics of a BMW with sustainable electric mobility."
  },
  {
    id: 6,
    slug: slugify("Mercedes EQS"),
    model: "Mercedes EQS",
    year: 2022,
    mileage: "9,300 km",
    price: "₹ 1,25,00,000",
    img: "/luxury-sedan-night-city.png",
    features: ["Electric", "Hyperscreen", "MBUX", "Air Suspension"],
    specs: {
      range: "770 km",
      acceleration: "6.2s 0-100",
      topSpeed: "210 km/h",
      battery: "107.8 kWh"
    },
    description: "The Mercedes EQS is the flagship electric sedan from Mercedes-Benz, featuring the revolutionary Hyperscreen and setting new standards in luxury electric mobility."
  },
  {
    id: 7,
    slug: slugify("Porsche Taycan"),
    model: "Porsche Taycan",
    year: 2023,
    mileage: "4,200 km",
    price: "₹ 1,45,00,000",
    img: "/sportscar-glass-aesthetic.png",
    features: ["Electric", "Porsche Design", "Sport Chrono", "Premium Interior"],
    specs: {
      range: "484 km",
      acceleration: "5.4s 0-100",
      topSpeed: "230 km/h",
      battery: "93.4 kWh"
    },
    description: "The Porsche Taycan is the first all-electric sports car from Porsche, delivering the performance and driving dynamics that Porsche is known for, but with zero emissions."
  },
  {
    id: 8,
    slug: slugify("Audi e-tron"),
    model: "Audi e-tron",
    year: 2022,
    mileage: "18,700 km",
    price: "₹ 85,50,000",
    img: "/placeholder.jpg",
    features: ["Electric", "Quattro", "Virtual Mirrors", "Premium Interior"],
    specs: {
      range: "436 km",
      acceleration: "6.8s 0-100",
      topSpeed: "200 km/h",
      battery: "95 kWh"
    },
    description: "The Audi e-tron is Audi's first all-electric SUV, featuring quattro all-wheel drive and the brand's signature design language with cutting-edge technology."
  }
]
