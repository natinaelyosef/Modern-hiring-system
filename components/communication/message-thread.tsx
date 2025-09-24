"use client"

import type React from "react"

import { useState } from "react"
import type { Message, Conversation } from "@/types/communication"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Calendar, FileText } from "lucide-react"
import { format } from "date-fns"

interface MessageThreadProps {
  conversation: Conversation
  messages: Message[]
  currentUserId: string
  currentUserName: string
  currentUserRole: "admin" | "hr_manager" | "employer" | "job_seeker"
  onSendMessage: (content: string) => void
}

const messageTypeIcons = {
  text: null,
  file: FileText,
  interview_invite: Calendar,
  status_update: null,
  system: null,
}

export function MessageThread({
  conversation,
  messages,
  currentUserId,
  currentUserName,
  currentUserRole,
  onSendMessage,
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      await onSendMessage(newMessage.trim())
      setNewMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const otherParticipant = conversation.participants.find((p) => p.userId !== currentUserId)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {otherParticipant?.userName
                .split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{otherParticipant?.userName || "Unknown User"}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {conversation.type}
              </Badge>
              {conversation.jobTitle && <span className="text-sm text-muted-foreground">{conversation.jobTitle}</span>}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId
            const TypeIcon = messageTypeIcons[message.type]

            return (
              <div key={message.id} className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {message.senderName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} max-w-[70%]`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">{message.senderName}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(message.createdAt), "MMM dd, h:mm a")}
                    </span>
                    {TypeIcon && <TypeIcon className="h-3 w-3 text-muted-foreground" />}
                  </div>

                  <div
                    className={`rounded-lg px-3 py-2 ${
                      isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-2 text-xs">
                            <FileText className="h-3 w-3" />
                            <span>{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {message.status === "read" ? "Read" : message.status === "delivered" ? "Delivered" : "Sent"}
                    </span>
                    {message.readAt && (
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(message.readAt), "h:mm a")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
              className="resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button size="icon" variant="outline" disabled title="Attach file (coming soon)">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim() || sending}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
