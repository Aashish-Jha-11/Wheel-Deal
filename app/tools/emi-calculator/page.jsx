"use client"
import { useState, useMemo } from "react"
import Link from "next/link"

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [duration, setDuration] = useState("")
  const [unit, setUnit] = useState("months")
  const [interestRate, setInterestRate] = useState("8.5")

  const calculations = useMemo(() => {
    const L = Number.parseFloat(loanAmount || "0")
    const D = Number.parseFloat(downPayment || "0")
    const T = Number.parseFloat(duration || "0")
    const R = Number.parseFloat(interestRate || "0")
    
    if (isNaN(L) || isNaN(D) || isNaN(T) || isNaN(R) || T <= 0 || R <= 0) {
      return null
    }
    
    const months = unit === "years" ? T * 12 : T
    if (months <= 0) return null
    
    const principal = L - D
    const monthlyRate = R / (12 * 100)
    
    if (monthlyRate === 0) {
      const emi = principal / months
      return {
        monthlyEMI: emi,
        totalAmount: emi * months,
        totalInterest: 0,
        principal: principal,
        months: months
      }
    }
    
    const emi = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalAmount = emi * months
    const totalInterest = totalAmount - principal
    
    return {
      monthlyEMI: emi,
      totalAmount: totalAmount,
      totalInterest: totalInterest,
      principal: principal,
      months: months
    }
  }, [loanAmount, downPayment, duration, unit, interestRate])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      {/* Background accents */}
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

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link href="/" className="text-xl font-bold text-blue-400">
            WheelDeal
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/" className="text-white/60 hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white">EMI Calculator</span>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">EMI Calculator</h1>
          <p className="text-lg text-white/80">Calculate your monthly EMI and understand your loan breakdown</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div
            className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(122,92,255,0.15)" }}
          >
            <h2 className="text-xl font-semibold mb-6">Loan Details</h2>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Car Price / Loan Amount
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400"
                  placeholder="e.g. 800000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Down Payment
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400"
                  placeholder="e.g. 200000"
                  min="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Loan Duration
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400"
                    placeholder="e.g. 48"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Duration Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none focus:border-blue-400"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400"
                  placeholder="e.g. 8.5"
                  min="0"
                  step="0.1"
                />
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {calculations ? (
              <>
                {/* Monthly EMI */}
                <div
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 backdrop-blur-xl"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,194,255,0.2)" }}
                >
                  <h3 className="text-lg font-semibold mb-2">Monthly EMI</h3>
                  <p className="text-3xl font-bold text-blue-400">
                    {formatCurrency(calculations.monthlyEMI)}
                  </p>
                  <p className="text-sm text-white/70 mt-2">
                    Payable for {calculations.months} months
                  </p>
                </div>

                {/* Loan Breakdown */}
                <div
                  className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(122,92,255,0.15)" }}
                >
                  <h3 className="text-lg font-semibold mb-4">Loan Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Principal Amount</span>
                      <span className="font-semibold">{formatCurrency(calculations.principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Total Interest</span>
                      <span className="font-semibold text-red-400">{formatCurrency(calculations.totalInterest)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between">
                        <span className="text-white font-semibold">Total Amount</span>
                        <span className="font-bold text-green-400">{formatCurrency(calculations.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div
                  className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(122,92,255,0.15)" }}
                >
                  <h3 className="text-lg font-semibold mb-4">💡 Tips</h3>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Higher down payment reduces EMI burden</li>
                    <li>• Longer tenure means lower EMI but higher interest</li>
                    <li>• Compare rates from multiple lenders</li>
                    <li>• Consider processing fees and other charges</li>
                  </ul>
                </div>
              </>
            ) : (
              <div
                className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(122,92,255,0.15)" }}
              >
                <h3 className="text-lg font-semibold mb-4">Enter Details</h3>
                <p className="text-white/80">
                  Fill in the loan details on the left to see your EMI calculation and loan breakdown.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/60">
            * This is an indicative calculation. Actual EMI may vary based on lender terms, processing fees, and other charges.
          </p>
        </div>
      </div>
    </main>
  )
}
