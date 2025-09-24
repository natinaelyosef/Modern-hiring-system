export type JobStatus = "draft" | "active" | "paused" | "closed"
export type ExperienceLevel = "entry" | "mid" | "senior" | "executive"
export type JobType = "full-time" | "part-time" | "contract" | "internship"
export type WorkLocation = "remote" | "hybrid" | "on-site"

export interface Job {
  id: string
  title: string
  description: string
  requirements: string[]
  responsibilities: string[]
  company: string
  department?: string
  location: string
  workLocation: WorkLocation
  jobType: JobType
  experienceLevel: ExperienceLevel
  salaryMin?: number
  salaryMax?: number
  currency: string
  skills: string[]
  benefits: string[]
  status: JobStatus
  postedBy: string
  postedAt: Date
  expiresAt?: Date
  applicationsCount: number
  viewsCount: number
  createdAt: Date
  updatedAt: Date
}

export interface JobFilters {
  search?: string
  location?: string
  workLocation?: WorkLocation
  jobType?: JobType
  experienceLevel?: ExperienceLevel
  salaryMin?: number
  salaryMax?: number
  skills?: string[]
  status?: JobStatus
}
