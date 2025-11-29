"use client"

import { Users, FileText, Flag, TrendingUp, TrendingDown, Clock, AlertTriangle } from "lucide-react"

const stats = [
  {
    label: "Total Users",
    value: "52,847",
    change: "+2,340 this month",
    trend: "up",
    icon: Users,
    color: "from-primary to-primary/50",
  },
  {
    label: "Notes Uploaded",
    value: "128,450",
    change: "+8,230 this month",
    trend: "up",
    icon: FileText,
    color: "from-secondary to-secondary/50",
  },
  {
    label: "Pending Reviews",
    value: "156",
    change: "42 urgent",
    trend: "warning",
    icon: Clock,
    color: "from-amber-500 to-amber-500/50",
  },
  {
    label: "Reports",
    value: "23",
    change: "5 high priority",
    trend: "warning",
    icon: Flag,
    color: "from-destructive to-destructive/50",
  },
]

export function AdminStats() {
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
                stat.trend === "up" ? "text-accent" : stat.trend === "warning" ? "text-amber-500" : "text-destructive"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : stat.trend === "warning" ? (
                <AlertTriangle className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stat.change}
            </div>
          </div>
          <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground mb-1">
            {stat.value}
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
