"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  User,
  LogOut,
  Menu,
  Bell,
  Search,
  Shield,
  Trophy,
  ChevronDown,
} from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Browse Notes", href: "/browse" },
  { icon: Upload, label: "My Uploads", href: "/dashboard/uploads" },
  { icon: Trophy, label: "Leaderboard", href: "/dashboard/leaderboard" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Shield, label: "Approvals", href: "/dashboard/approvals" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications] = useState([
    { id: 1, title: "Note approved!", message: "Your Calculus notes were approved", time: "5m ago", unread: true },
    { id: 2, title: "New download", message: "Someone downloaded your Physics notes", time: "1h ago", unread: true },
    { id: 3, title: "Badge earned!", message: "You earned the 'Top Contributor' badge", time: "2h ago", unread: false },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-[family-name:var(--font-poppins)] font-bold text-xl text-foreground">
                StudySync
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Upgrade Card */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Go Premium</h4>
              <p className="text-sm text-muted-foreground mb-3">Unlock unlimited downloads and priority support</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-xl px-4 py-2 w-80">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes, subjects..."
                  className="bg-transparent border-none outline-none text-sm flex-1 text-foreground placeholder:text-muted-foreground"
                />
                <kbd className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">⌘K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {notifications.some((n) => n.unread) && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications
                    <span className="text-xs text-muted-foreground font-normal">
                      {notifications.filter((n) => n.unread).length} unread
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 py-3">
                      <div className="flex items-center gap-2">
                        {notification.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
                        <span className="font-medium text-foreground">{notification.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{notification.message}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-1 pr-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/young-asian-woman-student-portrait.jpg" alt="Sarah Chen" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xs">
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium text-foreground">Sarah Chen</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-foreground">Sarah Chen</span>
                      <span className="text-xs text-muted-foreground font-normal">sarah@mit.edu</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-destructive">
                    <Link href="/sign-in" className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
