"use client"

import type { Conversation } from "@/types/communication"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Clock, Users } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversationId?: string
  onSelectConversation: (conversation: Conversation) => void
}

const typeColors = {
  application: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  interview: "bg-green-500/10 text-green-500 border-green-500/20",
  general: "bg-gray-500/10 text-gray-500 border-gray-500/20",
}

const typeIcons = {
  application: MessageSquare,
  interview: Clock,
  general: Users,
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No conversations found</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const TypeIcon = typeIcons[conversation.type]
        const otherParticipant = conversation.participants.find((p) => p.userRole !== "hr_manager")
        const isSelected = conversation.id === selectedConversationId

        return (
          <Card
            key={conversation.id}
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${isSelected ? "ring-2 ring-primary" : ""}`}
            onClick={() => onSelectConversation(conversation)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs">
                    {otherParticipant?.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm truncate">{otherParticipant?.userName || "Unknown User"}</h3>
                      <TypeIcon className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      {conversation.unreadCount > 0 && (
                        <Badge variant="default" className="text-xs px-1.5 py-0.5">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`text-xs ${typeColors[conversation.type]}`}>
                      {conversation.type}
                    </Badge>
                    {conversation.jobTitle && (
                      <span className="text-xs text-muted-foreground truncate">{conversation.jobTitle}</span>
                    )}
                  </div>

                  {conversation.lastMessage && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      <span className="font-medium">{conversation.lastMessage.senderName}:</span>{" "}
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
