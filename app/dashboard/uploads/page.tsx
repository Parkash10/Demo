import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UploadModal } from "@/components/dashboard/upload-modal"
import { ProfileNotes } from "@/components/profile/profile-notes"

export default function UploadsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
              My Uploads
            </h1>
            <p className="text-muted-foreground mt-1">Manage and track all your uploaded notes</p>
          </div>
          <UploadModal />
        </div>

        {/* User Notes */}
        <ProfileNotes />
      </div>
    </DashboardLayout>
  )
}

