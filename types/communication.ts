export type MessageType = "text" | "file" | "interview_invite" | "status_update" | "system"

export type MessageStatus = "sent" | "delivered" | "read"

export type ConversationType = "application" | "interview" | "general"

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: "admin" | "hr_manager" | "employer" | "job_seeker"
  recipientId: string
  recipientName: string
  type: MessageType
  content: string
  attachments?: MessageAttachment[]
  status: MessageStatus
  createdAt: Date
  readAt?: Date
}

export interface MessageAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
}

export interface Conversation {
  id: string
  type: ConversationType
  applicationId?: string
  interviewId?: string
  jobId?: string
  jobTitle?: string
  participants: ConversationParticipant[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ConversationParticipant {
  userId: string
  userName: string
  userRole: "admin" | "hr_manager" | "employer" | "job_seeker"
  joinedAt: Date
  lastReadAt?: Date
}

export interface NotificationSettings {
  userId: string
  emailNotifications: boolean
  pushNotifications: boolean
  messageNotifications: boolean
  interviewReminders: boolean
  statusUpdates: boolean
  weeklyDigest: boolean
}

export interface Notification {
  id: string
  userId: string
  type: "message" | "interview" | "status_update" | "system"
  title: string
  content: string
  actionUrl?: string
  isRead: boolean
  createdAt: Date
}

export interface CommunicationFilters {
  search?: string
  type?: ConversationType
  unreadOnly?: boolean
  participantId?: string
}
