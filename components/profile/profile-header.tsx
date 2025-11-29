"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit2, MapPin, Calendar, LinkIcon, Twitter, Github, Award, Zap, Crown } from "lucide-react"

const levelInfo = {
  current: 12,
  title: "Knowledge Expert",
  xp: 3500,
  nextLevelXp: 5000,
  rank: 234,
}

export function ProfileHeader() {
  const [isFollowing, setIsFollowing] = useState(false)

  const progressPercent = (levelInfo.xp / levelInfo.nextLevelXp) * 100

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

        {/* Floating decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" />

        {/* Edit Cover Button */}
        <Button variant="secondary" size="sm" className="absolute top-4 right-4 bg-background/80 backdrop-blur">
          <Edit2 className="w-4 h-4 mr-1" />
          Edit Cover
        </Button>
      </div>

      {/* Profile Info */}
      <div className="relative px-4 md:px-8 pb-6">
        {/* Avatar */}
        <div className="absolute -top-16 left-4 md:left-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
              <AvatarImage src="/young-asian-woman-student-portrait.jpg" alt="Sarah Chen" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-3xl">
                SC
              </AvatarFallback>
            </Avatar>

            {/* Level Badge */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-background shadow-lg">
              <span className="font-bold text-primary-foreground text-sm">{levelInfo.current}</span>
            </div>

            {/* Edit Avatar */}
            <button className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <Edit2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-20 md:pt-4 md:pl-40 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl font-bold text-foreground">
                Sarah Chen
              </h1>
              <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <Crown className="w-3 h-3 mr-1" />
                {levelInfo.title}
              </Badge>
            </div>

            <p className="text-muted-foreground max-w-lg">
              Computer Science student at MIT. Passionate about sharing knowledge and helping others succeed. Top
              contributor in CS and Mathematics.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Cambridge, MA
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined March 2024
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-primary" />
                Rank #{levelInfo.rank}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-transparent">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-transparent">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-transparent">
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions & Level Progress */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                className={
                  isFollowing
                    ? "bg-muted text-foreground hover:bg-muted/80"
                    : "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">Message</Button>
            </div>

            {/* Level Progress Card */}
            <div className="glass rounded-2xl p-4 min-w-64">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Level {levelInfo.current}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {levelInfo.xp.toLocaleString()} / {levelInfo.nextLevelXp.toLocaleString()} XP
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {(levelInfo.nextLevelXp - levelInfo.xp).toLocaleString()} XP to Level {levelInfo.current + 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
