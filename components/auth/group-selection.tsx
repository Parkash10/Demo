"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Users, Key, Plus, Search, Copy, Check } from "lucide-react"
import { useGroup } from "@/lib/contexts/group-context"
import { toast } from "sonner"

interface GroupSelectionProps {
  onComplete: (groupId: string | null, groupKey?: string) => void
  userId: string
}

export function GroupSelection({ onComplete, userId }: GroupSelectionProps) {
  const [selection, setSelection] = useState<"create" | "join" | null>(null)
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [groupKey, setGroupKey] = useState("")
  const [createdGroupKey, setCreatedGroupKey] = useState("")
  const { createGroup, joinGroup, getGroupByKey } = useGroup()

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name")
      return
    }

    const newGroup = createGroup(groupName.trim(), userId, groupDescription.trim() || undefined)
    setCreatedGroupKey(newGroup.key)
    toast.success("Group created successfully!")
  }

  const handleJoinGroup = () => {
    if (!groupKey.trim()) {
      toast.error("Please enter a group key")
      return
    }

    const group = getGroupByKey(groupKey.trim().toUpperCase())
    if (!group) {
      toast.error("Invalid group key. Please check and try again.")
      return
    }

    toast.success(`Joined group: ${group.name}`)
    onComplete(group.id, group.key)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(createdGroupKey)
    toast.success("Group key copied to clipboard!")
  }

  if (createdGroupKey) {
    return (
      <Card className="glass border-0 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Check className="w-5 h-5 text-accent" />
            Group Created!
          </CardTitle>
          <CardDescription>Share this key with others to join your group</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Your Group Key</Label>
            <div className="flex items-center gap-2">
              <Input
                value={createdGroupKey}
                readOnly
                className="font-mono text-lg tracking-wider text-center"
              />
              <Button type="button" size="icon" variant="outline" onClick={handleCopyKey}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this key with classmates so they can join your study group
            </p>
          </div>
          <Button
            onClick={() => onComplete(null, createdGroupKey)}
            className="w-full bg-gradient-to-r from-primary to-secondary"
          >
            Continue to Sign Up
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!selection) {
    return (
      <Card className="glass border-0 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-foreground">Join a Study Group</CardTitle>
          <CardDescription>Connect with your classmates or create your own study circle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setSelection("join")}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Join Existing Group</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter a group key from your classmate or instructor
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setSelection("create")}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-secondary/10">
                    <Plus className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Create New Group</h3>
                    <p className="text-sm text-muted-foreground">
                      Start your own study circle and invite others with a unique key
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="ghost"
              onClick={() => onComplete(null)}
              className="w-full text-muted-foreground"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (selection === "join") {
    return (
      <Card className="glass border-0 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Key className="w-5 h-5" />
            Join a Group
          </CardTitle>
          <CardDescription>Enter the group key provided by your classmate or instructor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="joinKey">Group Key</Label>
            <Input
              id="joinKey"
              value={groupKey}
              onChange={(e) => setGroupKey(e.target.value.toUpperCase())}
              placeholder="Enter 8-character key"
              className="font-mono text-lg tracking-wider text-center"
              maxLength={8}
            />
            <p className="text-xs text-muted-foreground">
              The group key should be 8 characters (letters and numbers)
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSelection(null)} className="flex-1">
              Back
            </Button>
            <Button onClick={handleJoinGroup} className="flex-1 bg-gradient-to-r from-primary to-secondary">
              Join Group
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (selection === "create") {
    return (
      <Card className="glass border-0 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" />
            Create a Group
          </CardTitle>
          <CardDescription>Set up your study circle and get a unique key to share</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name *</Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., CS101 Fall 2024"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupDescription">Description (Optional)</Label>
            <textarea
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="Brief description of your study group"
              className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSelection(null)} className="flex-1">
              Back
            </Button>
            <Button onClick={handleCreateGroup} className="flex-1 bg-gradient-to-r from-primary to-secondary">
              Create Group
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

