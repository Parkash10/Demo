"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen, Sparkles } from "lucide-react"

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-[family-name:var(--font-poppins)] font-bold text-xl text-foreground">StudySync</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/browse"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Browse Notes
            </Link>
            <Link
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Community
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild className="text-foreground hover:bg-primary/10">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-primary-foreground"
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-strong mt-2 rounded-2xl p-4 animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors py-2">
                Features
              </Link>
              <Link href="#how-it-works" className="text-foreground hover:text-primary transition-colors py-2">
                How It Works
              </Link>
              <Link href="/browse" className="text-foreground hover:text-primary transition-colors py-2">
                Browse Notes
              </Link>
              <Link href="#testimonials" className="text-foreground hover:text-primary transition-colors py-2">
                Community
              </Link>
              <hr className="border-border" />
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
