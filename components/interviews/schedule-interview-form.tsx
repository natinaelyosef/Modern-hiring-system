"use client"

import type React from "react"

import { useState } from "react"
import type { Interview, InterviewType } from "@/types/interview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Video } from "lucide-react"

interface ScheduleInterviewFormProps {
  applicationId?: string
  jobId?: string
  jobTitle?: string
  candidateName?: string
  candidateEmail?: string
  onSubmit: (interview: Omit<Interview, "id" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
}

const interviewTypes: { value: InterviewType; label: string }[] = [
  { value: "phone_screening", label: "Phone Screening" },
  { value: "video_interview", label: "Video Interview" },
  { value: "technical_interview", label: "Technical Interview" },
  { value: "behavioral_interview", label: "Behavioral Interview" },
  { value: "final_interview", label: "Final Interview" },
  { value: "panel_interview", label: "Panel Interview" },
]

export function ScheduleInterviewForm({
  applicationId = "",
  jobId = "",
  jobTitle = "",
  candidateName = "",
  candidateEmail = "",
  onSubmit,
  onCancel,
}: ScheduleInterviewFormProps) {
  const [formData, setFormData] = useState({
    applicationId,
    jobId,
    jobTitle,
    candidateId: "candidate-1", // This would come from the application
    candidateName,
    candidateEmail,
    interviewerId: "interviewer-1", // This would be selected
    interviewerName: "John Smith",
    interviewerEmail: "john.smith@company.com",
    type: "technical_interview" as InterviewType,
    status: "scheduled" as const,
    scheduledAt: "",
    duration: 60,
    location: "",
    meetingLink: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const interview = {
      ...formData,
      scheduledAt: new Date(formData.scheduledAt),
    }

    onSubmit(interview)
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedule Interview
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job and Candidate Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="candidateName">Candidate Name</Label>
              <Input
                id="candidateName"
                value={formData.candidateName}
                onChange={(e) => handleChange("candidateName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="candidateEmail">Candidate Email</Label>
            <Input
              id="candidateEmail"
              type="email"
              value={formData.candidateEmail}
              onChange={(e) => handleChange("candidateEmail", e.target.value)}
              required
            />
          </div>

          {/* Interview Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Interview Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select
                value={formData.duration.toString()}
                onValueChange={(value) => handleChange("duration", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledAt">Date & Time</Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => handleChange("scheduledAt", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interviewerName">Interviewer</Label>
              <Select
                value={formData.interviewerName}
                onValueChange={(value) => {
                  handleChange("interviewerName", value)
                  // In a real app, you'd also update interviewerId and interviewerEmail
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Sarah Davis">Sarah Davis</SelectItem>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location/Meeting Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location (Optional)
              </Label>
              <Input
                id="location"
                placeholder="Conference Room A, Building 1"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingLink" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Meeting Link (Optional)
              </Label>
              <Input
                id="meetingLink"
                placeholder="https://meet.google.com/..."
                value={formData.meetingLink}
                onChange={(e) => handleChange("meetingLink", e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Interview focus areas, special instructions, etc."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Schedule Interview
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
