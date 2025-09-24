"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import type { Application, ApplicationFilters as ApplicationFiltersType, ApplicationStats } from "@/types/application"
import { getApplications, getApplicationStats, bulkUpdateApplications } from "@/lib/applications"
import { ApplicationCard } from "@/components/applications/application-card"
import { ApplicationFilters } from "@/components/applications/application-filters"
import { ApplicationDetails } from "@/components/applications/application-details"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, Star, TrendingUp, MoreHorizontal } from "lucide-react"

export default function ApplicationsPage() {
  const { user, isAuthenticated } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [stats, setStats] = useState<ApplicationStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<ApplicationFiltersType>({})
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [showBulkActions, setShowBulkActions] = useState(false)

  const canViewApplications = user?.role === "admin" || user?.role === "hr_manager" || user?.role === "employer"

  useEffect(() => {
    if (isAuthenticated && canViewApplications) {
      loadApplications()
      loadStats()
    }
  }, [isAuthenticated, canViewApplications, filters])

  const loadApplications = async () => {
    setIsLoading(true)
    try {
      const applicationsData = await getApplications(filters)
      setApplications(applicationsData)
    } catch (error) {
      console.error("Failed to load applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await getApplicationStats()
      setStats(statsData)
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  const handleApplicationUpdate = (updatedApplication: Application) => {
    setApplications((prev) => prev.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)))
    setSelectedApplication(updatedApplication)
    loadStats() // Refresh stats
  }

  const handleSelectApplication = (application: Application) => {
    setSelectedApplications((prev) => {
      if (prev.includes(application.id)) {
        return prev.filter((id) => id !== application.id)
      } else {
        return [...prev, application.id]
      }
    })
  }

  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedApplications.length === 0) return

    try {
      const updatedApps = await bulkUpdateApplications(selectedApplications, {
        status: status as any,
      })

      setApplications((prev) =>
        prev.map((app) => {
          const updated = updatedApps.find((u) => u.id === app.id)
          return updated || app
        }),
      )

      setSelectedApplications([])
      setShowBulkActions(false)
      loadStats()
    } catch (error) {
      console.error("Failed to bulk update applications:", error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Please sign in</h1>
          <p className="text-muted-foreground">You need to be signed in to view applications.</p>
        </div>
      </div>
    )
  }

  if (!canViewApplications) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to view applications.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Application Tracking</h1>
          <p className="text-muted-foreground mt-1">Manage candidate applications and track hiring progress</p>
        </div>
        {selectedApplications.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selectedApplications.length} selected</Badge>
            <Button variant="outline" size="sm" onClick={() => setShowBulkActions(true)}>
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">{stats.recentApplications} this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats.byStatus.screening || 0) +
                  (stats.byStatus.phone_interview || 0) +
                  (stats.byStatus.technical_interview || 0) +
                  (stats.byStatus.final_interview || 0)}
              </div>
              <p className="text-xs text-muted-foreground">Active candidates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Out of 5 stars</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.byStatus.hired || 0}</div>
              <p className="text-xs text-muted-foreground">Successful hires</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        <ApplicationFilters filters={filters} onFiltersChange={setFilters} />

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No applications found</h3>
              <p className="text-muted-foreground">
                {Object.keys(filters).length > 0
                  ? "Try adjusting your filters to see more results."
                  : "No applications have been submitted yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onView={setSelectedApplication}
                isSelected={selectedApplications.includes(application.id)}
                onSelect={handleSelectApplication}
              />
            ))}
          </div>
        )}
      </div>

      {/* Application Details Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <ApplicationDetails application={selectedApplication} onUpdate={handleApplicationUpdate} />
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Dialog */}
      <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Actions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Update status for {selectedApplications.length} selected applications:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => handleBulkStatusUpdate("screening")}>
                Move to Screening
              </Button>
              <Button variant="outline" onClick={() => handleBulkStatusUpdate("phone_interview")}>
                Schedule Phone Interview
              </Button>
              <Button variant="outline" onClick={() => handleBulkStatusUpdate("technical_interview")}>
                Technical Interview
              </Button>
              <Button variant="outline" onClick={() => handleBulkStatusUpdate("rejected")}>
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
