"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Download, Users, Flame, Target, Sparkles, Lock } from "lucide-react"

const achievements = [
  {
    id: 1,
    name: "Top Contributor",
    description: "Upload 20+ quality notes",
    icon: Trophy,
    color: "from-amber-500 to-yellow-500",
    progress: 100,
    earned: true,
    earnedDate: "Dec 15, 2024",
    rarity: "Legendary",
  },
  {
    id: 2,
    name: "Community Star",
    description: "Receive 100+ 5-star ratings",
    icon: Star,
    color: "from-primary to-secondary",
    progress: 100,
    earned: true,
    earnedDate: "Nov 28, 2024",
    rarity: "Epic",
  },
  {
    id: 3,
    name: "Download King",
    description: "Reach 10,000 total downloads",
    icon: Download,
    color: "from-accent to-teal-500",
    progress: 100,
    earned: true,
    earnedDate: "Oct 10, 2024",
    rarity: "Rare",
  },
  {
    id: 4,
    name: "Influencer",
    description: "Gain 1,000 followers",
    icon: Users,
    color: "from-pink-500 to-rose-500",
    progress: 85,
    earned: false,
    target: 1000,
    current: 850,
    rarity: "Epic",
  },
  {
    id: 5,
    name: "Streak Master",
    description: "Upload for 30 consecutive days",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    progress: 60,
    earned: false,
    target: 30,
    current: 18,
    rarity: "Legendary",
  },
  {
    id: 6,
    name: "Perfectionist",
    description: "Maintain 4.8+ rating on all notes",
    icon: Target,
    color: "from-indigo-500 to-purple-500",
    progress: 100,
    earned: true,
    earnedDate: "Sep 5, 2024",
    rarity: "Rare",
  },
]

const rarityColors: Record<string, string> = {
  Common: "bg-muted text-muted-foreground",
  Rare: "bg-accent/10 text-accent",
  Epic: "bg-secondary/10 text-secondary",
  Legendary: "bg-amber-500/10 text-amber-500",
}

export function ProfileAchievements() {
  const [selectedBadge, setSelectedBadge] = useState<(typeof achievements)[0] | null>(null)

  const earned = achievements.filter((a) => a.earned)
  const inProgress = achievements.filter((a) => !a.earned)

  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Achievements
        </CardTitle>
        <CardDescription>
          {earned.length} of {achievements.length} badges earned
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Earned Badges */}
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Earned</p>
          <div className="grid grid-cols-3 gap-3">
            {earned.map((badge) => (
              <button key={badge.id} onClick={() => setSelectedBadge(badge)} className="group relative">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-accent-foreground" />
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground truncate">{badge.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <p className="text-sm font-medium text-foreground mb-3">In Progress</p>
          <div className="space-y-3">
            {inProgress.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} opacity-50 flex items-center justify-center relative`}
                >
                  <badge.icon className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-black/30">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{badge.name}</p>
                    <Badge variant="secondary" className={rarityColors[badge.rarity]}>
                      {badge.rarity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={badge.progress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {badge.current}/{badge.target}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Badge Detail */}
        {selectedBadge && selectedBadge.earned && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 text-center animate-slide-up">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedBadge.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}
            >
              <selectedBadge.icon className="w-10 h-10 text-white" />
            </div>
            <h4 className="font-semibold text-foreground">{selectedBadge.name}</h4>
            <p className="text-sm text-muted-foreground">{selectedBadge.description}</p>
            <Badge variant="secondary" className={`mt-2 ${rarityColors[selectedBadge.rarity]}`}>
              {selectedBadge.rarity}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">Earned on {selectedBadge.earnedDate}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
