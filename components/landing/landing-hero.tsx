"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Upload, Download, Star, Users } from "lucide-react"

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{
        animationDelay: `${delay}s`,
      }}
    />
  )
}

function GeometricShape({ className, type }: { className?: string; type: "circle" | "square" | "triangle" }) {
  const shapes = {
    circle: "rounded-full",
    square: "rounded-xl rotate-45",
    triangle: "clip-path-triangle",
  }

  return <div className={`absolute ${shapes[type]} ${className}`} />
}

export function LandingHero() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 50000
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingShape className="w-96 h-96 bg-primary/40 -top-20 -left-20 animate-float" delay={0} />
      <FloatingShape className="w-80 h-80 bg-secondary/40 top-1/4 right-10 animate-float-delayed" delay={2} />
      <FloatingShape className="w-72 h-72 bg-accent/40 bottom-20 left-1/4 animate-float" delay={4} />

      {/* Geometric Decorations */}
      <GeometricShape type="circle" className="w-4 h-4 bg-primary/60 top-32 left-[15%] animate-pulse-glow" />
      <GeometricShape type="square" className="w-6 h-6 border-2 border-secondary/40 top-40 right-[20%] animate-float" />
      <GeometricShape type="circle" className="w-3 h-3 bg-accent/60 bottom-40 right-[30%] animate-pulse-glow" />
      <GeometricShape
        type="square"
        className="w-5 h-5 border-2 border-primary/40 bottom-32 left-[25%] animate-float-delayed"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-sm text-muted-foreground">
            Join {count.toLocaleString()}+ students sharing knowledge
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="font-[family-name:var(--font-poppins)] text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-foreground">Share Knowledge,</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Grow Together
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up text-pretty"
          style={{ animationDelay: "0.2s" }}
        >
          The premier platform where students contribute quality notes to unlock a world of academic resources. Upload
          to unlock, learn to earn.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-primary-foreground px-8 py-6 text-lg rounded-xl group"
          >
            <Link href="/sign-up" className="flex items-center gap-2">
              Start Contributing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-background/50 backdrop-blur border-border hover:bg-muted px-8 py-6 text-lg rounded-xl group"
          >
            <Link href="#how-it-works" className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              See How It Works
            </Link>
          </Button>
        </div>

        {/* Feature Cards Preview */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { icon: Upload, label: "Upload Notes", value: "Easy sharing" },
            { icon: Download, label: "Download", value: "Unlimited access" },
            { icon: Star, label: "Quality", value: "Peer reviewed" },
            { icon: Users, label: "Community", value: "50K+ members" },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-4 hover:scale-105 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 mx-auto group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold text-foreground text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
