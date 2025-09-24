export type UserRole = "admin" | "hr_manager" | "employer" | "job_seeker"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  company?: string
  department?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
