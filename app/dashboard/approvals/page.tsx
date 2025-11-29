import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UserApprovals } from "@/components/dashboard/user-approvals"

export default function ApprovalsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
            User Approvals
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and approve new users joining your study groups
          </p>
        </div>
        <UserApprovals />
      </div>
    </DashboardLayout>
  )
}

