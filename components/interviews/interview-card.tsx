"use client"

import type { Interview } from "@/types/interview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, MapPin, Video, Phone, Users, Star } from "lucide-react"
import { format } from "date-fns"

interface InterviewCardProps {
  interview: Interview
  onEdit?: (interview: Interview) => void
  onCancel?: (interview: Interview) => void
  onFeedback?: (interview: Interview) => void
}

const statusColors = {
  scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  confirmed: "bg-green-500/10 text-green-500 border-green-500/20",
  in_progress: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  completed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  rescheduled: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  no_show: "bg-gray-500/10 text-gray-500 border-gray-500/20",
}

const typeIcons = {
  phone_screening: Phone,
  video_interview: Video,
  technical_interview: Users,
  behavioral_interview: Users,
  final_interview: Star,
  panel_interview: Users,
}

export function InterviewCard({ interview, onEdit, onCancel, onFeedback }: InterviewCardProps) {
  const TypeIcon = typeIcons[interview.type]
  const isUpcoming = new Date(interview.scheduledAt) > new Date()
  const canProvideFeedback = interview.status === "completed" && !interview.feedback

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TypeIcon className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg">{interview.jobTitle}</CardTitle>
            </div>
            <Badge variant="outline" className={statusColors[interview.status]}>
              {interview.status.replace("_", " ")}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {format(new Date(interview.scheduledAt), "MMM dd, yyyy")}
            </div>
            <div className="text-sm font-medium">{format(new Date(interview.scheduledAt), "h:mm a")}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {interview.candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{interview.candidateName}</div>
            <div className="text-xs text-muted-foreground">{interview.candidateEmail}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{interview.duration} minutes</span>
          </div>

          {interview.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{interview.location}</span>
            </div>
          )}

          {interview.meetingLink && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="h-4 w-4" />
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Join Meeting
              </a>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Interviewer:</span> {interview.interviewerName}
        </div>

        {interview.notes && (
          <div className="text-sm">
            <span className="font-medium text-muted-foreground">Notes:</span>
            <p className="mt-1 text-muted-foreground">{interview.notes}</p>
          </div>
        )}

        {interview.feedback && (
          <div className="border-t pt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Feedback:</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < interview.feedback!.overallRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Badge
                variant={interview.feedback.recommendation === "hire" ? "default" : "secondary"}
                className="text-xs"
              >
                {interview.feedback.recommendation}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{interview.feedback.comments}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {isUpcoming && interview.status === "scheduled" && onEdit && (
            <Button size="sm" variant="outline" onClick={() => onEdit(interview)}>
              Edit
            </Button>
          )}

          {isUpcoming && interview.status !== "cancelled" && onCancel && (
            <Button size="sm" variant="outline" onClick={() => onCancel(interview)}>
              Cancel
            </Button>
          )}

          {canProvideFeedback && onFeedback && (
            <Button size="sm" onClick={() => onFeedback(interview)}>
              Add Feedback
            </Button>
          )}

          {interview.meetingLink && isUpcoming && (
            <Button size="sm" asChild>
              <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                Join
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
