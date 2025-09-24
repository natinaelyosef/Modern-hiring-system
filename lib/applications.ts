import type {
  Application,
  ApplicationFilters,
  ApplicationStats,
  ApplicationNote,
  ApplicationStatus,
} from "@/types/application"

// Mock application data
const mockApplications: Application[] = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    candidateId: "c1",
    candidateName: "John Doe",
    candidateEmail: "john.doe@email.com",
    candidatePhone: "+1 (555) 123-4567",
    resumeUrl: "/resumes/john-doe.pdf",
    coverLetter:
      "I am excited to apply for the Senior Frontend Developer position at TechCorp. With over 5 years of experience in React and TypeScript, I believe I would be a great fit for your team.",
    status: "technical_interview",
    appliedAt: new Date("2024-01-20"),
    lastUpdated: new Date("2024-01-25"),
    notes: [],
    rating: 4,
    tags: ["React", "TypeScript", "Strong candidate"],
    source: "Company Website",
  },
  {
    id: "2",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    candidateId: "c2",
    candidateName: "Jane Smith",
    candidateEmail: "jane.smith@email.com",
    candidatePhone: "+1 (555) 987-6543",
    resumeUrl: "/resumes/jane-smith.pdf",
    status: "phone_interview",
    appliedAt: new Date("2024-01-22"),
    lastUpdated: new Date("2024-01-24"),
    notes: [],
    rating: 5,
    tags: ["React", "Vue.js", "Team Lead"],
    source: "LinkedIn",
  },
  {
    id: "3",
    jobId: "2",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    candidateId: "c3",
    candidateName: "Mike Johnson",
    candidateEmail: "mike.johnson@email.com",
    status: "screening",
    appliedAt: new Date("2024-01-23"),
    lastUpdated: new Date("2024-01-23"),
    notes: [],
    rating: 3,
    tags: ["Product Strategy", "Analytics"],
    source: "Indeed",
  },
  {
    id: "4",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    candidateId: "c4",
    candidateName: "Sarah Wilson",
    candidateEmail: "sarah.wilson@email.com",
    status: "rejected",
    appliedAt: new Date("2024-01-18"),
    lastUpdated: new Date("2024-01-21"),
    notes: [],
    rating: 2,
    tags: ["Junior level", "Needs more experience"],
    source: "Company Website",
  },
  {
    id: "5",
    jobId: "2",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    candidateId: "c5",
    candidateName: "David Brown",
    candidateEmail: "david.brown@email.com",
    status: "offer_extended",
    appliedAt: new Date("2024-01-15"),
    lastUpdated: new Date("2024-01-26"),
    notes: [],
    rating: 5,
    tags: ["Excellent fit", "Strong background"],
    source: "Referral",
  },
]

const mockNotes: ApplicationNote[] = [
  {
    id: "n1",
    applicationId: "1",
    authorId: "1",
    authorName: "HR Manager",
    content: "Great technical skills demonstrated in the coding challenge. Moving to final interview.",
    isPrivate: false,
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "n2",
    applicationId: "2",
    authorId: "1",
    authorName: "HR Manager",
    content: "Impressive leadership experience. Scheduling technical interview.",
    isPrivate: false,
    createdAt: new Date("2024-01-24"),
  },
]

export const getApplications = async (filters?: ApplicationFilters): Promise<Application[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredApplications = [...mockApplications]

  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredApplications = filteredApplications.filter(
        (app) =>
          app.candidateName.toLowerCase().includes(searchLower) ||
          app.candidateEmail.toLowerCase().includes(searchLower) ||
          app.jobTitle.toLowerCase().includes(searchLower) ||
          app.company.toLowerCase().includes(searchLower),
      )
    }

    if (filters.status) {
      filteredApplications = filteredApplications.filter((app) => app.status === filters.status)
    }

    if (filters.jobId) {
      filteredApplications = filteredApplications.filter((app) => app.jobId === filters.jobId)
    }

    if (filters.rating) {
      filteredApplications = filteredApplications.filter((app) => app.rating && app.rating >= filters.rating!)
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredApplications = filteredApplications.filter((app) =>
        filters.tags!.some((tag) => app.tags.some((appTag) => appTag.toLowerCase().includes(tag.toLowerCase()))),
      )
    }
  }

  return filteredApplications.sort((a, b) => b.appliedAt.getTime() - a.appliedAt.getTime())
}

export const getApplicationById = async (id: string): Promise<Application | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockApplications.find((app) => app.id === id) || null
}

export const updateApplicationStatus = async (id: string, status: ApplicationStatus): Promise<Application | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const appIndex = mockApplications.findIndex((app) => app.id === id)
  if (appIndex === -1) return null

  mockApplications[appIndex] = {
    ...mockApplications[appIndex],
    status,
    lastUpdated: new Date(),
  }

  return mockApplications[appIndex]
}

export const updateApplicationRating = async (id: string, rating: number): Promise<Application | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const appIndex = mockApplications.findIndex((app) => app.id === id)
  if (appIndex === -1) return null

  mockApplications[appIndex] = {
    ...mockApplications[appIndex],
    rating,
    lastUpdated: new Date(),
  }

  return mockApplications[appIndex]
}

export const addApplicationNote = async (
  applicationId: string,
  content: string,
  authorId: string,
  authorName: string,
  isPrivate = false,
): Promise<ApplicationNote> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const newNote: ApplicationNote = {
    id: Date.now().toString(),
    applicationId,
    authorId,
    authorName,
    content,
    isPrivate,
    createdAt: new Date(),
  }

  mockNotes.push(newNote)
  return newNote
}

export const getApplicationNotes = async (applicationId: string): Promise<ApplicationNote[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockNotes
    .filter((note) => note.applicationId === applicationId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export const getApplicationStats = async (): Promise<ApplicationStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const total = mockApplications.length
  const byStatus = mockApplications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    },
    {} as Record<ApplicationStatus, number>,
  )

  const ratingsSum = mockApplications.reduce((sum, app) => sum + (app.rating || 0), 0)
  const ratingsCount = mockApplications.filter((app) => app.rating).length
  const averageRating = ratingsCount > 0 ? ratingsSum / ratingsCount : 0

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const recentApplications = mockApplications.filter((app) => app.appliedAt >= oneWeekAgo).length

  return {
    total,
    byStatus,
    averageRating,
    recentApplications,
  }
}

export const bulkUpdateApplications = async (
  applicationIds: string[],
  updates: { status?: ApplicationStatus; tags?: string[] },
): Promise<Application[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const updatedApplications: Application[] = []

  for (const id of applicationIds) {
    const appIndex = mockApplications.findIndex((app) => app.id === id)
    if (appIndex !== -1) {
      mockApplications[appIndex] = {
        ...mockApplications[appIndex],
        ...updates,
        lastUpdated: new Date(),
      }
      updatedApplications.push(mockApplications[appIndex])
    }
  }

  return updatedApplications
}
