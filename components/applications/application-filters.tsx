"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ApplicationFilters as ApplicationFiltersType, ApplicationStatus } from "@/types/application"
import type { Job } from "@/types/job"
import { getJobs } from "@/lib/jobs"
import { Search, Filter, X } from "lucide-react"

interface ApplicationFiltersProps {
  filters: ApplicationFiltersType
  onFiltersChange: (filters: ApplicationFiltersType) => void
}

export function ApplicationFilters({ filters, onFiltersChange }: ApplicationFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const jobsData = await getJobs()
      setJobs(jobsData)
    } catch (error) {
      console.error("Failed to load jobs:", error)
    }
  }

  const updateFilter = (key: keyof ApplicationFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && (Array.isArray(value) ? value.length > 0 : true),
  )

  const statusOptions: { value: ApplicationStatus; label: string }[] = [
    { value: "applied", label: "Applied" },
    { value: "screening", label: "Screening" },
    { value: "phone_interview", label: "Phone Interview" },
    { value: "technical_interview", label: "Technical Interview" },
    { value: "final_interview", label: "Final Interview" },
    { value: "offer_extended", label: "Offer Extended" },
    { value: "hired", label: "Hired" },
    { value: "rejected", label: "Rejected" },
    { value: "withdrawn", label: "Withdrawn" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Less" : "More"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates, jobs, or companies..."
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={filters.status || "any"}
              onValueChange={(value) => updateFilter("status", value === "any" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Status</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Job Position</Label>
            <Select
              value={filters.jobId || "any"}
              onValueChange={(value) => updateFilter("jobId", value === "any" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Job</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title} - {job.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Minimum Rating</Label>
            <Select
              value={filters.rating?.toString() || "any"}
              onValueChange={(value) => updateFilter("rating", value === "any" ? undefined : Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="2">2+ Stars</SelectItem>
                <SelectItem value="1">1+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Applied From</Label>
              <Input
                type="date"
                value={filters.dateFrom ? filters.dateFrom.toISOString().split("T")[0] : ""}
                onChange={(e) => updateFilter("dateFrom", e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>
            <div className="space-y-2">
              <Label>Applied To</Label>
              <Input
                type="date"
                value={filters.dateTo ? filters.dateTo.toISOString().split("T")[0] : ""}
                onChange={(e) => updateFilter("dateTo", e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
