"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  FileText,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
} from "lucide-react"

const pendingNotes = [
  {
    id: "1",
    title: "Quantum Computing Basics",
    subject: "Computer Science",
    author: { name: "David Kim", avatar: "/young-asian-student.png", email: "david.kim@caltech.edu" },
    uploadedAt: "2 hours ago",
    pages: 28,
    votes: { approve: 4, reject: 1 },
    timeLeft: "22h remaining",
    thumbnail: "/placeholder.svg?key=m71j5",
    status: "pending",
  },
  {
    id: "2",
    title: "Statistical Analysis Methods",
    subject: "Mathematics",
    author: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", email: "emma.w@stanford.edu" },
    uploadedAt: "5 hours ago",
    pages: 15,
    votes: { approve: 3, reject: 0 },
    timeLeft: "19h remaining",
    thumbnail: "/placeholder.svg?key=iqq4m",
    status: "pending",
  },
  {
    id: "3",
    title: "Organic Synthesis Techniques",
    subject: "Chemistry",
    author: { name: "Alex Rivera", avatar: "/placeholder.svg?height=40&width=40", email: "alex.r@mit.edu" },
    uploadedAt: "8 hours ago",
    pages: 32,
    votes: { approve: 2, reject: 3 },
    timeLeft: "16h remaining",
    thumbnail: "/placeholder.svg?key=c0gfj",
    status: "flagged",
  },
]

export function PendingApprovals() {
  const [selectedNote, setSelectedNote] = useState<(typeof pendingNotes)[0] | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const handleApprove = (noteId: string) => {
    console.log("Approved:", noteId)
    setSelectedNote(null)
  }

  const handleReject = (noteId: string) => {
    console.log("Rejected:", noteId, "Reason:", rejectReason)
    setSelectedNote(null)
    setRejectReason("")
  }

  return (
    <>
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pending Approvals
              </CardTitle>
              <CardDescription>Notes awaiting community review and admin approval</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
              {pendingNotes.length} pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingNotes.map((note) => (
              <div
                key={note.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  note.status === "flagged"
                    ? "bg-destructive/5 border border-destructive/20"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image src={note.thumbnail || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <h4 className="font-medium text-foreground truncate">{note.title}</h4>
                    {note.status === "flagged" && (
                      <Badge variant="destructive" className="shrink-0">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Flagged
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {note.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {note.pages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {note.uploadedAt}
                    </span>
                  </div>

                  {/* Voting Progress */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs">
                      <ThumbsUp className="w-3 h-3 text-accent" />
                      <span className="text-accent">{note.votes.approve}</span>
                    </div>
                    <Progress
                      value={(note.votes.approve / (note.votes.approve + note.votes.reject)) * 100}
                      className="h-1.5 flex-1 max-w-32"
                    />
                    <div className="flex items-center gap-1 text-xs">
                      <ThumbsDown className="w-3 h-3 text-destructive" />
                      <span className="text-destructive">{note.votes.reject}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {note.timeLeft}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => setSelectedNote(note)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-accent hover:text-accent hover:bg-accent/10"
                    onClick={() => handleApprove(note.id)}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div className="mt-4 text-center">
            <Button variant="outline">View All Pending ({pendingNotes.length + 153} total)</Button>
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {selectedNote && (
        <Dialog open onOpenChange={() => setSelectedNote(null)}>
          <DialogContent className="max-w-3xl glass-strong border-0">
            <DialogHeader>
              <DialogTitle className="text-foreground">Review Note Submission</DialogTitle>
              <DialogDescription>Review the content and decide whether to approve or reject</DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Preview */}
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={selectedNote.thumbnail || "/placeholder.svg"}
                    alt={selectedNote.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{selectedNote.pages} pages</span>
                  <span>{selectedNote.uploadedAt}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary">{selectedNote.subject}</Badge>
                  <h3 className="font-semibold text-lg text-foreground mt-2">{selectedNote.title}</h3>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <Avatar>
                    <AvatarImage src={selectedNote.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedNote.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{selectedNote.author.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedNote.author.email}</p>
                  </div>
                </div>

                {/* Community Votes */}
                <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                  <p className="text-sm font-medium text-foreground">Community Votes</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-accent flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          Approve ({selectedNote.votes.approve})
                        </span>
                        <span className="text-sm text-destructive flex items-center gap-1">
                          Reject ({selectedNote.votes.reject})
                          <ThumbsDown className="w-4 h-4" />
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedNote.votes.approve / (selectedNote.votes.approve + selectedNote.votes.reject)) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Rejection Reason */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Rejection Reason (optional)</label>
                  <Textarea
                    placeholder="Provide feedback to the author..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleApprove(selectedNote.id)}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button onClick={() => handleReject(selectedNote.id)} variant="destructive" className="flex-1">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
