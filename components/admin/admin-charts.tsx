"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Line } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const userGrowthData = [
  { month: "Jan", users: 35000, newUsers: 2100 },
  { month: "Feb", users: 38000, newUsers: 2400 },
  { month: "Mar", users: 42000, newUsers: 2800 },
  { month: "Apr", users: 45000, newUsers: 2300 },
  { month: "May", users: 48500, newUsers: 2700 },
  { month: "Jun", users: 52847, newUsers: 3100 },
]

const contentData = [
  { day: "Mon", uploads: 245, approvals: 198, rejections: 23 },
  { day: "Tue", uploads: 312, approvals: 267, rejections: 31 },
  { day: "Wed", uploads: 278, approvals: 234, rejections: 28 },
  { day: "Thu", uploads: 356, approvals: 298, rejections: 35 },
  { day: "Fri", uploads: 289, approvals: 245, rejections: 22 },
  { day: "Sat", uploads: 167, approvals: 145, rejections: 12 },
  { day: "Sun", uploads: 134, approvals: 112, rejections: 9 },
]

export function AdminCharts(): JSX.Element {
  return (
    <div className="space-y-6">
      {/* User Growth */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">User Growth</CardTitle>
              <CardDescription>Platform user acquisition over time</CardDescription>
            </div>
            <Tabs defaultValue="6m" className="w-auto">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="1m" className="text-xs">
                  1M
                </TabsTrigger>
                <TabsTrigger value="3m" className="text-xs">
                  3M
                </TabsTrigger>
                <TabsTrigger value="6m" className="text-xs">
                  6M
                </TabsTrigger>
                <TabsTrigger value="1y" className="text-xs">
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: { label: "Total Users", color: "hsl(var(--chart-1))" },
              newUsers: { label: "New Users", color: "hsl(var(--chart-2))" },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} fill="url(#usersGradient)" />
                <Line type="monotone" dataKey="newUsers" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Content Moderation */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-foreground">Content Moderation Activity</CardTitle>
          <CardDescription>Weekly uploads, approvals, and rejections</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              uploads: { label: "Uploads", color: "hsl(var(--chart-1))" },
              approvals: { label: "Approvals", color: "hsl(var(--chart-3))" },
              rejections: { label: "Rejections", color: "hsl(var(--destructive))" },
            }}
            className="h-[200px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="uploads" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approvals" fill="#06d6a0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejections" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
