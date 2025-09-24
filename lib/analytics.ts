import type {
  HiringMetrics,
  TimeSeriesData,
  DepartmentMetrics,
  RecruitmentEfficiency,
  AnalyticsFilters,
} from "@/types/analytics"
import { getJobs } from "./jobs"
import { getApplications } from "./applications"
import { getInterviews } from "./interviews"

// Mock analytics data
const mockTimeSeriesData: TimeSeriesData[] = [
  { date: "2024-01-01", applications: 45, interviews: 12, hires: 3 },
  { date: "2024-01-02", applications: 52, interviews: 15, hires: 4 },
  { date: "2024-01-03", applications: 38, interviews: 18, hires: 2 },
  { date: "2024-01-04", applications: 61, interviews: 14, hires: 5 },
  { date: "2024-01-05", applications: 47, interviews: 20, hires: 3 },
  { date: "2024-01-06", applications: 55, interviews: 16, hires: 4 },
  { date: "2024-01-07", applications: 43, interviews: 22, hires: 6 },
]

const mockDepartmentMetrics: DepartmentMetrics[] = [
  {
    department: "Engineering",
    openPositions: 8,
    totalApplications: 156,
    averageTimeToHire: 21,
    hireRate: 0.12,
  },
  {
    department: "Product",
    openPositions: 3,
    totalApplications: 89,
    averageTimeToHire: 18,
    hireRate: 0.15,
  },
  {
    department: "Design",
    openPositions: 2,
    totalApplications: 67,
    averageTimeToHire: 16,
    hireRate: 0.18,
  },
  {
    department: "Marketing",
    openPositions: 4,
    totalApplications: 92,
    averageTimeToHire: 14,
    hireRate: 0.2,
  },
]

export async function getHiringMetrics(filters?: AnalyticsFilters): Promise<HiringMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would aggregate data from multiple sources
  const jobs = await getJobs()
  const applications = await getApplications()
  const interviews = await getInterviews()

  const totalJobs = jobs.length
  const activeJobs = jobs.filter((job) => job.status === "active").length
  const totalApplications = applications.length
  const totalInterviews = interviews.length

  const hiredApplications = applications.filter((app) => app.status === "hired").length
  const hireRate = totalApplications > 0 ? hiredApplications / totalApplications : 0

  // Mock calculations for other metrics
  const averageTimeToHire = 19 // days

  const topSkills = [
    { skill: "React", count: 45, percentage: 28.5 },
    { skill: "TypeScript", count: 38, percentage: 24.1 },
    { skill: "Node.js", count: 32, percentage: 20.3 },
    { skill: "Python", count: 28, percentage: 17.7 },
    { skill: "AWS", count: 25, percentage: 15.8 },
  ]

  const applicationsByStatus = [
    { status: "Applied", count: 45, percentage: 35.2 },
    { status: "Screening", count: 28, percentage: 21.9 },
    { status: "Interview", count: 32, percentage: 25.0 },
    { status: "Offer", count: 12, percentage: 9.4 },
    { status: "Hired", count: 11, percentage: 8.6 },
  ]

  const interviewsByType = [
    { type: "Phone Screening", count: 24, percentage: 32.4 },
    { type: "Technical", count: 18, percentage: 24.3 },
    { type: "Behavioral", count: 16, percentage: 21.6 },
    { type: "Final", count: 12, percentage: 16.2 },
    { type: "Panel", count: 4, percentage: 5.4 },
  ]

  const hiringFunnel = [
    { stage: "Applications", count: 128, percentage: 100, conversionRate: 100 },
    { stage: "Screening", count: 74, percentage: 57.8, conversionRate: 57.8 },
    { stage: "Interviews", count: 42, percentage: 32.8, conversionRate: 56.8 },
    { stage: "Offers", count: 18, percentage: 14.1, conversionRate: 42.9 },
    { stage: "Hires", count: 15, percentage: 11.7, conversionRate: 83.3 },
  ]

  return {
    totalJobs,
    activeJobs,
    totalApplications,
    totalInterviews,
    hireRate,
    averageTimeToHire,
    topSkills,
    applicationsByStatus,
    interviewsByType,
    hiringFunnel,
  }
}

export async function getTimeSeriesData(filters?: AnalyticsFilters): Promise<TimeSeriesData[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would filter based on date range
  return mockTimeSeriesData
}

export async function getDepartmentMetrics(filters?: AnalyticsFilters): Promise<DepartmentMetrics[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return mockDepartmentMetrics
}

export async function getRecruitmentEfficiency(filters?: AnalyticsFilters): Promise<RecruitmentEfficiency> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    sourceEffectiveness: [
      { source: "LinkedIn", applications: 45, hires: 8, conversionRate: 0.178, costPerHire: 1200 },
      { source: "Indeed", applications: 32, hires: 4, conversionRate: 0.125, costPerHire: 800 },
      { source: "Company Website", applications: 28, hires: 6, conversionRate: 0.214, costPerHire: 400 },
      { source: "Referrals", applications: 18, hires: 5, conversionRate: 0.278, costPerHire: 200 },
      { source: "Glassdoor", applications: 15, hires: 2, conversionRate: 0.133, costPerHire: 900 },
    ],
    recruiterPerformance: [
      {
        recruiterId: "1",
        recruiterName: "Sarah Johnson",
        activeJobs: 5,
        totalApplications: 67,
        interviews: 28,
        hires: 8,
        averageTimeToHire: 16,
      },
      {
        recruiterId: "2",
        recruiterName: "Mike Davis",
        activeJobs: 3,
        totalApplications: 45,
        interviews: 22,
        hires: 6,
        averageTimeToHire: 19,
      },
      {
        recruiterId: "3",
        recruiterName: "Emily Chen",
        activeJobs: 4,
        totalApplications: 52,
        interviews: 25,
        hires: 7,
        averageTimeToHire: 18,
      },
    ],
    jobPerformance: [
      {
        jobId: "1",
        jobTitle: "Senior Frontend Developer",
        applications: 24,
        views: 156,
        applicationRate: 0.154,
        timeToFill: 21,
        status: "active",
      },
      {
        jobId: "2",
        jobTitle: "Product Manager",
        applications: 18,
        views: 89,
        applicationRate: 0.202,
        timeToFill: 0,
        status: "active",
      },
      {
        jobId: "3",
        jobTitle: "UX Designer",
        applications: 0,
        views: 12,
        applicationRate: 0,
        timeToFill: 0,
        status: "draft",
      },
    ],
  }
}
