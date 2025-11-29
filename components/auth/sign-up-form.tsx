"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowRight, Loader2, Github, Chrome, Check, X } from "lucide-react"
import { useUser } from "@/lib/contexts/user-context"
import { useUserApproval } from "@/lib/contexts/user-approval-context"
import { useGroup } from "@/lib/contexts/group-context"
import { toast } from "sonner"

const universityDomains = ["edu", "ac.uk", "edu.au", "ac.in", "edu.cn", "uni.de"]

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
]

interface SignUpFormProps {
  initialGroupId?: string | null
  tempUserId: string
}

export function SignUpForm({ initialGroupId = null, tempUserId }: SignUpFormProps) {
  const router = useRouter()
  const { setUser } = useUser()
  const { addPendingUser } = useUserApproval()
  const { addMemberToGroup } = useGroup()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([])

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value })

    // Show domain suggestions
    if (value.includes("@") && !value.split("@")[1]?.includes(".")) {
      const prefix = value.split("@")[0]
      setEmailSuggestions(universityDomains.map((d) => `${prefix}@${d}`))
    } else {
      setEmailSuggestions([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.university) {
        setError("Please fill in all fields")
        return
      }
      setStep(2)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    // Create user object
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const newUser = {
      id: userId,
      fullName: formData.fullName,
      email: formData.email,
      university: formData.university,
      groupId: initialGroupId,
      status: "pending" as const,
      createdAt: now,
      stats: {
        notesUploaded: 0,
        totalDownloads: 0,
        avgRating: 0,
        followers: 0,
        profileViews: 0,
        likesReceived: 0,
      },
    }

    // Save user to localStorage (all users)
    const allUsers = localStorage.getItem("allUsers")
    const users = allUsers ? JSON.parse(allUsers) : []
    users.push(newUser)
    localStorage.setItem("allUsers", JSON.stringify(users))

    // Add to pending users for approval
    addPendingUser({
      id: userId,
      fullName: formData.fullName,
      email: formData.email,
      university: formData.university,
      groupId: initialGroupId,
      status: "pending",
      createdAt: now,
      requestedAt: now,
    })

    // Add user to group if they joined one
    if (initialGroupId) {
      addMemberToGroup(initialGroupId, userId)
    }

    // Set as current user (they can use the app but with pending status)
    setUser(newUser)

    toast.success("Account created! Waiting for approval from existing members.")
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Redirect based on approval status
    router.push("/dashboard")
  }

  const passwordStrength = passwordRequirements.filter((req) => req.test(formData.password)).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
          {step === 1 ? "Create Account" : "Secure Your Account"}
        </h1>
        <p className="text-muted-foreground">
          {step === 1 ? "Join 50,000+ students sharing knowledge" : "Set up your password to continue"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                s <= step
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 2 && (
              <div className={`w-12 h-1 rounded-full transition-all ${step > 1 ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <>
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-background/50 hover:bg-muted transition-all rounded-xl py-5"
              type="button"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button
              variant="outline"
              className="bg-background/50 hover:bg-muted transition-all rounded-xl py-5"
              type="button"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-4 text-muted-foreground">or continue with email</span>
            </div>
          </div>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm animate-slide-up">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 ? (
          <>
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className={`text-sm font-medium transition-colors ${
                  focusedField === "fullName" ? "text-primary" : "text-foreground"
                }`}
              >
                Full Name
              </Label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "fullName" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                  className="pl-12 py-6 rounded-xl bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`text-sm font-medium transition-colors ${
                  focusedField === "email" ? "text-primary" : "text-foreground"
                }`}
              >
                University Email
              </Label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "email" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                  className="pl-12 py-6 rounded-xl bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  required
                />

                {/* Email Suggestions */}
                {emailSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                    {emailSuggestions.slice(0, 4).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, email: suggestion })
                          setEmailSuggestions([])
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* University */}
            <div className="space-y-2">
              <Label
                htmlFor="university"
                className={`text-sm font-medium transition-colors ${
                  focusedField === "university" ? "text-primary" : "text-foreground"
                }`}
              >
                University / Institution
              </Label>
              <div className="relative">
                <Building2
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "university" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="university"
                  type="text"
                  placeholder="Enter your institution name"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  onFocus={() => setFocusedField("university")}
                  onBlur={() => setFocusedField(null)}
                  className="pl-12 py-6 rounded-xl bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={`text-sm font-medium transition-colors ${
                  focusedField === "password" ? "text-primary" : "text-foreground"
                }`}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "password" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="pl-12 pr-12 py-6 rounded-xl bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= passwordStrength
                          ? passwordStrength <= 2
                            ? "bg-destructive"
                            : passwordStrength === 3
                              ? "bg-yellow-500"
                              : "bg-accent"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      {req.test(formData.password) ? (
                        <Check className="w-3 h-3 text-accent" />
                      ) : (
                        <X className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className={req.test(formData.password) ? "text-foreground" : "text-muted-foreground"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className={`text-sm font-medium transition-colors ${
                  focusedField === "confirmPassword" ? "text-primary" : "text-foreground"
                }`}
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "confirmPassword" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  className="pl-12 py-6 rounded-xl bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  required
                />
                {formData.confirmPassword && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {formData.password === formData.confirmPassword ? (
                      <Check className="w-5 h-5 text-accent" />
                    ) : (
                      <X className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {step === 2 && (
            <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 py-6 rounded-xl">
              Back
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className={`bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-primary-foreground py-6 rounded-xl text-base font-medium group ${
              step === 1 ? "w-full" : "flex-1"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                {step === 1 ? "Continue" : "Create Account"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:text-primary/80 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
