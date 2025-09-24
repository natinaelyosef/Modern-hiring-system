import type {
  Interview,
  InterviewFeedback,
  InterviewSlot,
  InterviewFilters,
  InterviewStats,
  InterviewType,
  InterviewStatus,
} from "@/types/interview"

// Mock data for interviews
const mockInterviews: Interview[] = [
  {
    id: "1",
    applicationId: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Frontend Developer",
    candidateId: "candidate-1",
    candidateName: "Alice Johnson",
    candidateEmail: "alice.johnson@email.com",
    interviewerId: "interviewer-1",
    interviewerName: "John Smith",
    interviewerEmail: "john.smith@company.com",
    type: "technical_interview",
    status: "scheduled",
    scheduledAt: new Date("2024-01-15T10:00:00"),
    duration: 60,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    notes: "Focus on React and TypeScript experience",
    createdAt: new Date("2024-01-10T09:00:00"),
    updatedAt: new Date("2024-01-10T09:00:00"),
  },
  {
    id: "2",
    applicationId: "app-2",
    jobId: "job-2",
    jobTitle: "Product Manager",
    candidateId: "candidate-2",
    candidateName: "Bob Wilson",
    candidateEmail: "bob.wilson@email.com",
    interviewerId: "interviewer-2",
    interviewerName: "Sarah Davis",
    interviewerEmail: "sarah.davis@company.com",
    type: "behavioral_interview",
    status: "completed",
    scheduledAt: new Date("2024-01-12T14:00:00"),
    duration: 45,
    location: "Conference Room A",
    feedback: {
      id: "feedback-1",
      interviewId: "2",
      overallRating: 4,
      technicalSkills: 4,
      communication: 5,
      culturalFit: 4,
      experience: 4,
      strengths: ["Strong communication", "Leadership experience", "Strategic thinking"],
      weaknesses: ["Limited technical background"],
      comments: "Excellent candidate with strong leadership skills and clear communication.",
      recommendation: "hire",
      createdAt: new Date("2024-01-12T15:00:00"),
    },
    createdAt: new Date("2024-01-08T11:00:00"),
    updatedAt: new Date("2024-01-12T15:00:00"),
  },
]

const mockInterviewSlots: InterviewSlot[] = [
  {
    id: "slot-1",
    interviewerId: "interviewer-1",
    date: new Date("2024-01-16"),
    startTime: "09:00",
    endTime: "10:00",
    isAvailable: true,
    duration: 60,
  },
  {
    id: "slot-2",
    interviewerId: "interviewer-1",
    date: new Date("2024-01-16"),
    startTime: "14:00",
    endTime: "15:00",
    isAvailable: true,
    duration: 60,
  },
]

export async function getInterviews(filters?: InterviewFilters): Promise<Interview[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filtered = [...mockInterviews]

  if (filters?.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (interview) =>
        interview.candidateName.toLowerCase().includes(search) ||
        interview.jobTitle.toLowerCase().includes(search) ||
        interview.interviewerName.toLowerCase().includes(search),
    )
  }

  if (filters?.status) {
    filtered = filtered.filter((interview) => interview.status === filters.status)
  }

  if (filters?.type) {
    filtered = filtered.filter((interview) => interview.type === filters.type)
  }

  if (filters?.interviewerId) {
    filtered = filtered.filter((interview) => interview.interviewerId === filters.interviewerId)
  }

  if (filters?.jobId) {
    filtered = filtered.filter((interview) => interview.jobId === filters.jobId)
  }

  return filtered.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
}

export async function getInterview(id: string): Promise<Interview | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockInterviews.find((interview) => interview.id === id) || null
}

export async function createInterview(
  interview: Omit<Interview, "id" | "createdAt" | "updatedAt">,
): Promise<Interview> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newInterview: Interview = {
    ...interview,
    id: `interview-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockInterviews.push(newInterview)
  return newInterview
}

export async function updateInterview(id: string, updates: Partial<Interview>): Promise<Interview> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const index = mockInterviews.findIndex((interview) => interview.id === id)
  if (index === -1) throw new Error("Interview not found")

  mockInterviews[index] = {
    ...mockInterviews[index],
    ...updates,
    updatedAt: new Date(),
  }

  return mockInterviews[index]
}

export async function deleteInterview(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const index = mockInterviews.findIndex((interview) => interview.id === id)
  if (index === -1) throw new Error("Interview not found")

  mockInterviews.splice(index, 1)
}

export async function getInterviewStats(): Promise<InterviewStats> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const interviews = mockInterviews
  const now = new Date()
  const upcomingInterviews = interviews.filter(
    (interview) => new Date(interview.scheduledAt) > now && interview.status === "scheduled",
  ).length

  const completedInterviews = interviews.filter((interview) => interview.feedback)
  const averageRating =
    completedInterviews.length > 0
      ? completedInterviews.reduce((sum, interview) => sum + (interview.feedback?.overallRating || 0), 0) /
        completedInterviews.length
      : 0

  return {
    total: interviews.length,
    byStatus: interviews.reduce(
      (acc, interview) => {
        acc[interview.status] = (acc[interview.status] || 0) + 1
        return acc
      },
      {} as Record<InterviewStatus, number>,
    ),
    byType: interviews.reduce(
      (acc, interview) => {
        acc[interview.type] = (acc[interview.type] || 0) + 1
        return acc
      },
      {} as Record<InterviewType, number>,
    ),
    averageRating,
    upcomingInterviews,
  }
}

export async function getAvailableSlots(interviewerId: string, date: Date): Promise<InterviewSlot[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockInterviewSlots.filter(
    (slot) =>
      slot.interviewerId === interviewerId && slot.date.toDateString() === date.toDateString() && slot.isAvailable,
  )
}

export async function submitInterviewFeedback(
  interviewId: string,
  feedback: Omit<InterviewFeedback, "id" | "interviewId" | "createdAt">,
): Promise<InterviewFeedback> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newFeedback: InterviewFeedback = {
    ...feedback,
    id: `feedback-${Date.now()}`,
    interviewId,
    createdAt: new Date(),
  }

  // Update the interview with feedback
  const interviewIndex = mockInterviews.findIndex((interview) => interview.id === interviewId)
  if (interviewIndex !== -1) {
    mockInterviews[interviewIndex].feedback = newFeedback
    mockInterviews[interviewIndex].status = "completed"
    mockInterviews[interviewIndex].updatedAt = new Date()
  }

  return newFeedback
}
