"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Database, Server, Wifi, CheckCircle, AlertCircle } from "lucide-react"

const metrics = [
  {
    label: "Server Load",
    value: 42,
    status: "healthy",
    icon: Server,
  },
  {
    label: "Database",
    value: 67,
    status: "healthy",
    icon: Database,
  },
  {
    label: "API Response",
    value: 98,
    status: "healthy",
    icon: Wifi,
  },
  {
    label: "Storage Used",
    value: 78,
    status: "warning",
    icon: Activity,
  },
]

export function SystemHealth() {
  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent" />
          System Health
        </CardTitle>
        <CardDescription>Real-time infrastructure metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{metric.value}%</span>
                {metric.status === "healthy" ? (
                  <CheckCircle className="w-4 h-4 text-accent" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                )}
              </div>
            </div>
            <Progress
              value={metric.value}
              className={`h-2 ${
                metric.value > 90 ? "bg-destructive/20" : metric.value > 70 ? "bg-amber-500/20" : "bg-accent/20"
              }`}
            />
          </div>
        ))}

        {/* Uptime */}
        <div className="pt-4 border-t border-border">
          <div className="text-center">
            <p className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-accent">99.98%</p>
            <p className="text-sm text-muted-foreground">Uptime (30 days)</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground">
            View Logs
          </button>
          <button className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground">
            Run Diagnostics
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
