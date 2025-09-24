"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import type { CandidateProfile } from "@/types/profile"
import { getProfile } from "@/lib/profiles"
import { ProfileForm } from "@/components/profile/profile-form"
import { ProfileView } from "@/components/profile/profile-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Edit } from "lucide-react"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const [profile, setProfile] = useState<CandidateProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfile()
    }
  }, [isAuthenticated, user])

  const loadProfile = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const profileData = await getProfile(user.id)
      setProfile(profileData)
      if (!profileData) {
        setIsEditing(true) // Show form if no profile exists
      }
    } catch (error) {
      console.error("Failed to load profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileSaved = (savedProfile: CandidateProfile) => {
    setProfile(savedProfile)
    setIsEditing(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Please sign in</h1>
          <p className="text-muted-foreground">You need to be signed in to view your profile.</p>
        </div>
      </div>
    )
  }

  if (user?.role !== "job_seeker") {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Profile Not Available</h3>
          <p className="text-muted-foreground">
            Candidate profiles are only available for job seekers. Your role is {user?.role}.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">My Profile</h1>
          <p className="text-muted-foreground mt-1">
            {profile ? "Manage your professional profile" : "Create your professional profile"}
          </p>
        </div>
        {profile && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : isEditing ? (
        <ProfileForm onSuccess={handleProfileSaved} />
      ) : profile ? (
        <ProfileView profile={profile} showActions onEdit={() => setIsEditing(true)} />
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Profile Found</h3>
            <p className="text-muted-foreground mb-4">Create your professional profile to get started.</p>
            <Button onClick={() => setIsEditing(true)}>
              <User className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
