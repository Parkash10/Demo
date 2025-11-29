"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const activityData = [
  { month: "Jan", uploads: 2, downloads: 120 },
  { month: "Feb", uploads: 4, downloads: 180 },
  { month: "Mar", uploads: 3, downloads: 240 },
  { month: "Apr", uploads: 5, downloads: 320 },
  { month: "May", uploads: 4, downloads: 280 },
  { month: "Jun", uploads: 6, downloads: 450 },
]

const subjectData = [
  { subject: "Computer Science", count: 8, color: "#2563eb" },
  { subject: "Mathematics", count: 6, color: "#8b5cf6" },
  { subject: "Physics", count: 5, color: "#06d6a0" },
  { subject: "Chemistry", count: 3, color: "#f59e0b" },
  { subject: "Biology", count: 2, color: "#ef4444" },
]

const weeklyData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 62 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 72 },
  { day: "Sat", value: 28 },
  { day: "Sun", value: 15 },
]

export function DashboardCharts() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Activity Chart */}
      <Card className="lg:col-span-2 glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Activity Overview</CardTitle>
              <CardDescription>Your uploads and downloads over time</CardDescription>
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
              uploads: { label: "Uploads", color: "hsl(var(--chart-1))" },
              downloads: { label: "Downloads", color: "hsl(var(--chart-2))" },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="uploadsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="downloadsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
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
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="downloads"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#downloadsGradient)"
                />
                <Area type="monotone" dataKey="uploads" stroke="#2563eb" strokeWidth={2} fill="url(#uploadsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Subject Distribution */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-foreground">Notes by Subject</CardTitle>
          <CardDescription>Distribution of your uploaded notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {subjectData.map((item) => (
              <div key={item.subject} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.subject}</span>
                </div>
                <span className="font-medium text-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Downloads Chart */}
      <Card className="lg:col-span-3 glass border-0">
        <CardHeader>
          <CardTitle className="text-foreground">Weekly Download Activity</CardTitle>
          <CardDescription>Number of times your notes were downloaded this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: { label: "Downloads", color: "hsl(var(--chart-3))" },
            }}
            className="h-[200px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                <Bar dataKey="value" fill="#06d6a0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
