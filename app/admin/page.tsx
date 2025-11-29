import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminStats } from "@/components/admin/admin-stats"
import { AdminCharts } from "@/components/admin/admin-charts"
import { PendingApprovals } from "@/components/admin/pending-approvals"
import { SystemHealth } from "@/components/admin/system-health"

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor platform activity and manage content moderation</p>
        </div>

        {/* Stats */}
        <AdminStats />

        {/* Charts & System Health */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AdminCharts />
          </div>
          <SystemHealth />
        </div>

        {/* Pending Approvals */}
        <PendingApprovals />
      </div>
    </AdminLayout>
  )
}
