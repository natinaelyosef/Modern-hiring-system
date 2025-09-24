"use client"

import type { Job } from "@/types/job"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Users, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface JobCardProps {
  job: Job
  onView?: (job: Job) => void
  onEdit?: (job: Job) => void
  showActions?: boolean
}

export function JobCard({ job, onView, onEdit, showActions = false }: JobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "draft":
        return "secondary"
      case "paused":
        return "outline"
      case "closed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const formatSalary = (min?: number, max?: number, currency = "USD") => {
    if (!min && !max) return "Salary not specified"
    if (min && max) {
      return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k ${currency}`
    }
    if (min) return `$${(min / 1000).toFixed(0)}k+ ${currency}`
    if (max) return `Up to $${(max / 1000).toFixed(0)}k ${currency}`
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onView?.(job)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg text-balance">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span className="truncate">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{job.applicationsCount} applications</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>{job.viewsCount} views</span>
          </div>

          {showActions && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.(job)
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onView?.(job)
                }}
              >
                View
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
