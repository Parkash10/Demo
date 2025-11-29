"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useUserApproval } from "@/lib/contexts/user-approval-context"
import { useUser } from "@/lib/contexts/user-context"
import { useGroup } from "@/lib/contexts/group-context"
import {
  CheckCircle,
  XCircle,
  User,
  Building2,
  Mail,
  Calendar,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"

export function UserApprovals() {
  const { getPendingUsers, approveUser, rejectUser } = useUserApproval()
  const { user: currentUser } = useUser()
  const { getGroupById } = useGroup()
  const [pendingUsers, setPendingUsers] = useState(getPendingUsers())
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [rejectReason, setRejectReason] = useState("")

  useEffect(() => {
    setPendingUsers(getPendingUsers())
  }, [getPendingUsers])

  const handleApprove = (userId: string) => {
    approveUser(userId)
    setPendingUsers(getPendingUsers())
    toast.success("User approved successfully!")
    setSelectedUser(null)
  }

  const handleReject = (userId: string) => {
    rejectUser(userId)
    setPendingUsers(getPendingUsers())
    toast.success("User rejected")
    setSelectedUser(null)
    setRejectReason("")
  }

  // Filter pending users based on current user's group or all if admin
  const relevantUsers = pendingUsers.filter((pendingUser) => {
    if (!currentUser) return false
    // Show users from same group or all if user is in admin group
    return (
      pendingUser.groupId === currentUser.groupId ||
      currentUser.email.includes("admin") ||
      currentUser.id === getGroupById(currentUser.groupId || "")?.creatorId
    )
  })

  if (relevantUsers.length === 0) {
    return (
      <Card className="glass border-0">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Pending Approvals</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            There are currently no users waiting for approval in your study groups.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pending User Approvals
              </CardTitle>
              <CardDescription>Review new users requesting to join your study groups</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
              {relevantUsers.length} pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relevantUsers.map((pendingUser) => {
              const group = pendingUser.groupId ? getGroupById(pendingUser.groupId) : null
              return (
                <div
                  key={pendingUser.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      {pendingUser.fullName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <h4 className="font-medium text-foreground truncate">{pendingUser.fullName}</h4>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {pendingUser.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {pendingUser.university}
                      </span>
                      {group && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {group.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Requested {new Date(pendingUser.requestedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(pendingUser)}>
                      Review
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-accent hover:text-accent hover:bg-accent/10"
                      onClick={() => handleApprove(pendingUser.id)}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setSelectedUser(pendingUser)
                        setRejectReason("")
                      }}
                    >
                      <XCircle className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {selectedUser && (
        <Dialog open onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl glass-strong border-0">
            <DialogHeader>
              <DialogTitle className="text-foreground">Review User Request</DialogTitle>
              <DialogDescription>
                Review the user details and decide whether to approve or reject
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xl">
                    {selectedUser.fullName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{selectedUser.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">University</Label>
                  <p className="text-foreground">{selectedUser.university}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Request Date</Label>
                  <p className="text-foreground">
                    {new Date(selectedUser.requestedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedUser.groupId && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Requested Group</Label>
                  <p className="text-foreground">
                    {getGroupById(selectedUser.groupId)?.name || "Unknown Group"}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Rejection Reason (optional)
                </Label>
                <Textarea
                  placeholder="Provide feedback to the user..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="bg-muted/50"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleApprove(selectedUser.id)}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button onClick={() => handleReject(selectedUser.id)} variant="destructive" className="flex-1">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

