"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Star, MessageSquare, Trophy, UserPlus } from "lucide-react"

const activities = [
  {
    type: "upload",
    title: "Uploaded new notes",
    description: "Linear Algebra Final Review",
    time: "3 hours ago",
    icon: Upload,
    color: "text-primary",
  },
  {
    type: "badge",
    title: "Earned badge",
    description: "Top Contributor",
    time: "Yesterday",
    icon: Trophy,
    color: "text-amber-500",
  },
  {
    type: "follower",
    title: "New follower",
    description: "Alex Rivera started following you",
    time: "2 days ago",
    icon: UserPlus,
    color: "text-accent",
  },
  {
    type: "rating",
    title: "Received 5-star rating",
    description: "On Data Structures Cheat Sheet",
    time: "3 days ago",
    icon: Star,
    color: "text-secondary",
  },
  {
    type: "comment",
    title: "New comment",
    description: "On Advanced Calculus notes",
    time: "4 days ago",
    icon: MessageSquare,
    color: "text-muted-foreground",
  },
]

export function ProfileActivity() {
  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 ${activity.color}`}
              >
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
