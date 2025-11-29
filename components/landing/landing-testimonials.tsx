"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science, MIT",
    avatar: "/young-asian-woman-student-portrait.jpg",
    content:
      "StudySync transformed how I prepare for exams. The quality of notes here is incredible, and contributing my own work feels rewarding. I've improved my grades significantly since joining.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Pre-Med, Stanford",
    avatar: "/young-black-man-student-portrait.jpg",
    content:
      "As a pre-med student, having access to well-organized anatomy notes is a lifesaver. The community here is supportive and the peer review system ensures top-quality content.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Business, NYU",
    avatar: "/young-latina-woman-student-portrait.jpg",
    content:
      "The gamification elements keep me motivated to contribute. I've earned enough credits to access premium features just by sharing my marketing notes. Win-win!",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Engineering, Berkeley",
    avatar: "/young-asian-student.png",
    content:
      "The upload-to-unlock system seemed unusual at first, but it creates such a positive cycle of sharing. Everyone contributes, everyone benefits.",
    rating: 5,
  },
]

export function LandingTestimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Student Stories</span>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">
            Loved by
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Students</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            See what our community members have to say about their StudySync experience
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="glass rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 flex-grow leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="glass rounded-3xl p-8">
            <Quote className="w-10 h-10 text-primary/30 mb-6" />
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    {testimonials[current].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-transparent">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-transparent">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
