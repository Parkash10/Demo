"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Users, Download, Star } from "lucide-react"

const stats = [
  { icon: FileText, value: 125000, suffix: "+", label: "Notes Shared", color: "text-primary" },
  { icon: Users, value: 50000, suffix: "+", label: "Active Students", color: "text-secondary" },
  { icon: Download, value: 2500000, suffix: "+", label: "Downloads", color: "text-accent" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Average Rating", color: "text-primary", decimals: 1 },
]

function AnimatedCounter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    return num.toLocaleString()
  }

  return (
    <div ref={ref} className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold">
      {formatNumber(count)}
      {suffix}
    </div>
  )
}

export function LandingStats() {
  return (
    <section className="py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
              Trusted by Students
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Worldwide</span>
            </h2>
            <p className="text-muted-foreground">Join the fastest growing academic resource sharing community</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
