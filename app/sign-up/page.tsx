"use client"

import { useState } from "react"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { GroupSelection } from "@/components/auth/group-selection"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function SignUpPage() {
  const [step, setStep] = useState<"group" | "signup">("group")
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [tempUserId] = useState(() => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)

  const handleGroupComplete = (groupId: string | null) => {
    setSelectedGroupId(groupId)
    setStep("signup")
  }

  return (
    <AuthLayout>
      {step === "group" ? (
        <GroupSelection onComplete={handleGroupComplete} userId={tempUserId} />
      ) : (
        <SignUpForm initialGroupId={selectedGroupId} tempUserId={tempUserId} />
      )}
    </AuthLayout>
  )
}
