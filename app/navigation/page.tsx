"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Home,
  Briefcase,
  FileText,
  User,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  Search,
  Shield,
  Users,
  Building,
  Eye,
} from "lucide-react"

interface Route {
  path: string
  title: string
  description: string
  icon: React.ReactNode
  roles: string[]
  status: "active" | "planned" | "beta"
  category: string
}

const routes: Route[] = [
  // Core Pages
  {
    path: "/",
    title: "Dashboard",
    description: "Main dashboard with role-based overview and quick actions",
    icon: <Home className="h-5 w-5" />,
    roles: ["admin", "hr_manager", "employer", "job_seeker"],
    status: "active",
    category: "Core",
  },
  {
    path: "/jobs",
    title: "Jobs Management",
    description: "Browse, create, and manage job postings with advanced filtering",
    icon: <Briefcase className="h-5 w-5" />,
    roles: ["admin", "hr_manager", "employer", "job_seeker"],
    status: "active",
    category: "Core",
  },
  {
    path: "/applications",
    title: "Applicant Tracking",
    description: "Track and manage job applications with status updates and bulk actions",
    icon: <FileText className="h-5 w-5" />,
    roles: ["admin", "hr_manager", "employer"],
    status: "active",
    category: "Core",
  },
  {
    path: "/profile",
    title: "Profile Management",
    description: "Manage candidate profiles, resumes, and professional information",
    icon: <User className="h-5 w-5" />,
    roles: ["job_seeker", "admin", "hr_manager"],
    status: "active",
    category: "Core",
  },
  {
    path: "/showcase",
    title: "System Showcase",
    description: "Complete overview of all features and pages in the recruitment platform",
    icon: <Eye className="h-5 w-5" />,
    roles: ["admin", "hr_manager", "employer", "job_seeker"],
    status: "active",
    category: "Core",
  },

  // Features
  {
    path: "/interviews",
    title: "Interview Scheduling",
    description: "Schedule and manage interviews with calendar integration",
    icon: <Calendar className="h-5 w-5" />,
    roles: ["admin", "hr_manager", "employer"],
    status: "active",
    category: "Features",
  },
  {
    path: "/analytics",
    title: "Analytics Dashboard",
    description: "Comprehensive analytics and reporting for hiring metrics",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ["admin", "hr_manager"],
    status: "active",
    category: "Features",
  },
  {
    path: "/messages",
    title: "Communication Center",
    description: "Messaging system between recruiters and candidates",
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ["admin", "hr_manager", "employer", "job_seeker"],
    status: "active",
    category: "Features",
  },

  // Admin Features
  {
    path: "/admin/users",
    title: "User Management",
    description: "Manage system users, roles, and permissions",
    icon: <Users className="h-5 w-5" />,
    roles: ["admin"],
    status: "planned",
    category: "Administration",
  },
  {
    path: "/admin/companies",
    title: "Company Management",
    description: "Manage company profiles and employer accounts",
    icon: <Building className="h-5 w-5" />,
    roles: ["admin"],
    status: "planned",
    category: "Administration",
  },
  {
    path: "/admin/security",
    title: "Security Settings",
    description: "System security configuration and audit logs",
    icon: <Shield className="h-5 w-5" />,
    roles: ["admin"],
    status: "planned",
    category: "Administration",
  },
  {
    path: "/settings",
    title: "Settings",
    description: "User preferences and system configuration",
    icon: <Settings className="h-5 w-5" />,
    roles: ["admin", "hr_manager", "employer", "job_seeker"],
    status: "planned",
    category: "Configuration",
  },
]

const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  planned: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  beta: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
}

const roleColors = {
  admin: "bg-red-500/10 text-red-500",
  hr_manager: "bg-purple-500/10 text-purple-500",
  employer: "bg-blue-500/10 text-blue-500",
  job_seeker: "bg-green-500/10 text-green-500",
}

export default function NavigationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const categories = ["All", ...Array.from(new Set(routes.map((route) => route.category)))]
  const statuses = ["All", "active", "planned", "beta"]

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || route.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || route.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const groupedRoutes = categories.reduce(
    (acc, category) => {
      if (category === "All") return acc
      acc[category] = filteredRoutes.filter((route) => route.category === category)
      return acc
    },
    {} as Record<string, Route[]>,
  )

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">System Navigation</h1>
          <p className="text-muted-foreground">
            Complete overview of all pages and features in the Modern Hiring System
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages and features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">
              {routes.filter((r) => r.status === "active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Pages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-500">
              {routes.filter((r) => r.status === "planned").length}
            </div>
            <div className="text-sm text-muted-foreground">Planned Features</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-500">{categories.length - 1}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-500">{routes.length}</div>
            <div className="text-sm text-muted-foreground">Total Routes</div>
          </CardContent>
        </Card>
      </div>

      {/* Routes by Category */}
      <div className="space-y-8">
        {Object.entries(groupedRoutes).map(
          ([category, categoryRoutes]) =>
            categoryRoutes.length > 0 && (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryRoutes.map((route) => (
                    <Card key={route.path} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">{route.icon}</div>
                            <div>
                              <CardTitle className="text-lg">{route.title}</CardTitle>
                              <Badge variant="outline" className={`mt-1 ${statusColors[route.status]}`}>
                                {route.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm leading-relaxed">{route.description}</CardDescription>

                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2">Access Roles</div>
                            <div className="flex flex-wrap gap-1">
                              {route.roles.map((role) => (
                                <Badge
                                  key={role}
                                  variant="secondary"
                                  className={`text-xs ${roleColors[role as keyof typeof roleColors]}`}
                                >
                                  {role.replace("_", " ")}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded">{route.path}</code>
                            {route.status === "active" ? (
                              <Button asChild size="sm">
                                <Link href="/">Visit Page</Link>
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                Coming Soon
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No pages found matching your search criteria.</div>
        </div>
      )}
    </div>
  )
}
