"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, BookOpen, Trophy, Gift, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DashboardQuickActions() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription>Common tasks at your fingertips</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full justify-start bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-foreground"
            variant="ghost"
            asChild
          >
            <Link href="/dashboard/uploads">
              <Upload className="w-4 h-4 mr-3 text-primary" />
              Upload New Notes
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </Button>
          <Button className="w-full justify-start hover:bg-muted text-foreground" variant="ghost" asChild>
            <Link href="/browse">
              <BookOpen className="w-4 h-4 mr-3 text-secondary" />
              Browse Notes
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </Button>
          <Button className="w-full justify-start hover:bg-muted text-foreground" variant="ghost" asChild>
            <Link href="/dashboard/leaderboard">
              <Trophy className="w-4 h-4 mr-3 text-accent" />
              View Leaderboard
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Credits & Level */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Level Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Level 12</span>
              <span className="text-sm font-medium text-foreground">3,500 / 5,000 XP</span>
            </div>
            <Progress value={70} className="h-2 bg-muted" />
            <p className="text-xs text-muted-foreground mt-2">1,500 XP to reach Level 13</p>
          </div>

          {/* Credits */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Download Credits</span>
              <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">42</span>
            </div>
            <p className="text-xs text-muted-foreground">Earn more by uploading quality notes</p>
          </div>

          {/* Badges Preview */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Recent Badges</p>
            <div className="flex gap-2">
              {["Top Contributor", "Quality Star", "Helper"].map((badge) => (
                <div
                  key={badge}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                  title={badge}
                >
                  <Trophy className="w-5 h-5 text-primary-foreground" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                +5
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
