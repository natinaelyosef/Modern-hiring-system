"use client"

import type { CandidateProfile } from "@/types/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Mail, Phone, ExternalLink, Calendar, GraduationCap, Briefcase } from "lucide-react"

interface ProfileViewProps {
  profile: CandidateProfile
  showActions?: boolean
  onEdit?: () => void
  onContact?: () => void
}

export function ProfileView({ profile, showActions = false, onEdit, onContact }: ProfileViewProps) {
  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "default"
      case "advanced":
        return "default"
      case "intermediate":
        return "secondary"
      case "beginner":
        return "outline"
      default:
        return "secondary"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-balance">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-xl text-muted-foreground">{profile.title}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              {showActions && (
                <div className="flex gap-2">
                  <Button onClick={onEdit}>Edit Profile</Button>
                  <Button variant="outline" onClick={onContact}>
                    Contact
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{profile.summary}</p>
        </CardContent>
      </Card>

      {/* Skills */}
      {profile.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                profile.skills.reduce(
                  (acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  },
                  {} as Record<string, typeof profile.skills>,
                ),
              ).map(([category, categorySkills]) => (
                <div key={category}>
                  <h4 className="font-medium mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge key={skill.id} variant={getSkillLevelColor(skill.level)}>
                        {skill.name} ({skill.level})
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-muted pl-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDate(exp.startDate)} -{" "}
                          {exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <div>
                      <h5 className="font-medium text-sm mb-1">Key Achievements:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-muted pl-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.location}</p>
                      {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {edu.description && <p className="text-sm text-muted-foreground">{edu.description}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Links */}
      {(profile.portfolioUrl || profile.linkedinUrl || profile.githubUrl) && (
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.portfolioUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer">
                    Portfolio <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              )}
              {profile.linkedinUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    LinkedIn <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              )}
              {profile.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
