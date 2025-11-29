"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as ToastToaster } from "@/components/ui/toaster"
import { UserProvider } from "@/lib/contexts/user-context"
import { GroupProvider } from "@/lib/contexts/group-context"
import { UserApprovalProvider } from "@/lib/contexts/user-approval-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>
        <GroupProvider>
          <UserApprovalProvider>
            {children}
            <Toaster />
            <ToastToaster />
          </UserApprovalProvider>
        </GroupProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

