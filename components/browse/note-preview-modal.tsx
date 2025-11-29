"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Download,
  FileText,
  Calendar,
  BookmarkPlus,
  Share2,
  Flag,
  ThumbsUp,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface NotePreviewModalProps {
  note: {
    id: string
    title: string
    subject: string
    author: { name: string; avatar: string; university: string }
    rating: number
    reviews: number
    downloads: number
    thumbnail: string
    tags: string[]
    date: string
    pages: number
    fileType: string
  }
  onClose: () => void
}

const comments = [
  {
    id: 1,
    author: { name: "Alex Kim", avatar: "/young-asian-student.png" },
    content: "These notes are incredibly well-organized! The diagrams really helped me understand the concepts.",
    date: "2 days ago",
    likes: 24,
    replies: 3,
  },
  {
    id: 2,
    author: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Saved me during finals week. Thank you for sharing!",
    date: "1 week ago",
    likes: 18,
    replies: 1,
  },
]

export function NotePreviewModal({ note, onClose }: NotePreviewModalProps) {
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden glass-strong border-0 p-0">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Preview Panel */}
          <div className="w-full md:w-1/2 bg-muted/30 relative">
            <div className="aspect-[3/4] relative">
              <Image src={note.thumbnail || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
            </div>

            {/* Page Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/80 backdrop-blur rounded-full px-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-foreground">
                {currentPage} / {note.pages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.min(note.pages, currentPage + 1))}
                disabled={currentPage === note.pages}
                className="h-8 w-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
            <DialogHeader className="p-6 pb-0">
              <div className="flex items-start justify-between gap-2">
                <Badge variant="secondary">{note.subject}</Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookmarkPlus className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <DialogTitle className="text-xl font-bold text-foreground mt-2">{note.title}</DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-6">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={note.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {note.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{note.author.name}</p>
                  <p className="text-sm text-muted-foreground">{note.author.university}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-bold text-foreground">{note.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{note.reviews} reviews</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Download className="w-4 h-4 text-secondary" />
                    <span className="font-bold text-foreground">
                      {note.downloads >= 1000 ? `${(note.downloads / 1000).toFixed(1)}K` : note.downloads}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">downloads</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FileText className="w-4 h-4 text-accent" />
                    <span className="font-bold text-foreground">{note.pages}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">pages</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">{note.date}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-muted/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Rating & Comments Tabs */}
              <Tabs defaultValue="rate" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="rate" className="flex-1">
                    Rate
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex-1">
                    Comments ({comments.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="rate" className="mt-4 space-y-4">
                  <p className="text-sm text-muted-foreground text-center">How would you rate these notes?</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setUserRating(rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            rating <= (hoveredRating || userRating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <p className="text-center text-sm text-accent animate-slide-up">
                      Thanks for rating! Your feedback helps the community.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="comments" className="mt-4 space-y-4">
                  {/* Comment Input */}
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[80px] bg-muted/30"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      disabled={!comment.trim()}
                      className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div key={c.id} className="p-4 rounded-xl bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={c.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {c.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-foreground">{c.author.name}</span>
                              <span className="text-xs text-muted-foreground">{c.date}</span>
                            </div>
                            <p className="text-sm text-foreground mt-1">{c.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <ThumbsUp className="w-3 h-3" />
                                {c.likes}
                              </button>
                              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <MessageSquare className="w-3 h-3" />
                                {c.replies} replies
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Download Action */}
            <div className="p-6 pt-0">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Notes
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">Uses 1 download credit</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
