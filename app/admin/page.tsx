"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  TrendingUp,
  Shield,
  LogOut,
  Search,
  Download,
  Trash2,
  Eye,
  AlertTriangle,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      window.location.href = "/login"
      return
    }

    const user = JSON.parse(userData)
    if (!user.isAdmin) {
      window.location.href = "/dashboard"
      return
    }

    setCurrentUser(user)

    // Load all users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    setAllUsers(registeredUsers)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const deleteUser = (userEmail: string) => {
    if (confirm(`Are you sure you want to delete user: ${userEmail}?`)) {
      const updatedUsers = allUsers.filter((user) => user.email !== userEmail)
      setAllUsers(updatedUsers)
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
      alert("User deleted successfully")
    }
  }

  const exportUserData = () => {
    const dataStr = JSON.stringify(allUsers, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `users-export-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "analyzed" && user.analysis) ||
      (filterStatus === "pending" && !user.analysis) ||
      (filterStatus === "documents" && user.documents?.length > 0)

    return matchesSearch && matchesFilter
  })

  // Calculate statistics
  const totalUsers = allUsers.length
  const usersWithAnalysis = allUsers.filter((user) => user.analysis).length
  const totalDocuments = allUsers.reduce((sum, user) => sum + (user.documents?.length || 0), 0)
  const avgCareerScore =
    usersWithAnalysis > 0
      ? Math.round(
          allUsers.filter((user) => user.analysis).reduce((sum, user) => sum + user.analysis.overallScore, 0) /
            usersWithAnalysis,
        )
      : 0

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Admin Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-400" />
            <span className="text-2xl font-bold text-white">Admin Dashboard</span>
            <Badge variant="destructive" className="ml-2">
              ADMIN
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-400" />
              <span className="text-gray-300">
                {currentUser.firstName} {currentUser.lastName}
              </span>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-gray-300 hover:text-white hover:bg-gray-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalUsers}</div>
              <p className="text-xs text-gray-400">Registered accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Analyzed Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{usersWithAnalysis}</div>
              <p className="text-xs text-gray-400">{Math.round((usersWithAnalysis / totalUsers) * 100)}% completion</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalDocuments}</div>
              <p className="text-xs text-gray-400">Uploaded files</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Career Score</CardTitle>
              <Award className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{avgCareerScore}/100</div>
              <p className="text-xs text-gray-400">Platform average</p>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-gray-400">Manage all registered users and their data</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button onClick={exportUserData} variant="outline" className="border-gray-600 text-gray-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              >
                <option value="all">All Users</option>
                <option value="analyzed">Analyzed</option>
                <option value="pending">Pending Analysis</option>
                <option value="documents">Has Documents</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="space-y-4">
              {filteredUsers.map((user, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-white">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          {user.analysis ? (
                            <Badge variant="default" className="bg-green-600">
                              Analyzed
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-yellow-600">
                              Pending
                            </Badge>
                          )}
                          {user.documents?.length > 0 && (
                            <Badge variant="outline" className="border-blue-400 text-blue-400">
                              {user.documents.length} docs
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Joined:</span>
                          <p className="text-white">
                            {user.signupTime ? new Date(user.signupTime).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400">Documents:</span>
                          <p className="text-white">{user.documents?.length || 0}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Career Score:</span>
                          <p className="text-white">{user.analysis?.overallScore || "N/A"}/100</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Experience:</span>
                          <p className="text-white capitalize">{user.analysis?.experienceLevel || "N/A"}</p>
                        </div>
                      </div>

                      {user.analysis && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Career Progress</span>
                            <span className="text-blue-400">{user.analysis.overallScore}%</span>
                          </div>
                          <Progress value={user.analysis.overallScore} className="h-2 bg-gray-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(user)}
                        className="border-gray-600 text-gray-300"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteUser(user.email)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No users found matching your criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="bg-gray-800 border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </CardTitle>
                  <Button variant="ghost" onClick={() => setSelectedUser(null)} className="text-gray-400">
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Account Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Email:</span>
                      <p className="text-white">{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Joined:</span>
                      <p className="text-white">
                        {selectedUser.signupTime ? new Date(selectedUser.signupTime).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedUser.documents?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Uploaded Documents</h4>
                    <div className="space-y-2">
                      {selectedUser.documents.map((doc: any, index: number) => (
                        <div key={index} className="bg-gray-700 p-3 rounded">
                          <p className="text-white font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-400">
                            {(doc.size / 1024).toFixed(1)} KB • {doc.isImage ? "Image (OCR)" : "Document"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.analysis && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Career Analysis</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400">Overall Score</span>
                          <span className="text-blue-400">{selectedUser.analysis.overallScore}/100</span>
                        </div>
                        <Progress value={selectedUser.analysis.overallScore} className="h-2 bg-gray-600" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-green-400 font-medium mb-2">Strengths</h5>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {selectedUser.analysis.strengths.slice(0, 3).map((strength: string, index: number) => (
                              <li key={index}>• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-orange-400 font-medium mb-2">Improvements</h5>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {selectedUser.analysis.weaknesses.slice(0, 3).map((weakness: string, index: number) => (
                              <li key={index}>• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
