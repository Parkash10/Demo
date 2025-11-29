"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Crown, Upload, Download, Flame, ChevronUp, ChevronDown, Minus } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    prevRank: 1,
    name: "Sarah Chen",
    avatar: "/young-asian-woman-student-portrait.jpg",
    university: "MIT",
    score: 15420,
    uploads: 24,
    downloads: 12480,
    streak: 45,
    isCurrentUser: true,
  },
  {
    rank: 2,
    prevRank: 3,
    name: "Marcus Johnson",
    avatar: "/young-black-man-student-portrait.jpg",
    university: "Stanford",
    score: 14850,
    uploads: 21,
    downloads: 11200,
    streak: 38,
    isCurrentUser: false,
  },
  {
    rank: 3,
    prevRank: 2,
    name: "Emily Rodriguez",
    avatar: "/young-latina-woman-student-portrait.jpg",
    university: "Berkeley",
    score: 14200,
    uploads: 28,
    downloads: 9800,
    streak: 32,
    isCurrentUser: false,
  },
  {
    rank: 4,
    prevRank: 4,
    name: "David Kim",
    avatar: "/young-asian-student.png",
    university: "Caltech",
    score: 13500,
    uploads: 19,
    downloads: 10500,
    streak: 28,
    isCurrentUser: false,
  },
  {
    rank: 5,
    prevRank: 7,
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "CMU",
    score: 12800,
    uploads: 17,
    downloads: 9200,
    streak: 21,
    isCurrentUser: false,
  },
  {
    rank: 6,
    prevRank: 5,
    name: "Jessica Park",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "NYU",
    score: 12100,
    uploads: 15,
    downloads: 8700,
    streak: 19,
    isCurrentUser: false,
  },
  {
    rank: 7,
    prevRank: 6,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "Princeton",
    score: 11500,
    uploads: 14,
    downloads: 8200,
    streak: 15,
    isCurrentUser: false,
  },
  {
    rank: 8,
    prevRank: 9,
    name: "Sophie Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "Harvard",
    score: 10900,
    uploads: 13,
    downloads: 7600,
    streak: 12,
    isCurrentUser: false,
  },
  {
    rank: 9,
    prevRank: 8,
    name: "James Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "Yale",
    score: 10200,
    uploads: 12,
    downloads: 7100,
    streak: 10,
    isCurrentUser: false,
  },
  {
    rank: 10,
    prevRank: 11,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "Columbia",
    score: 9800,
    uploads: 11,
    downloads: 6800,
    streak: 8,
    isCurrentUser: false,
  },
]

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-amber-500" />
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />
  return <span className="text-lg font-bold text-muted-foreground w-6 text-center">{rank}</span>
}

const RankChange = ({ current, prev }: { current: number; prev: number }) => {
  const diff = prev - current
  if (diff > 0) {
    return (
      <div className="flex items-center gap-0.5 text-accent">
        <ChevronUp className="w-4 h-4" />
        <span className="text-xs">{diff}</span>
      </div>
    )
  }
  if (diff < 0) {
    return (
      <div className="flex items-center gap-0.5 text-destructive">
        <ChevronDown className="w-4 h-4" />
        <span className="text-xs">{Math.abs(diff)}</span>
      </div>
    )
  }
  return <Minus className="w-4 h-4 text-muted-foreground" />
}

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState("weekly")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground mt-1">Top contributors in the StudySync community</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Second Place */}
        <div className="order-1 md:order-1">
          <div className="glass rounded-3xl p-6 text-center h-full flex flex-col items-center justify-end">
            <div className="relative mb-4">
              <Avatar className="w-20 h-20 border-4 border-gray-400">
                <AvatarImage src={leaderboardData[1].avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {leaderboardData[1].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="font-bold text-white text-sm">2</span>
              </div>
            </div>
            <h3 className="font-semibold text-foreground">{leaderboardData[1].name}</h3>
            <p className="text-sm text-muted-foreground">{leaderboardData[1].university}</p>
            <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground mt-2">
              {leaderboardData[1].score.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">points</p>
          </div>
        </div>

        {/* First Place */}
        <div className="order-0 md:order-2">
          <div className="glass rounded-3xl p-6 text-center bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
            <Crown className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-amber-500 mx-auto">
                <AvatarImage src={leaderboardData[0].avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {leaderboardData[0].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="font-bold text-white">1</span>
              </div>
            </div>
            <h3 className="font-semibold text-lg text-foreground">{leaderboardData[0].name}</h3>
            <p className="text-sm text-muted-foreground">{leaderboardData[0].university}</p>
            {leaderboardData[0].isCurrentUser && <Badge className="mt-2 bg-primary/10 text-primary">You</Badge>}
            <p className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground mt-3">
              {leaderboardData[0].score.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">points</p>

            <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="font-semibold text-foreground">{leaderboardData[0].uploads}</p>
                <p className="text-xs text-muted-foreground">Uploads</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">{(leaderboardData[0].downloads / 1000).toFixed(1)}K</p>
                <p className="text-xs text-muted-foreground">Downloads</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {leaderboardData[0].streak}
                </p>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Third Place */}
        <div className="order-2 md:order-3">
          <div className="glass rounded-3xl p-6 text-center h-full flex flex-col items-center justify-end">
            <div className="relative mb-4">
              <Avatar className="w-20 h-20 border-4 border-amber-700">
                <AvatarImage src={leaderboardData[2].avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {leaderboardData[2].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center">
                <span className="font-bold text-white text-sm">3</span>
              </div>
            </div>
            <h3 className="font-semibold text-foreground">{leaderboardData[2].name}</h3>
            <p className="text-sm text-muted-foreground">{leaderboardData[2].university}</p>
            <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground mt-2">
              {leaderboardData[2].score.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">points</p>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Rankings</CardTitle>
              <CardDescription>See where you stand among the community</CardDescription>
            </div>
            <Tabs value={timeframe} onValueChange={setTimeframe}>
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="alltime">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  user.isCurrentUser ? "bg-primary/10 border border-primary/20" : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                {/* Rank */}
                <div className="flex items-center gap-2 w-16">
                  <RankIcon rank={user.rank} />
                  <RankChange current={user.rank} prev={user.prevRank} />
                </div>

                {/* User Info */}
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{user.name}</p>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.university}</p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    {user.uploads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {(user.downloads / 1000).toFixed(1)}K
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    {user.streak}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="font-[family-name:var(--font-poppins)] font-bold text-foreground">
                    {user.score.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
