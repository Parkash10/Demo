import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { NotesGrid } from "@/components/browse/notes-grid"
import { NotesFilter } from "@/components/browse/notes-filter"
import { NotesSearch } from "@/components/browse/notes-search"

export default function BrowsePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">Browse Notes</h1>
          <p className="text-muted-foreground mt-1">Discover quality notes from students worldwide</p>
        </div>

        {/* Search Bar */}
        <NotesSearch />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <NotesFilter />

          {/* Notes Grid */}
          <div className="flex-1">
            <NotesGrid />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
