export type InterviewType =
  | "phone_screening"
  | "video_interview"
  | "technical_interview"
  | "behavioral_interview"
  | "final_interview"
  | "panel_interview"

export type InterviewStatus =
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "rescheduled"
  | "no_show"

export interface Interview {
  id: string
  applicationId: string
  jobId: string
  jobTitle: string
  candidateId: string
  candidateName: string
  candidateEmail: string
  interviewerId: string
  interviewerName: string
  interviewerEmail: string
  type: InterviewType
  status: InterviewStatus
  scheduledAt: Date
  duration: number // in minutes
  location?: string
  meetingLink?: string
  notes?: string
  feedback?: InterviewFeedback
  createdAt: Date
  updatedAt: Date
}

export interface InterviewFeedback {
  id: string
  interviewId: string
  overallRating: number // 1-5
  technicalSkills?: number
  communication?: number
  culturalFit?: number
  experience?: number
  strengths: string[]
  weaknesses: string[]
  comments: string
  recommendation: "hire" | "no_hire" | "maybe"
  createdAt: Date
}

export interface InterviewSlot {
  id: string
  interviewerId: string
  date: Date
  startTime: string
  endTime: string
  isAvailable: boolean
  duration: number
}

export interface InterviewFilters {
  search?: string
  status?: InterviewStatus
  type?: InterviewType
  interviewerId?: string
  dateFrom?: Date
  dateTo?: Date
  jobId?: string
}

export interface InterviewStats {
  total: number
  byStatus: Record<InterviewStatus, number>
  byType: Record<InterviewType, number>
  averageRating: number
  upcomingInterviews: number
}
