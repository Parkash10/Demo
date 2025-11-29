"use client"

import { useState, useEffect } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const trendingSearches = [
  "Calculus derivatives",
  "Organic Chemistry",
  "Data Structures",
  "Linear Algebra",
  "Machine Learning",
]

const recentSearches = ["Physics mechanics", "Economics 101", "Python programming"]

export function NotesSearch() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (query.length > 0) {
      const filtered = trendingSearches.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 glass rounded-2xl px-5 py-4 transition-all ${
          isFocused ? "ring-2 ring-primary/50" : ""
        }`}
      >
        <Search className={`w-5 h-5 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
        <input
          type="text"
          placeholder="Search notes by subject, topic, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuery("")}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">Search</Button>
      </div>

      {/* Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-4 z-50 animate-slide-up">
          {query && suggestions.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Suggestions</p>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Searches */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Recent Searches
                </p>
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{search}</span>
                  </button>
                ))}
              </div>

              {/* Trending */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  Trending Now
                </p>
                {trendingSearches.slice(0, 3).map((search) => (
                  <button
                    key={search}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
