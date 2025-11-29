"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, Check, Loader2, Sparkles } from "lucide-react"

const subjects = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Business",
  "Economics",
  "Psychology",
  "Other",
]

const qualityChecklist = [
  { id: "clear", label: "Content is clear and well-organized" },
  { id: "complete", label: "Notes are complete and comprehensive" },
  { id: "original", label: "This is my original work" },
  { id: "readable", label: "Handwriting/text is readable" },
]

export function UploadModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    tags: "",
  })
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf" || file.type.startsWith("image/"),
    )
    setFiles((prev) => [...prev, ...droppedFiles])
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setUploading(true)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    setUploading(false)
    setStep(3)
  }

  const resetModal = () => {
    setStep(1)
    setFiles([])
    setFormData({ title: "", subject: "", description: "", tags: "" })
    setChecklist({})
    setUploadProgress(0)
  }

  const allChecklistComplete = qualityChecklist.every((item) => checklist[item.id])

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) resetModal()
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground">
          <Upload className="w-4 h-4 mr-2" />
          Upload Notes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl glass-strong border-0">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-poppins)] text-2xl text-foreground">
            {step === 1 && "Upload Your Notes"}
            {step === 2 && "Note Details"}
            {step === 3 && "Upload Complete!"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Share your knowledge with the community"}
            {step === 2 && "Help others find your notes"}
            {step === 3 && "Your notes are being reviewed"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 my-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                  s <= step
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-1 rounded-full transition-all ${step > s ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: File Upload */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Drop your files here</h3>
              <p className="text-sm text-muted-foreground mb-4">or click to browse (PDF, Images supported)</p>
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,image/*"
                multiple
                className="hidden"
                id="file-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Browse Files
                </label>
              </Button>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-foreground">Selected Files</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              disabled={files.length === 0}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Advanced Calculus - Chapter 5 Summary"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">
                  Subject
                </Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject.toLowerCase()}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what's covered in these notes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-background/50 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-foreground">
                  Tags (comma separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="e.g., calculus, derivatives, integrals"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="bg-background/50"
                />
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="space-y-3">
              <Label className="text-foreground">Quality Checklist</Label>
              {qualityChecklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={item.id}
                    checked={checklist[item.id] || false}
                    onCheckedChange={(checked) => setChecklist({ ...checklist, [item.id]: checked as boolean })}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={item.id} className="text-sm text-muted-foreground cursor-pointer">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-medium text-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={uploading}>
                Back
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!formData.title || !formData.subject || !allChecklistComplete || uploading}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Notes"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-10 h-10 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground mb-2">
                Upload Successful!
              </h3>
              <p className="text-muted-foreground">
                Your notes have been submitted for community review. You&apos;ll be notified once they&apos;re approved.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">+50 XP earned for uploading!</span>
              </div>
            </div>
            <Button
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
