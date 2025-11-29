import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileAchievements } from "@/components/profile/profile-achievements"
import { ProfileNotes } from "@/components/profile/profile-notes"
import { ProfileActivity } from "@/components/profile/profile-activity"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProfileHeader />
        <ProfileStats />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileNotes />
          </div>
          <div className="space-y-6">
            <ProfileAchievements />
            <ProfileActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
