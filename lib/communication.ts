import type {
  Message,
  Conversation,
  Notification,
  NotificationSettings,
  CommunicationFilters,
  MessageType,
  ConversationType,
} from "@/types/communication"

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    type: "application",
    applicationId: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Frontend Developer",
    participants: [
      {
        userId: "recruiter-1",
        userName: "Sarah Johnson",
        userRole: "hr_manager",
        joinedAt: new Date("2024-01-10T09:00:00"),
      },
      {
        userId: "candidate-1",
        userName: "Alice Johnson",
        userRole: "job_seeker",
        joinedAt: new Date("2024-01-10T09:00:00"),
      },
    ],
    unreadCount: 2,
    createdAt: new Date("2024-01-10T09:00:00"),
    updatedAt: new Date("2024-01-15T14:30:00"),
  },
  {
    id: "conv-2",
    type: "interview",
    interviewId: "interview-1",
    jobId: "job-2",
    jobTitle: "Product Manager",
    participants: [
      {
        userId: "recruiter-2",
        userName: "Mike Davis",
        userRole: "hr_manager",
        joinedAt: new Date("2024-01-12T10:00:00"),
      },
      {
        userId: "candidate-2",
        userName: "Bob Wilson",
        userRole: "job_seeker",
        joinedAt: new Date("2024-01-12T10:00:00"),
      },
    ],
    unreadCount: 0,
    createdAt: new Date("2024-01-12T10:00:00"),
    updatedAt: new Date("2024-01-14T16:45:00"),
  },
]

const mockMessages: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "recruiter-1",
    senderName: "Sarah Johnson",
    senderRole: "hr_manager",
    recipientId: "candidate-1",
    recipientName: "Alice Johnson",
    type: "text",
    content:
      "Hi Alice, thank you for your application for the Senior Frontend Developer position. I'd like to schedule a phone screening with you.",
    status: "read",
    createdAt: new Date("2024-01-10T09:15:00"),
    readAt: new Date("2024-01-10T10:30:00"),
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "candidate-1",
    senderName: "Alice Johnson",
    senderRole: "job_seeker",
    recipientId: "recruiter-1",
    recipientName: "Sarah Johnson",
    type: "text",
    content:
      "Hi Sarah, thank you for reaching out! I'm very interested in the position. I'm available for a phone screening this week. What times work best for you?",
    status: "read",
    createdAt: new Date("2024-01-10T11:00:00"),
    readAt: new Date("2024-01-10T11:15:00"),
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "recruiter-1",
    senderName: "Sarah Johnson",
    senderRole: "hr_manager",
    recipientId: "candidate-1",
    recipientName: "Alice Johnson",
    type: "interview_invite",
    content: "Great! I've scheduled a phone screening for tomorrow at 2 PM. Please find the details below.",
    status: "delivered",
    createdAt: new Date("2024-01-15T14:30:00"),
  },
]

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "candidate-1",
    type: "message",
    title: "New message from Sarah Johnson",
    content: "You have a new message regarding your application for Senior Frontend Developer",
    actionUrl: "/messages/conv-1",
    isRead: false,
    createdAt: new Date("2024-01-15T14:30:00"),
  },
  {
    id: "notif-2",
    userId: "candidate-1",
    type: "interview",
    title: "Interview scheduled",
    content: "Your phone screening for Senior Frontend Developer has been scheduled for tomorrow at 2 PM",
    actionUrl: "/interviews",
    isRead: false,
    createdAt: new Date("2024-01-15T14:35:00"),
  },
]

export async function getConversations(filters?: CommunicationFilters): Promise<Conversation[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filtered = [...mockConversations]

  if (filters?.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (conv) =>
        conv.jobTitle?.toLowerCase().includes(search) ||
        conv.participants.some((p) => p.userName.toLowerCase().includes(search)),
    )
  }

  if (filters?.type) {
    filtered = filtered.filter((conv) => conv.type === filters.type)
  }

  if (filters?.unreadOnly) {
    filtered = filtered.filter((conv) => conv.unreadCount > 0)
  }

  if (filters?.participantId) {
    filtered = filtered.filter((conv) => conv.participants.some((p) => p.userId === filters.participantId))
  }

  return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export async function getConversation(id: string): Promise<Conversation | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockConversations.find((conv) => conv.id === id) || null
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const messages = mockMessages.filter((msg) => msg.conversationId === conversationId)
  return messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  senderName: string,
  senderRole: "admin" | "hr_manager" | "employer" | "job_seeker",
  recipientId: string,
  recipientName: string,
  content: string,
  type: MessageType = "text",
): Promise<Message> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderId,
    senderName,
    senderRole,
    recipientId,
    recipientName,
    type,
    content,
    status: "sent",
    createdAt: new Date(),
  }

  mockMessages.push(newMessage)

  // Update conversation
  const convIndex = mockConversations.findIndex((conv) => conv.id === conversationId)
  if (convIndex !== -1) {
    mockConversations[convIndex].lastMessage = newMessage
    mockConversations[convIndex].updatedAt = new Date()
    mockConversations[convIndex].unreadCount += 1
  }

  return newMessage
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const messageIndex = mockMessages.findIndex((msg) => msg.id === messageId)
  if (messageIndex !== -1) {
    mockMessages[messageIndex].status = "read"
    mockMessages[messageIndex].readAt = new Date()
  }
}

export async function createConversation(
  type: ConversationType,
  participants: Array<{
    userId: string
    userName: string
    userRole: "admin" | "hr_manager" | "employer" | "job_seeker"
  }>,
  applicationId?: string,
  interviewId?: string,
  jobId?: string,
  jobTitle?: string,
): Promise<Conversation> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newConversation: Conversation = {
    id: `conv-${Date.now()}`,
    type,
    applicationId,
    interviewId,
    jobId,
    jobTitle,
    participants: participants.map((p) => ({
      ...p,
      joinedAt: new Date(),
    })),
    unreadCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockConversations.push(newConversation)
  return newConversation
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockNotifications
    .filter((notif) => notif.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const notifIndex = mockNotifications.findIndex((notif) => notif.id === notificationId)
  if (notifIndex !== -1) {
    mockNotifications[notifIndex].isRead = true
  }
}

export async function getNotificationSettings(userId: string): Promise<NotificationSettings> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  return {
    userId,
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    interviewReminders: true,
    statusUpdates: true,
    weeklyDigest: false,
  }
}

export async function updateNotificationSettings(
  userId: string,
  settings: Partial<NotificationSettings>,
): Promise<NotificationSettings> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const currentSettings = await getNotificationSettings(userId)
  return { ...currentSettings, ...settings }
}
