export type ApplicationStatus =
  | "applied"
  | "screening"
  | "phone_interview"
  | "technical_interview"
  | "final_interview"
  | "offer_extended"
  | "hired"
  | "rejected"
  | "withdrawn"

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  candidateId: string
  candidateName: string
  candidateEmail: string
  candidatePhone?: string
  resumeUrl?: string
  coverLetter?: string
  status: ApplicationStatus
  appliedAt: Date
  lastUpdated: Date
  notes: ApplicationNote[]
  rating?: number
  tags: string[]
  source: string
}

export interface ApplicationNote {
  id: string
  applicationId: string
  authorId: string
  authorName: string
  content: string
  isPrivate: boolean
  createdAt: Date
}

export interface ApplicationFilters {
  search?: string
  status?: ApplicationStatus
  jobId?: string
  rating?: number
  dateFrom?: Date
  dateTo?: Date
  tags?: string[]
}

export interface ApplicationStats {
  total: number
  byStatus: Record<ApplicationStatus, number>
  averageRating: number
  recentApplications: number
}
