"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface Group {
  id: string
  name: string
  key: string
  creatorId: string
  createdAt: string
  memberIds: string[]
  description?: string
}

interface GroupContextType {
  groups: Group[]
  createGroup: (name: string, creatorId: string, description?: string) => Group
  joinGroup: (key: string) => Group | null
  getGroupById: (id: string) => Group | undefined
  getGroupByKey: (key: string) => Group | undefined
  addMemberToGroup: (groupId: string, userId: string) => void
  isLoading: boolean
}

const GroupContext = createContext<GroupContextType | undefined>(undefined)

function generateGroupKey(): string {
  // Generate a unique 8-character alphanumeric key
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // Excluding confusing chars
  let key = ""
  for (let i = 0; i < 8; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return key
}

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load groups from localStorage on mount
    const storedGroups = localStorage.getItem("allGroups")
    if (storedGroups) {
      try {
        setGroups(JSON.parse(storedGroups))
      } catch (error) {
        console.error("Error loading groups:", error)
        localStorage.removeItem("allGroups")
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Save groups to localStorage whenever they change
    if (groups.length > 0) {
      localStorage.setItem("allGroups", JSON.stringify(groups))
    }
  }, [groups])

  const createGroup = (name: string, creatorId: string, description?: string): Group => {
    const newGroup: Group = {
      id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      key: generateGroupKey(),
      creatorId,
      createdAt: new Date().toISOString(),
      memberIds: [creatorId],
      description,
    }

    setGroups((prev) => [...prev, newGroup])
    return newGroup
  }

  const joinGroup = (key: string): Group | null => {
    const group = groups.find((g) => g.key === key.toUpperCase())
    return group || null
  }

  const getGroupById = (id: string): Group | undefined => {
    return groups.find((g) => g.id === id)
  }

  const getGroupByKey = (key: string): Group | undefined => {
    return groups.find((g) => g.key === key.toUpperCase())
  }

  const addMemberToGroup = (groupId: string, userId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId && !group.memberIds.includes(userId)
          ? { ...group, memberIds: [...group.memberIds, userId] }
          : group
      )
    )
  }

  return (
    <GroupContext.Provider
      value={{
        groups,
        createGroup,
        joinGroup,
        getGroupById,
        getGroupByKey,
        addMemberToGroup,
        isLoading,
      }}
    >
      {children}
    </GroupContext.Provider>
  )
}

export function useGroup() {
  const context = useContext(GroupContext)
  if (context === undefined) {
    throw new Error("useGroup must be used within a GroupProvider")
  }
  return context
}

