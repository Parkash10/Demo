"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Download, Star, CheckCircle, Clock, MessageSquare } from "lucide-react"

const activities = [
  {
    type: "download",
    user: { name: "Alex Kim", avatar: "/young-asian-student.png", initials: "AK" },
    action: "downloaded your note",
    target: "Advanced Calculus - Chapter 5",
    time: "5 minutes ago",
    icon: Download,
    color: "text-secondary",
  },
  {
    type: "rating",
    user: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "EW" },
    action: "rated your note 5 stars",
    target: "Organic Chemistry Summary",
    time: "32 minutes ago",
    icon: Star,
    color: "text-accent",
  },
  {
    type: "approval",
    user: { name: "System", avatar: null, initials: "SS" },
    action: "approved your upload",
    target: "Data Structures Notes",
    time: "1 hour ago",
    icon: CheckCircle,
    color: "text-accent",
  },
  {
    type: "comment",
    user: { name: "James Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "JC" },
    action: "commented on",
    target: "Physics Lab Report",
    time: "2 hours ago",
    icon: MessageSquare,
    color: "text-primary",
  },
  {
    type: "pending",
    user: { name: "System", avatar: null, initials: "SS" },
    action: "reviewing your upload",
    target: "Linear Algebra Final Review",
    time: "3 hours ago",
    icon: Clock,
    color: "text-muted-foreground",
  },
]

export function DashboardActivity() {
  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription>What&apos;s happening with your notes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${activity.color}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  {activity.user.name !== "System" && <span className="font-medium">{activity.user.name} </span>}
                  {activity.action} <span className="font-medium text-primary">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              {activity.user.avatar ? (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                </Avatar>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  System
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
