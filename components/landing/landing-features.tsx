"use client"

import { Upload, Shield, Users, Download, Star, Zap, BookOpen, Trophy } from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Upload First",
    description:
      "Contribute your notes to unlock the entire library. Quality contributions earn you credits and recognition.",
    gradient: "from-primary to-primary/50",
  },
  {
    icon: Shield,
    title: "Community Verified",
    description: "Every note is reviewed and approved by our community, ensuring high-quality content for everyone.",
    gradient: "from-secondary to-secondary/50",
  },
  {
    icon: Download,
    title: "Unlimited Downloads",
    description: "Once approved, access unlimited downloads from our vast collection of student-curated resources.",
    gradient: "from-accent to-accent/50",
  },
  {
    icon: Star,
    title: "Rating System",
    description: "Rate and review notes to help others find the best content. Top contributors get featured.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Users,
    title: "Study Groups",
    description: "Join subject-specific communities, collaborate with peers, and share insights on difficult topics.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Gain badges, climb leaderboards, and earn credits that can be used for premium features.",
    gradient: "from-accent to-primary",
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powerful Features</span>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">
            Everything You Need to
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A complete ecosystem designed to make academic resource sharing seamless, rewarding, and community-driven.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group glass rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              <h3 className="font-[family-name:var(--font-poppins)] text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Simple Process</span>
            </div>
            <h2 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">
              How
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {" "}
                StudySync{" "}
              </span>
              Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Sign Up", description: "Create your free account with your institutional email" },
              {
                step: "02",
                title: "Upload Notes",
                description: "Share your quality notes to contribute to the community",
              },
              { step: "03", title: "Get Approved", description: "Community reviews ensure quality standards are met" },
              { step: "04", title: "Unlock Access", description: "Download unlimited notes from our entire library" },
            ].map((item, i) => (
              <div key={i} className="relative">
                {/* Connector Line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                <div className="glass rounded-3xl p-6 text-center relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
