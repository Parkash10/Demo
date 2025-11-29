"use client"

import { useEffect, useState } from "react"
import { Upload, Download, Star, Trophy, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    label: "Notes Uploaded",
    value: 24,
    change: "+3 this week",
    trend: "up",
    icon: Upload,
    color: "from-primary to-primary/50",
  },
  {
    label: "Downloads Received",
    value: 1248,
    change: "+156 this week",
    trend: "up",
    icon: Download,
    color: "from-secondary to-secondary/50",
  },
  {
    label: "Average Rating",
    value: 4.8,
    change: "+0.2 this month",
    trend: "up",
    icon: Star,
    color: "from-accent to-accent/50",
  },
  {
    label: "Credits Earned",
    value: 3500,
    change: "+500 this week",
    trend: "up",
    icon: Trophy,
    color: "from-primary to-secondary",
  },
]

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 30
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
  }, [value])

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === "up" ? "text-accent" : "text-destructive"
              }`}
            >
              {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground mb-1">
            <AnimatedNumber value={stat.value} decimals={stat.label === "Average Rating" ? 1 : 0} />
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
