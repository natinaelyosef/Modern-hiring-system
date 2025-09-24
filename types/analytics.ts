export interface HiringMetrics {
  totalJobs: number
  activeJobs: number
  totalApplications: number
  totalInterviews: number
  hireRate: number
  averageTimeToHire: number // in days
  topSkills: SkillMetric[]
  applicationsByStatus: StatusMetric[]
  interviewsByType: TypeMetric[]
  hiringFunnel: FunnelMetric[]
}

export interface SkillMetric {
  skill: string
  count: number
  percentage: number
}

export interface StatusMetric {
  status: string
  count: number
  percentage: number
}

export interface TypeMetric {
  type: string
  count: number
  percentage: number
}

export interface FunnelMetric {
  stage: string
  count: number
  percentage: number
  conversionRate?: number
}

export interface TimeSeriesData {
  date: string
  applications: number
  interviews: number
  hires: number
}

export interface DepartmentMetrics {
  department: string
  openPositions: number
  totalApplications: number
  averageTimeToHire: number
  hireRate: number
}

export interface RecruitmentEfficiency {
  sourceEffectiveness: SourceMetric[]
  recruiterPerformance: RecruiterMetric[]
  jobPerformance: JobPerformanceMetric[]
}

export interface SourceMetric {
  source: string
  applications: number
  hires: number
  conversionRate: number
  costPerHire?: number
}

export interface RecruiterMetric {
  recruiterId: string
  recruiterName: string
  activeJobs: number
  totalApplications: number
  interviews: number
  hires: number
  averageTimeToHire: number
}

export interface JobPerformanceMetric {
  jobId: string
  jobTitle: string
  applications: number
  views: number
  applicationRate: number
  timeToFill: number
  status: string
}

export interface AnalyticsFilters {
  dateFrom?: Date
  dateTo?: Date
  department?: string
  recruiterId?: string
  jobType?: string
  experienceLevel?: string
}
