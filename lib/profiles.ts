import type { CandidateProfile, ResumeAnalysis } from "@/types/profile"

// Mock profile data
const mockProfiles: CandidateProfile[] = [
  {
    id: "p1",
    userId: "c1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    summary:
      "Experienced frontend developer with 5+ years of expertise in React, TypeScript, and modern web technologies. Passionate about creating user-friendly interfaces and optimizing performance.",
    experience: [
      {
        id: "e1",
        company: "TechCorp Inc.",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        startDate: new Date("2022-01-01"),
        endDate: undefined,
        isCurrent: true,
        description:
          "Lead frontend development for multiple web applications using React and TypeScript. Collaborate with design and backend teams to deliver high-quality user experiences.",
        achievements: [
          "Improved application performance by 40% through code optimization",
          "Led migration from JavaScript to TypeScript across 5 projects",
          "Mentored 3 junior developers",
        ],
      },
      {
        id: "e2",
        company: "StartupXYZ",
        position: "Frontend Developer",
        location: "San Francisco, CA",
        startDate: new Date("2020-03-01"),
        endDate: new Date("2021-12-31"),
        isCurrent: false,
        description: "Developed responsive web applications using React and modern CSS frameworks.",
        achievements: ["Built 3 major features from scratch", "Reduced bundle size by 30%"],
      },
    ],
    education: [
      {
        id: "ed1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        location: "Berkeley, CA",
        startDate: new Date("2016-08-01"),
        endDate: new Date("2020-05-01"),
        gpa: 3.7,
        description: "Focused on software engineering and web development",
      },
    ],
    skills: [
      { id: "s1", name: "React", level: "expert", category: "Frontend", yearsOfExperience: 5 },
      { id: "s2", name: "TypeScript", level: "advanced", category: "Programming", yearsOfExperience: 4 },
      { id: "s3", name: "JavaScript", level: "expert", category: "Programming", yearsOfExperience: 6 },
      { id: "s4", name: "CSS", level: "advanced", category: "Frontend", yearsOfExperience: 5 },
      { id: "s5", name: "Node.js", level: "intermediate", category: "Backend", yearsOfExperience: 2 },
    ],
    certifications: [
      {
        id: "c1",
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        issueDate: new Date("2023-06-01"),
        expiryDate: new Date("2026-06-01"),
        credentialId: "AWS-DEV-123456",
      },
    ],
    languages: [
      { id: "l1", name: "English", proficiency: "native" },
      { id: "l2", name: "Spanish", proficiency: "conversational" },
    ],
    portfolioUrl: "https://johndoe.dev",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    githubUrl: "https://github.com/johndoe",
    resumeUrl: "/resumes/john-doe.pdf",
    isPublic: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-20"),
  },
]

export const getProfile = async (userId: string): Promise<CandidateProfile | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProfiles.find((profile) => profile.userId === userId) || null
}

export const createProfile = async (
  profileData: Omit<CandidateProfile, "id" | "createdAt" | "updatedAt">,
): Promise<CandidateProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newProfile: CandidateProfile = {
    ...profileData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockProfiles.push(newProfile)
  return newProfile
}

export const updateProfile = async (
  id: string,
  updates: Partial<CandidateProfile>,
): Promise<CandidateProfile | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const profileIndex = mockProfiles.findIndex((profile) => profile.id === id)
  if (profileIndex === -1) return null

  mockProfiles[profileIndex] = {
    ...mockProfiles[profileIndex],
    ...updates,
    updatedAt: new Date(),
  }

  return mockProfiles[profileIndex]
}

export const uploadResume = async (file: File): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // Mock file upload - in real app, this would upload to cloud storage
  return `/resumes/${file.name}`
}

export const analyzeResume = async (resumeUrl: string): Promise<ResumeAnalysis> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock resume analysis - in real app, this would use AI/ML services
  return {
    skills: ["React", "TypeScript", "JavaScript", "CSS", "Node.js", "Git", "Agile"],
    experience: 5,
    education: ["Bachelor of Science in Computer Science"],
    keywords: ["frontend", "web development", "user interface", "responsive design", "performance optimization"],
    score: 85,
    suggestions: [
      "Add more specific achievements with quantifiable results",
      "Include relevant certifications",
      "Highlight leadership experience",
      "Add portfolio links to showcase work",
    ],
  }
}

export const searchProfiles = async (query: string, skills?: string[]): Promise<CandidateProfile[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProfiles = mockProfiles.filter((profile) => profile.isPublic)

  if (query) {
    const queryLower = query.toLowerCase()
    filteredProfiles = filteredProfiles.filter(
      (profile) =>
        profile.firstName.toLowerCase().includes(queryLower) ||
        profile.lastName.toLowerCase().includes(queryLower) ||
        profile.title.toLowerCase().includes(queryLower) ||
        profile.summary.toLowerCase().includes(queryLower) ||
        profile.skills.some((skill) => skill.name.toLowerCase().includes(queryLower)),
    )
  }

  if (skills && skills.length > 0) {
    filteredProfiles = filteredProfiles.filter((profile) =>
      skills.some((skill) =>
        profile.skills.some((profileSkill) => profileSkill.name.toLowerCase().includes(skill.toLowerCase())),
      ),
    )
  }

  return filteredProfiles
}
