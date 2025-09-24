import type { Job, JobFilters } from "@/types/job"

// Mock job data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features and ensuring excellent user experience.",
    requirements: [
      "5+ years of React experience",
      "Strong TypeScript skills",
      "Experience with modern build tools",
      "Knowledge of responsive design",
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with design and backend teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
    ],
    company: "TechCorp Inc.",
    department: "Engineering",
    location: "San Francisco, CA",
    workLocation: "hybrid",
    jobType: "full-time",
    experienceLevel: "senior",
    salaryMin: 120000,
    salaryMax: 160000,
    currency: "USD",
    skills: ["React", "TypeScript", "CSS", "JavaScript", "Git"],
    benefits: ["Health Insurance", "401k", "Remote Work", "Flexible Hours"],
    status: "active",
    postedBy: "1",
    postedAt: new Date("2024-01-15"),
    expiresAt: new Date("2024-03-15"),
    applicationsCount: 24,
    viewsCount: 156,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Product Manager",
    description:
      "Join our product team to drive the development of innovative solutions. You will work closely with engineering, design, and business stakeholders.",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical skills",
      "Experience with agile methodologies",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Define product roadmap and strategy",
      "Work with cross-functional teams",
      "Analyze user feedback and metrics",
      "Manage product backlog",
    ],
    company: "StartupXYZ",
    department: "Product",
    location: "New York, NY",
    workLocation: "remote",
    jobType: "full-time",
    experienceLevel: "mid",
    salaryMin: 100000,
    salaryMax: 130000,
    currency: "USD",
    skills: ["Product Strategy", "Analytics", "Agile", "User Research"],
    benefits: ["Health Insurance", "Stock Options", "Remote Work"],
    status: "active",
    postedBy: "2",
    postedAt: new Date("2024-01-20"),
    applicationsCount: 18,
    viewsCount: 89,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    title: "UX Designer",
    description:
      "We are seeking a creative UX Designer to help us create intuitive and engaging user experiences for our digital products.",
    requirements: [
      "2+ years of UX design experience",
      "Proficiency in Figma or Sketch",
      "Understanding of user-centered design",
      "Portfolio of design work",
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research",
      "Collaborate with product and engineering",
      "Design user interfaces",
    ],
    company: "DesignStudio",
    department: "Design",
    location: "Austin, TX",
    workLocation: "on-site",
    jobType: "full-time",
    experienceLevel: "mid",
    salaryMin: 75000,
    salaryMax: 95000,
    currency: "USD",
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    benefits: ["Health Insurance", "Creative Environment", "Learning Budget"],
    status: "draft",
    postedBy: "1",
    postedAt: new Date("2024-01-25"),
    applicationsCount: 0,
    viewsCount: 12,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
]

export const getJobs = async (filters?: JobFilters): Promise<Job[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredJobs = [...mockJobs]

  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower),
      )
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    if (filters.workLocation) {
      filteredJobs = filteredJobs.filter((job) => job.workLocation === filters.workLocation)
    }

    if (filters.jobType) {
      filteredJobs = filteredJobs.filter((job) => job.jobType === filters.jobType)
    }

    if (filters.experienceLevel) {
      filteredJobs = filteredJobs.filter((job) => job.experienceLevel === filters.experienceLevel)
    }

    if (filters.status) {
      filteredJobs = filteredJobs.filter((job) => job.status === filters.status)
    }

    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.skills!.some((skill) =>
          job.skills.some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase())),
        ),
      )
    }
  }

  return filteredJobs.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
}

export const getJobById = async (id: string): Promise<Job | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockJobs.find((job) => job.id === id) || null
}

export const createJob = async (
  jobData: Omit<Job, "id" | "createdAt" | "updatedAt" | "applicationsCount" | "viewsCount">,
): Promise<Job> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newJob: Job = {
    ...jobData,
    id: Date.now().toString(),
    applicationsCount: 0,
    viewsCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockJobs.unshift(newJob)
  return newJob
}

export const updateJob = async (id: string, updates: Partial<Job>): Promise<Job | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const jobIndex = mockJobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return null

  mockJobs[jobIndex] = {
    ...mockJobs[jobIndex],
    ...updates,
    updatedAt: new Date(),
  }

  return mockJobs[jobIndex]
}

export const deleteJob = async (id: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const jobIndex = mockJobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return false

  mockJobs.splice(jobIndex, 1)
  return true
}
