"use client"

import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Building2, Users, FileText, Calendar, BarChart3, User, MessageSquare, Eye, Navigation } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const [showRegister, setShowRegister] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-10 w-10 text-primary" />
              <h1 className="text-3xl font-bold">Modern Hiring System</h1>
            </div>
            <p className="text-muted-foreground">Streamline your recruitment process with advanced technology</p>
          </div>

          {showRegister ? <RegisterForm /> : <LoginForm />}

          <div className="text-center">
            <Button variant="link" onClick={() => setShowRegister(!showRegister)}>
              {showRegister ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const getDashboardContent = () => {
    switch (user?.role) {
      case "admin":
      case "hr_manager":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        )
      case "employer":
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>My Job Postings</CardTitle>
                <CardDescription>Manage your active job listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Senior Developer</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Product Manager</span>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest candidate applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>John Doe</span>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Jane Smith</span>
                    <Badge variant="outline">Reviewed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "job_seeker":
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Frontend Developer at TechCorp</span>
                    <Badge>Under Review</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>UX Designer at StartupXYZ</span>
                    <Badge variant="secondary">Applied</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
                <CardDescription>Jobs matching your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>React Developer</span>
                    <Badge variant="outline">95% Match</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Full Stack Engineer</span>
                    <Badge variant="outline">88% Match</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-balance">Welcome back, {user?.name}</h2>
        <p className="text-muted-foreground mt-2">Here's what's happening with your recruitment activities today.</p>
      </div>

      {getDashboardContent()}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/jobs">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Jobs</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        {(user?.role === "admin" || user?.role === "hr_manager" || user?.role === "employer") && (
          <Link href="/applications">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Applications</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
        {user?.role === "job_seeker" && (
          <Link href="/profile">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <User className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">My Profile</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
        <Link href="/interviews">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Interviews</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/analytics">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Analytics</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/messages">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/showcase">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Eye className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Showcase</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/navigation">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Navigation className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  )
}
