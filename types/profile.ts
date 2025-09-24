export interface CandidateProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location: string
  title: string
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  certifications: Certification[]
  languages: Language[]
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  resumeUrl?: string
  profilePictureUrl?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: Date
  endDate?: Date
  isCurrent: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  location: string
  startDate: Date
  endDate?: Date
  gpa?: number
  description?: string
}

export interface Skill {
  id: string
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  category: string
  yearsOfExperience?: number
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  credentialId?: string
  credentialUrl?: string
}

export interface Language {
  id: string
  name: string
  proficiency: "basic" | "conversational" | "fluent" | "native"
}

export interface ResumeAnalysis {
  skills: string[]
  experience: number
  education: string[]
  keywords: string[]
  score: number
  suggestions: string[]
}
