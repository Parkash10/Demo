"use client"

import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Download, Eye, FileText, Bookmark, BookmarkCheck } from "lucide-react"

interface NoteCardProps {
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
  viewMode: "grid" | "list"
  onPreview: () => void
}

export function NoteCard({ note, viewMode, onPreview }: NoteCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  if (viewMode === "list") {
    return (
      <div
        className="glass rounded-2xl p-4 hover:scale-[1.01] transition-all group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="relative w-32 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
            <Image src={note.thumbnail || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
            <div
              className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <Button size="sm" variant="secondary" onClick={onPreview}>
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge variant="secondary" className="mb-2 text-xs">
                  {note.subject}
                </Badge>
                <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {note.title}
                </h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsBookmarked(!isBookmarked)} className="shrink-0">
                {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5" />}
              </Button>
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={note.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-[8px]">
                    {note.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{note.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>{note.rating}</span>
                <span className="text-muted-foreground/50">({note.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{note.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>{note.pages} pages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPreview}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-muted">
        <Image src={note.thumbnail || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation()
                onPreview()
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                setIsBookmarked(!isBookmarked)
              }}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Badge className="bg-background/80 backdrop-blur text-foreground">{note.subject}</Badge>
          <Badge variant="secondary" className="bg-background/80 backdrop-blur">
            {note.fileType}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {note.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={note.author.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-[8px]">
              {note.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <span className="text-foreground font-medium">{note.author.name}</span>
            <span className="text-muted-foreground"> · {note.author.university}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium text-foreground">{note.rating}</span>
            <span className="text-xs text-muted-foreground">({note.reviews})</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {note.downloads >= 1000 ? `${(note.downloads / 1000).toFixed(1)}K` : note.downloads}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {note.pages}p
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
