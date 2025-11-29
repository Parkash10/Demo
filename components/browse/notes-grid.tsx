"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NoteCard } from "@/components/browse/note-card"
import { NotePreviewModal } from "@/components/browse/note-preview-modal"
import { Grid3X3, List, SortAsc } from "lucide-react"

const notes = [
  {
    id: "1",
    title: "Advanced Calculus - Derivatives & Integrals",
    subject: "Mathematics",
    author: { name: "Sarah Chen", avatar: "/young-asian-woman-student-portrait.jpg", university: "MIT" },
    rating: 4.9,
    reviews: 128,
    downloads: 3420,
    thumbnail: "/calculus-notes-derivations.jpg",
    tags: ["Calculus", "Derivatives", "Integrals"],
    date: "2 days ago",
    pages: 24,
    fileType: "PDF",
  },
  {
    id: "2",
    title: "Organic Chemistry - Reaction Mechanisms",
    subject: "Chemistry",
    author: { name: "Marcus Johnson", avatar: "/young-black-man-student-portrait.jpg", university: "Stanford" },
    rating: 4.8,
    reviews: 95,
    downloads: 2180,
    thumbnail: "/chemistry-organic-reactions.jpg",
    tags: ["Organic Chemistry", "Reactions", "Mechanisms"],
    date: "5 days ago",
    pages: 32,
    fileType: "PDF",
  },
  {
    id: "3",
    title: "Data Structures & Algorithms Cheat Sheet",
    subject: "Computer Science",
    author: { name: "Emily Rodriguez", avatar: "/young-latina-woman-student-portrait.jpg", university: "Berkeley" },
    rating: 4.95,
    reviews: 256,
    downloads: 5890,
    thumbnail: "/data-structures-algorithms-code.png",
    tags: ["DSA", "Algorithms", "Programming"],
    date: "1 week ago",
    pages: 18,
    fileType: "PDF",
  },
  {
    id: "4",
    title: "Quantum Mechanics - Wave Functions",
    subject: "Physics",
    author: { name: "David Kim", avatar: "/young-asian-student.png", university: "Caltech" },
    rating: 4.7,
    reviews: 67,
    downloads: 1540,
    thumbnail: "/quantum-physics-wave-equations.jpg",
    tags: ["Quantum", "Physics", "Wave Functions"],
    date: "3 days ago",
    pages: 28,
    fileType: "PDF",
  },
  {
    id: "5",
    title: "Machine Learning Fundamentals",
    subject: "Computer Science",
    author: { name: "Alex Rivera", avatar: "/placeholder.svg?height=40&width=40", university: "CMU" },
    rating: 4.85,
    reviews: 189,
    downloads: 4230,
    thumbnail: "/machine-learning-neural-networks.jpg",
    tags: ["ML", "AI", "Neural Networks"],
    date: "4 days ago",
    pages: 45,
    fileType: "PDF",
  },
  {
    id: "6",
    title: "Microeconomics - Supply & Demand",
    subject: "Economics",
    author: { name: "Jessica Park", avatar: "/placeholder.svg?height=40&width=40", university: "NYU" },
    rating: 4.6,
    reviews: 72,
    downloads: 1890,
    thumbnail: "/economics-supply-demand-graphs.jpg",
    tags: ["Economics", "Microeconomics", "Markets"],
    date: "1 week ago",
    pages: 22,
    fileType: "PDF",
  },
]

export function NotesGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedNote, setSelectedNote] = useState<(typeof notes)[0] | null>(null)

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            12,450 notes found
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-background/50">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="downloads">Most Downloads</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className={viewMode === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} viewMode={viewMode} onPreview={() => setSelectedNote(note)} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <Button variant="outline" className="px-8 bg-transparent">
          Load More Notes
        </Button>
      </div>

      {/* Preview Modal */}
      {selectedNote && <NotePreviewModal note={selectedNote} onClose={() => setSelectedNote(null)} />}
    </div>
  )
}
