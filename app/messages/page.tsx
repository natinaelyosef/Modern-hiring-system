"use client"

import { useState, useEffect } from "react"
import type { Conversation, Message, CommunicationFilters } from "@/types/communication"
import { getConversations, getMessages, sendMessage } from "@/lib/communication"
import { ConversationList } from "@/components/communication/conversation-list"
import { MessageThread } from "@/components/communication/message-thread"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, Filter, Plus } from "lucide-react"

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [filters, setFilters] = useState<CommunicationFilters>({})

  // Mock current user - in a real app, this would come from auth context
  const currentUser = {
    id: "recruiter-1",
    name: "Sarah Johnson",
    role: "hr_manager" as const,
  }

  useEffect(() => {
    loadConversations()
  }, [filters])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  const loadConversations = async () => {
    try {
      setLoading(true)
      const data = await getConversations(filters)
      setConversations(data)

      // Auto-select first conversation if none selected
      if (!selectedConversation && data.length > 0) {
        setSelectedConversation(data[0])
      }
    } catch (error) {
      console.error("Failed to load conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      setMessagesLoading(true)
      const data = await getMessages(conversationId)
      setMessages(data)
    } catch (error) {
      console.error("Failed to load messages:", error)
    } finally {
      setMessagesLoading(false)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation) return

    const otherParticipant = selectedConversation.participants.find((p) => p.userId !== currentUser.id)
    if (!otherParticipant) return

    try {
      const newMessage = await sendMessage(
        selectedConversation.id,
        currentUser.id,
        currentUser.name,
        currentUser.role,
        otherParticipant.userId,
        otherParticipant.userName,
        content,
      )

      setMessages((prev) => [...prev, newMessage])

      // Update conversation in list
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id ? { ...conv, lastMessage: newMessage, updatedAt: new Date() } : conv,
        ),
      )
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleFilterChange = (key: keyof CommunicationFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="container mx-auto p-6 h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8" />
            Messages
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Communicate with candidates and team members</p>
        </div>

        <Button disabled>
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={filters.search || ""}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={filters.type || "all"}
                onValueChange={(value) => handleFilterChange("type", value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="application">Applications</SelectItem>
                  <SelectItem value="interview">Interviews</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={filters.unreadOnly ? "default" : "outline"}
                  onClick={() => handleFilterChange("unreadOnly", !filters.unreadOnly)}
                >
                  Unread Only
                </Button>

                {Object.keys(filters).length > 0 && (
                  <Button size="sm" variant="ghost" onClick={clearFilters}>
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Conversations List */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Conversations ({conversations.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-full" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-muted rounded w-3/4" />
                          <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ConversationList
                  conversations={conversations}
                  selectedConversationId={selectedConversation?.id}
                  onSelectConversation={setSelectedConversation}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            {selectedConversation ? (
              messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading messages...</p>
                  </div>
                </div>
              ) : (
                <MessageThread
                  conversation={selectedConversation}
                  messages={messages}
                  currentUserId={currentUser.id}
                  currentUserName={currentUser.name}
                  currentUserRole={currentUser.role}
                  onSendMessage={handleSendMessage}
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
