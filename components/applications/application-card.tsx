"use client"

import type { Application } from "@/types/application"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, Calendar, Star, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ApplicationCardProps {
  application: Application
  onView?: (application: Application) => void
  onStatusChange?: (application: Application) => void
  showActions?: boolean
  isSelected?: boolean
  onSelect?: (application: Application) => void
}

export function ApplicationCard({
  application,
  onView,
  onStatusChange,
  showActions = true,
  isSelected = false,
  onSelect,
}: ApplicationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "secondary"
      case "screening":
        return "outline"
      case "phone_interview":
      case "technical_interview":
      case "final_interview":
        return "default"
      case "offer_extended":
        return "default"
      case "hired":
        return "default"
      case "rejected":
        return "destructive"
      case "withdrawn":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied"
      case "screening":
        return "Screening"
      case "phone_interview":
        return "Phone Interview"
      case "technical_interview":
        return "Technical Interview"
      case "final_interview":
        return "Final Interview"
      case "offer_extended":
        return "Offer Extended"
      case "hired":
        return "Hired"
      case "rejected":
        return "Rejected"
      case "withdrawn":
        return "Withdrawn"
      default:
        return status
    }
  }

  const renderStars = (rating?: number) => {
    if (!rating) return null
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <Card
      className={`hover:shadow-md transition-shadow cursor-pointer ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={() => onView?.(application)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {onSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation()
                  onSelect(application)
                }}
                className="mt-1"
              />
            )}
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {application.candidateName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-balance">{application.candidateName}</h3>
              <p className="text-sm text-muted-foreground">{application.jobTitle}</p>
              <p className="text-xs text-muted-foreground">{application.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={getStatusColor(application.status)}>{getStatusLabel(application.status)}</Badge>
            {renderStars(application.rating)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span className="truncate">{application.candidateEmail}</span>
          </div>
          {application.candidatePhone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{application.candidatePhone}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Applied {formatDistanceToNow(application.appliedAt, { addSuffix: true })}</span>
        </div>

        {application.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {application.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {application.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{application.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {application.coverLetter && (
          <p className="text-sm text-muted-foreground line-clamp-2">{application.coverLetter}</p>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onStatusChange?.(application)
              }}
            >
              Update Status
            </Button>
            {application.resumeUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(application.resumeUrl, "_blank")
                }}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Resume
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
