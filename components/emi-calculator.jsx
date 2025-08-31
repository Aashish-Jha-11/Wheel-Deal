"use client"
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, TrendingUp, DollarSign, Clock, Percent } from "lucide-react"

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [duration, setDuration] = useState("")
  const [unit, setUnit] = useState("months")
  const [interestRate, setInterestRate] = useState("8.5")

  const monthlyEMI = useMemo(() => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl"
      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(122,92,255,0.15)" }}
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <Calculator className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">EMI Estimate</h3>
          <p className="text-sm text-white/80">Calculate your monthly loan payments</p>
        </div>
      </motion.div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label className="flex items-center gap-2 text-sm text-white/80 mb-2">
            <DollarSign className="h-4 w-4" />
            Loan Amount
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400 transition-colors"
            placeholder="e.g. 800000"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label className="flex items-center gap-2 text-sm text-white/80 mb-2">
            <TrendingUp className="h-4 w-4" />
            Down Payment
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400 transition-colors"
            placeholder="e.g. 200000"
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <Clock className="h-4 w-4" />
              Loan Duration
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400 transition-colors"
              placeholder="e.g. 48"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <Percent className="h-4 w-4" />
              Duration Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none focus:border-blue-400 transition-colors"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <label className="flex items-center gap-2 text-sm text-white/80 mb-2">
            <Percent className="h-4 w-4" />
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-blue-400 transition-colors"
            placeholder="e.g. 8.5"
            min="0"
            step="0.1"
          />
        </motion.div>
      </form>

      <AnimatePresence mode="wait">
        {monthlyEMI ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, type: "spring", damping: 20 }}
            className="mt-6 space-y-4"
          >
            {/* Monthly EMI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 backdrop-blur"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,194,255,0.2)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Monthly EMI</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", damping: 15 }}
                  className="h-2 w-2 rounded-full bg-blue-400"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-1 text-2xl font-bold text-blue-400"
              >
                {formatCurrency(monthlyEMI.monthlyEMI)}
              </motion.p>
              <p className="mt-2 text-xs text-white/70">
                Payable for {monthlyEMI.months} months
              </p>
            </motion.div>

            {/* Loan Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur"
            >
              <h4 className="text-sm font-semibold mb-3">Loan Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Principal Amount</span>
                  <span className="font-semibold">{formatCurrency(monthlyEMI.principal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Total Interest</span>
                  <span className="font-semibold text-red-400">{formatCurrency(monthlyEMI.totalInterest)}</span>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total Amount</span>
                    <span className="text-green-400">{formatCurrency(monthlyEMI.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur"
          >
            <div className="text-center">
              <Calculator className="h-8 w-8 mx-auto mb-2 text-white/40" />
              <p className="text-sm text-white/70">
                Enter loan details above to see your EMI calculation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-white/60">
          * Indicative estimate. Actual EMI may vary based on lender terms.
        </p>
      </motion.div>
    </motion.div>
  )
}
