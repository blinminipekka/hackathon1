"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, Eye, EyeOff, Shield } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Admin credentials
  const ADMIN_EMAIL = "halimiblin@gmail.com"
  const ADMIN_PASSWORD = "blini1"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple validation
    if (!email || !password) {
      alert("Please fill in all fields")
      setIsLoading(false)
      return
    }

    // Check for admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setTimeout(() => {
        const adminData = {
          email: ADMIN_EMAIL,
          firstName: "Admin",
          lastName: "User",
          isAdmin: true,
          loginTime: new Date().toISOString(),
          documents: [],
          analysis: null,
        }

        localStorage.setItem("user", JSON.stringify(adminData))
        setIsLoading(false)
        window.location.href = "/admin"
      }, 1000)
      return
    }

    // Regular user login
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const user = existingUsers.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      alert("Invalid email or password. Please check your credentials or sign up for a new account.")
      setIsLoading(false)
      return
    }

    // Simulate login process
    setTimeout(() => {
      const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: false,
        loginTime: new Date().toISOString(),
        documents: user.documents || [],
        analysis: user.analysis || null,
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">

            <span className="text-2xl font-bold text-white">CareerAnalyzer</span>
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to your account to continue your career analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Admin Login Hint */}
            <div className="mt-6 p-3 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Admin Access</span>
              </div>
              <p className="text-xs text-gray-400">
                Admin users have access to user management, analytics, and system controls.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                {"Don't have an account? "}
                <Link href="/signup" className="text-blue-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
