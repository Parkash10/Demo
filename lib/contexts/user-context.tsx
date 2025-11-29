"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  id: string
  fullName: string
  email: string
  university: string
  groupId: string | null
  status: "pending" | "approved" | "rejected"
  createdAt: string
  avatar?: string
  stats: {
    notesUploaded: number
    totalDownloads: number
    avgRating: number
    followers: number
    profileViews: number
    likesReceived: number
  }
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
  logout: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error loading user:", error)
        localStorage.removeItem("currentUser")
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [user])

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("allUsers")
    localStorage.removeItem("allGroups")
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

