"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function LandingCTA() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-strong rounded-3xl p-8 md:p-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Join 50,000+ Students</span>
          </div>

          <h2 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold mb-6 text-foreground text-balance">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {" "}
              Academic Journey?
            </span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Start sharing, start learning, start achieving. Your contribution today unlocks a world of knowledge
            tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-primary-foreground px-10 py-6 text-lg rounded-xl group"
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-background/50 backdrop-blur border-border hover:bg-muted px-10 py-6 text-lg rounded-xl"
            >
              <Link href="/browse">Browse Notes</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            No credit card required. Free forever for basic features.
          </p>
        </div>
      </div>
    </section>
  )
}
