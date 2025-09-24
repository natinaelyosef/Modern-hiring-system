"use client"

import { useState, useEffect } from "react"
import type { Interview, InterviewFilters, InterviewStats } from "@/types/interview"
import { getInterviews, getInterviewStats, createInterview, updateInterview } from "@/lib/interviews"
import { InterviewCard } from "@/components/interviews/interview-card"
import { ScheduleInterviewForm } from "@/components/interviews/schedule-interview-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Search, Filter, Clock, Users, Star } from "lucide-react"

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [stats, setStats] = useState<InterviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [filters, setFilters] = useState<InterviewFilters>({})

  useEffect(() => {
    loadInterviews()
    loadStats()
  }, [filters])

  const loadInterviews = async () => {
    try {
      setLoading(true)
      const data = await getInterviews(filters)
      setInterviews(data)
    } catch (error) {
      console.error("Failed to load interviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await getInterviewStats()
      setStats(data)
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  const handleScheduleInterview = async (interviewData: Omit<Interview, "id" | "createdAt" | "updatedAt">) => {
    try {
      await createInterview(interviewData)
      setShowScheduleForm(false)
      loadInterviews()
      loadStats()
    } catch (error) {
      console.error("Failed to schedule interview:", error)
    }
  }

  const handleCancelInterview = async (interview: Interview) => {
    try {
      await updateInterview(interview.id, { status: "cancelled" })
      loadInterviews()
      loadStats()
    } catch (error) {
      console.error("Failed to cancel interview:", error)
    }
  }

  const handleFilterChange = (key: keyof InterviewFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  if (showScheduleForm) {
    return (
      <div className="container mx-auto p-6">
        <ScheduleInterviewForm onSubmit={handleScheduleInterview} onCancel={() => setShowScheduleForm(false)} />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Interview Management
          </h1>
          <p className="text-muted-foreground">Schedule and manage interviews with candidates</p>
        </div>
        <Button onClick={() => setShowScheduleForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Interviews</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{stats.upcomingInterviews}</div>
                  <div className="text-sm text-muted-foreground">Upcoming</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{stats.byStatus.completed || 0}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search interviews..."
                  value={filters.search || ""}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => handleFilterChange("status", value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select
                value={filters.type || "all"}
                onValueChange={(value) => handleFilterChange("type", value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="phone_screening">Phone Screening</SelectItem>
                  <SelectItem value="video_interview">Video Interview</SelectItem>
                  <SelectItem value="technical_interview">Technical Interview</SelectItem>
                  <SelectItem value="behavioral_interview">Behavioral Interview</SelectItem>
                  <SelectItem value="final_interview">Final Interview</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Interviews ({interviews.length})</h2>
          {Object.keys(filters).length > 0 && (
            <div className="flex gap-2">
              {filters.search && <Badge variant="secondary">Search: {filters.search}</Badge>}
              {filters.status && <Badge variant="secondary">Status: {filters.status}</Badge>}
              {filters.type && <Badge variant="secondary">Type: {filters.type.replace("_", " ")}</Badge>}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : interviews.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No interviews found</h3>
              <p className="text-muted-foreground mb-4">
                {Object.keys(filters).length > 0
                  ? "No interviews match your current filters."
                  : "Get started by scheduling your first interview."}
              </p>
              {Object.keys(filters).length > 0 ? (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button onClick={() => setShowScheduleForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onCancel={handleCancelInterview}
                onFeedback={(interview) => {
                  // This would open a feedback form
                  console.log("Add feedback for:", interview.id)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
