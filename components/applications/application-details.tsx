"use client"

import { useState, useEffect } from "react"
import type { Application, ApplicationNote } from "@/types/application"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  getApplicationNotes,
  addApplicationNote,
  updateApplicationStatus,
  updateApplicationRating,
} from "@/lib/applications"
import { useAuth } from "@/lib/auth"
import { Mail, Phone, Calendar, Star, FileText, MessageSquare, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ApplicationDetailsProps {
  application: Application
  onUpdate?: (application: Application) => void
}

export function ApplicationDetails({ application, onUpdate }: ApplicationDetailsProps) {
  const { user } = useAuth()
  const [notes, setNotes] = useState<ApplicationNote[]>([])
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [selectedRating, setSelectedRating] = useState(application.rating || 0)

  useEffect(() => {
    loadNotes()
  }, [application.id])

  const loadNotes = async () => {
    try {
      const notesData = await getApplicationNotes(application.id)
      setNotes(notesData)
    } catch (error) {
      console.error("Failed to load notes:", error)
    }
  }

  const handleAddNote = async () => {
    if (!newNote.trim() || !user) return

    setIsAddingNote(true)
    try {
      const note = await addApplicationNote(application.id, newNote.trim(), user.id, user.name)
      setNotes((prev) => [note, ...prev])
      setNewNote("")
    } catch (error) {
      console.error("Failed to add note:", error)
    } finally {
      setIsAddingNote(false)
    }
  }

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdatingStatus(true)
    try {
      const updatedApp = await updateApplicationStatus(application.id, newStatus as any)
      if (updatedApp) {
        onUpdate?.(updatedApp)
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleRatingUpdate = async (rating: number) => {
    try {
      const updatedApp = await updateApplicationRating(application.id, rating)
      if (updatedApp) {
        setSelectedRating(rating)
        onUpdate?.(updatedApp)
      }
    } catch (error) {
      console.error("Failed to update rating:", error)
    }
  }

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

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${interactive ? "cursor-pointer" : ""} ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            }`}
            onClick={interactive ? () => handleRatingUpdate(i + 1) : undefined}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {application.candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">{application.candidateName}</h2>
            <p className="text-lg text-muted-foreground">{application.jobTitle}</p>
            <p className="text-sm text-muted-foreground">{application.company}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{application.candidateEmail}</span>
              </div>
              {application.candidatePhone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{application.candidatePhone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={getStatusColor(application.status)} className="text-sm">
            {application.status.replace("_", " ").toUpperCase()}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rating:</span>
            {renderStars(selectedRating, true)}
          </div>
        </div>
      </div>

      {/* Application Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Applied {formatDistanceToNow(application.appliedAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Source:</span>
              <span>{application.source}</span>
            </div>
            {application.resumeUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(application.resumeUrl, "_blank")}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Resume
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Update Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={application.status} onValueChange={handleStatusUpdate} disabled={isUpdatingStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="phone_interview">Phone Interview</SelectItem>
                <SelectItem value="technical_interview">Technical Interview</SelectItem>
                <SelectItem value="final_interview">Final Interview</SelectItem>
                <SelectItem value="offer_extended">Offer Extended</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {application.tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {application.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cover Letter */}
      {application.coverLetter && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{application.coverLetter}</p>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Notes ({notes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Note */}
          <div className="space-y-2">
            <Textarea
              placeholder="Add a note about this candidate..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <Button onClick={handleAddNote} disabled={!newNote.trim() || isAddingNote} size="sm">
              {isAddingNote ? "Adding..." : "Add Note"}
            </Button>
          </div>

          {/* Notes List */}
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{note.authorName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(note.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
            {notes.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No notes yet. Add the first note above.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
