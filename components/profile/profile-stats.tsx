"use client"

import { Upload, Download, Star, Users, Eye, Heart } from "lucide-react"

const stats = [
  { icon: Upload, label: "Notes Uploaded", value: 24, color: "text-primary" },
  { icon: Download, label: "Total Downloads", value: 12480, color: "text-secondary" },
  { icon: Star, label: "Avg. Rating", value: "4.9", color: "text-accent" },
  { icon: Users, label: "Followers", value: 1248, color: "text-primary" },
  { icon: Eye, label: "Profile Views", value: 8750, color: "text-secondary" },
  { icon: Heart, label: "Likes Received", value: 3420, color: "text-destructive" },
]

export function ProfileStats() {
  const formatNumber = (num: number | string) => {
    if (typeof num === "string") return num
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="glass rounded-2xl p-4 text-center hover:scale-105 transition-transform cursor-pointer group"
        >
          <div
            className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform ${stat.color}`}
          >
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
            {formatNumber(stat.value)}
          </p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
