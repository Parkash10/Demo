"use client"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Download, Eye, Clock, MoreHorizontal, Edit2, Trash2, TrendingUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const userNotes = [
  {
    id: "1",
    title: "Advanced Calculus - Derivatives & Integrals",
    subject: "Mathematics",
    rating: 4.9,
    downloads: 3420,
    views: 8920,
    thumbnail: "/calculus-notes-derivations.jpg",
    date: "2 days ago",
    status: "approved",
    trending: true,
  },
  {
    id: "2",
    title: "Data Structures & Algorithms Cheat Sheet",
    subject: "Computer Science",
    rating: 4.95,
    downloads: 5890,
    views: 12450,
    thumbnail: "/data-structures-algorithms-code.png",
    date: "1 week ago",
    status: "approved",
    trending: true,
  },
  {
    id: "3",
    title: "Machine Learning Fundamentals",
    subject: "Computer Science",
    rating: 4.85,
    downloads: 4230,
    views: 9870,
    thumbnail: "/machine-learning-neural-networks.jpg",
    date: "2 weeks ago",
    status: "approved",
    trending: false,
  },
  {
    id: "4",
    title: "Linear Algebra Final Review",
    subject: "Mathematics",
    rating: 0,
    downloads: 0,
    views: 45,
    thumbnail: "/linear-algebra-matrices.jpg",
    date: "3 hours ago",
    status: "pending",
    trending: false,
  },
]

const savedNotes = [
  {
    id: "5",
    title: "Organic Chemistry - Reaction Mechanisms",
    subject: "Chemistry",
    author: "Marcus Johnson",
    rating: 4.8,
    downloads: 2180,
    thumbnail: "/chemistry-organic-reactions.jpg",
  },
  {
    id: "6",
    title: "Quantum Mechanics - Wave Functions",
    subject: "Physics",
    author: "David Kim",
    rating: 4.7,
    downloads: 1540,
    thumbnail: "/quantum-physics-wave-equations.jpg",
  },
]

export function ProfileNotes() {
  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="text-foreground">Notes</CardTitle>
        <CardDescription>Your uploaded and saved notes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="uploads">
          <TabsList className="mb-4">
            <TabsTrigger value="uploads">My Uploads ({userNotes.length})</TabsTrigger>
            <TabsTrigger value="saved">Saved ({savedNotes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="uploads" className="space-y-4">
            {userNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-18 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image src={note.thumbnail || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
                  {note.trending && (
                    <div className="absolute top-1 left-1">
                      <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0">
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                        Trending
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <h4 className="font-medium text-foreground truncate">{note.title}</h4>
                    <Badge
                      variant={note.status === "approved" ? "secondary" : "outline"}
                      className={note.status === "pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : ""}
                    >
                      {note.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                      {note.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.subject}</p>

                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    {note.status === "approved" && (
                      <>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          {note.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {note.downloads.toLocaleString()}
                        </span>
                      </>
                    )}
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {note.views.toLocaleString()}
                    </span>
                    <span>{note.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="relative w-24 h-18 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image src={note.thumbnail || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{note.title}</h4>
                  <p className="text-sm text-muted-foreground">by {note.author}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      {note.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {note.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
