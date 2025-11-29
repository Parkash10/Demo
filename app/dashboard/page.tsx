import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { DashboardActivity } from "@/components/dashboard/dashboard-activity"
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions"
import { UploadModal } from "@/components/dashboard/upload-modal"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
              Welcome back, Sarah
            </h1>
            <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your notes today</p>
          </div>
          <UploadModal />
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Charts Section */}
        <DashboardCharts />

        {/* Activity & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardActivity />
          </div>
          <DashboardQuickActions />
        </div>
      </div>
    </DashboardLayout>
  )
}
