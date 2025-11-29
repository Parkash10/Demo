"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp, Filter, X, Star } from "lucide-react"

const subjects = [
  { id: "cs", label: "Computer Science", count: 2450 },
  { id: "math", label: "Mathematics", count: 1820 },
  { id: "physics", label: "Physics", count: 1540 },
  { id: "chemistry", label: "Chemistry", count: 980 },
  { id: "biology", label: "Biology", count: 760 },
  { id: "engineering", label: "Engineering", count: 1230 },
  { id: "business", label: "Business", count: 890 },
  { id: "economics", label: "Economics", count: 650 },
]

const fileTypes = [
  { id: "pdf", label: "PDF", count: 8500 },
  { id: "doc", label: "Document", count: 2300 },
  { id: "images", label: "Images", count: 1200 },
]

const levels = [
  { id: "undergrad", label: "Undergraduate" },
  { id: "grad", label: "Graduate" },
  { id: "professional", label: "Professional" },
]

export function NotesFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["subjects", "rating"])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([3])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const clearAll = () => {
    setSelectedSubjects([])
    setSelectedTypes([])
    setSelectedLevels([])
    setRatingRange([3])
  }

  const hasFilters =
    selectedSubjects.length > 0 || selectedTypes.length > 0 || selectedLevels.length > 0 || ratingRange[0] > 0

  return (
    <>
      {/* Mobile Filter Button */}
      <Button variant="outline" onClick={() => setIsOpen(true)} className="lg:hidden flex items-center gap-2">
        <Filter className="w-4 h-4" />
        Filters
        {hasFilters && (
          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            {selectedSubjects.length + selectedTypes.length + selectedLevels.length}
          </span>
        )}
      </Button>

      {/* Filter Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-72 bg-card lg:bg-transparent lg:translate-x-0 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <div className="h-full overflow-y-auto p-6 lg:p-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="font-semibold text-foreground">Filters</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="glass rounded-2xl p-5 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-primary hover:text-primary/80 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Subjects */}
            <div>
              <button
                onClick={() => toggleSection("subjects")}
                className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
              >
                Subjects
                {expandedSections.includes("subjects") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.includes("subjects") && (
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={subject.id}
                          checked={selectedSubjects.includes(subject.id)}
                          onCheckedChange={(checked) =>
                            setSelectedSubjects(
                              checked
                                ? [...selectedSubjects, subject.id]
                                : selectedSubjects.filter((s) => s !== subject.id),
                            )
                          }
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor={subject.id} className="text-sm text-muted-foreground cursor-pointer">
                          {subject.label}
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground">{subject.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating */}
            <div>
              <button
                onClick={() => toggleSection("rating")}
                className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
              >
                Minimum Rating
                {expandedSections.includes("rating") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.includes("rating") && (
                <div className="space-y-4">
                  <Slider value={ratingRange} onValueChange={setRatingRange} max={5} step={0.5} className="w-full" />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      {ratingRange[0]}+ stars
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* File Type */}
            <div>
              <button
                onClick={() => toggleSection("type")}
                className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
              >
                File Type
                {expandedSections.includes("type") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.includes("type") && (
                <div className="space-y-2">
                  {fileTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={type.id}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={(checked) =>
                            setSelectedTypes(
                              checked ? [...selectedTypes, type.id] : selectedTypes.filter((t) => t !== type.id),
                            )
                          }
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor={type.id} className="text-sm text-muted-foreground cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground">{type.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Level */}
            <div>
              <button
                onClick={() => toggleSection("level")}
                className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
              >
                Academic Level
                {expandedSections.includes("level") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.includes("level") && (
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level.id} className="flex items-center gap-2">
                      <Checkbox
                        id={level.id}
                        checked={selectedLevels.includes(level.id)}
                        onCheckedChange={(checked) =>
                          setSelectedLevels(
                            checked ? [...selectedLevels, level.id] : selectedLevels.filter((l) => l !== level.id),
                          )
                        }
                        className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor={level.id} className="text-sm text-muted-foreground cursor-pointer">
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Button (Mobile) */}
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full lg:hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
