"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User } from "./user-context"

export interface PendingUser {
  id: string
  fullName: string
  email: string
  university: string
  groupId: string | null
  status: "pending"
  createdAt: string
  requestedAt: string
}

interface UserApprovalContextType {
  pendingUsers: PendingUser[]
  approveUser: (userId: string) => void
  rejectUser: (userId: string) => void
  addPendingUser: (user: PendingUser) => void
  getPendingUsers: () => PendingUser[]
}

const UserApprovalContext = createContext<UserApprovalContextType | undefined>(undefined)

export function UserApprovalProvider({ children }: { children: ReactNode }) {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])

  useEffect(() => {
    // Load pending users from localStorage
    const stored = localStorage.getItem("pendingUsers")
    if (stored) {
      try {
        setPendingUsers(JSON.parse(stored))
      } catch (error) {
        console.error("Error loading pending users:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Save pending users to localStorage
    if (pendingUsers.length >= 0) {
      localStorage.setItem("pendingUsers", JSON.stringify(pendingUsers))
    }
  }, [pendingUsers])

  const addPendingUser = (user: PendingUser) => {
    setPendingUsers((prev) => {
      // Check if user already exists
      if (prev.find((u) => u.id === user.id)) {
        return prev
      }
      return [...prev, user]
    })
  }

  const approveUser = (userId: string) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== userId))

    // Update user status in allUsers
    const allUsers = localStorage.getItem("allUsers")
    if (allUsers) {
      try {
        const users: User[] = JSON.parse(allUsers)
        const updatedUsers = users.map((u) =>
          u.id === userId ? { ...u, status: "approved" as const } : u
        )
        localStorage.setItem("allUsers", JSON.stringify(updatedUsers))
      } catch (error) {
        console.error("Error updating user status:", error)
      }
    }

    // Update current user if it's the approved user
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      try {
        const user: User = JSON.parse(currentUser)
        if (user.id === userId) {
          user.status = "approved"
          localStorage.setItem("currentUser", JSON.stringify(user))
        }
      } catch (error) {
        console.error("Error updating current user:", error)
      }
    }
  }

  const rejectUser = (userId: string) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== userId))

    // Update user status in allUsers
    const allUsers = localStorage.getItem("allUsers")
    if (allUsers) {
      try {
        const users: User[] = JSON.parse(allUsers)
        const updatedUsers = users.map((u) =>
          u.id === userId ? { ...u, status: "rejected" as const } : u
        )
        localStorage.setItem("allUsers", JSON.stringify(updatedUsers))
      } catch (error) {
        console.error("Error updating user status:", error)
      }
    }
  }

  const getPendingUsers = () => {
    return pendingUsers.filter((u) => u.status === "pending")
  }

  return (
    <UserApprovalContext.Provider
      value={{
        pendingUsers,
        approveUser,
        rejectUser,
        addPendingUser,
        getPendingUsers,
      }}
    >
      {children}
    </UserApprovalContext.Provider>
  )
}

export function useUserApproval() {
  const context = useContext(UserApprovalContext)
  if (context === undefined) {
    throw new Error("useUserApproval must be used within a UserApprovalProvider")
  }
  return context
}

