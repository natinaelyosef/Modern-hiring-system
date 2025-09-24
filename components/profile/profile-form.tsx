"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { CandidateProfile, WorkExperience, Education, Skill } from "@/types/profile"
import { getProfile, createProfile, updateProfile } from "@/lib/profiles"
import { useAuth } from "@/lib/auth"
import { Loader2, Plus, X } from "lucide-react"

interface ProfileFormProps {
  onSuccess?: (profile: CandidateProfile) => void
}

export function ProfileForm({ onSuccess }: ProfileFormProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [existingProfile, setExistingProfile] = useState<CandidateProfile | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    location: "",
    title: "",
    summary: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    isPublic: true,
  })

  const [experiences, setExperiences] = useState<Partial<WorkExperience>[]>([
    {
      company: "",
      position: "",
      location: "",
      startDate: undefined,
      endDate: undefined,
      isCurrent: false,
      description: "",
      achievements: [""],
    },
  ])

  const [educations, setEducations] = useState<Partial<Education>[]>([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: undefined,
      endDate: undefined,
      gpa: undefined,
      description: "",
    },
  ])

  const [skills, setSkills] = useState<Skill[]>([])
  const [newSkill, setNewSkill] = useState({ name: "", level: "intermediate" as const, category: "" })

  useEffect(() => {
    if (user) {
      loadExistingProfile()
    }
  }, [user])

  const loadExistingProfile = async () => {
    if (!user) return

    try {
      const profile = await getProfile(user.id)
      if (profile) {
        setExistingProfile(profile)
        setFormData({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone || "",
          location: profile.location,
          title: profile.title,
          summary: profile.summary,
          portfolioUrl: profile.portfolioUrl || "",
          linkedinUrl: profile.linkedinUrl || "",
          githubUrl: profile.githubUrl || "",
          isPublic: profile.isPublic,
        })
        setExperiences(profile.experience.length > 0 ? profile.experience : experiences)
        setEducations(profile.education.length > 0 ? profile.education : educations)
        setSkills(profile.skills)
      }
    } catch (error) {
      console.error("Failed to load profile:", error)
    }
  }

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        company: "",
        position: "",
        location: "",
        startDate: undefined,
        endDate: undefined,
        isCurrent: false,
        description: "",
        achievements: [""],
      },
    ])
  }

  const updateExperience = (index: number, field: string, value: any) => {
    setExperiences((prev) => prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index))
  }

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        location: "",
        startDate: undefined,
        endDate: undefined,
        gpa: undefined,
        description: "",
      },
    ])
  }

  const updateEducation = (index: number, field: string, value: any) => {
    setEducations((prev) => prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    if (newSkill.name.trim() && !skills.find((s) => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        level: newSkill.level,
        category: newSkill.category.trim() || "General",
      }
      setSkills((prev) => [...prev, skill])
      setNewSkill({ name: "", level: "intermediate", category: "" })
    }
  }

  const removeSkill = (skillId: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    try {
      const profileData = {
        ...formData,
        userId: user.id,
        experience: experiences.filter((exp) => exp.company && exp.position) as WorkExperience[],
        education: educations.filter((edu) => edu.institution && edu.degree) as Education[],
        skills,
        certifications: [],
        languages: [],
      }

      let savedProfile: CandidateProfile
      if (existingProfile) {
        savedProfile = (await updateProfile(existingProfile.id, profileData))!
      } else {
        savedProfile = await createProfile(profileData)
      }

      onSuccess?.(savedProfile)
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{existingProfile ? "Update Profile" : "Create Profile"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => updateFormData("summary", e.target.value)}
                placeholder="Brief overview of your experience, skills, and career goals..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button type="button" variant="outline" size="sm" onClick={addExperience}>
                <Plus className="h-4 w-4 mr-1" />
                Add Experience
              </Button>
            </div>
            {experiences.map((exp, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    {experiences.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company || ""}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        value={exp.position || ""}
                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                        placeholder="Job title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={exp.location || ""}
                        onChange={(e) => updateExperience(index, "location", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={exp.startDate ? exp.startDate.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                          updateExperience(index, "startDate", e.target.value ? new Date(e.target.value) : undefined)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${index}`}
                      checked={exp.isCurrent || false}
                      onCheckedChange={(checked) => updateExperience(index, "isCurrent", checked)}
                    />
                    <Label htmlFor={`current-${index}`}>I currently work here</Label>
                  </div>
                  {!exp.isCurrent && (
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={exp.endDate ? exp.endDate.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                          updateExperience(index, "endDate", e.target.value ? new Date(e.target.value) : undefined)
                        }
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description || ""}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      placeholder="Describe your role and responsibilities..."
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </div>
            {educations.map((edu, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    {educations.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution || ""}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        placeholder="University/School name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree || ""}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                        placeholder="e.g. Bachelor of Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.fieldOfStudy || ""}
                        onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                        placeholder="e.g. Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={edu.location || ""}
                        onChange={(e) => updateEducation(index, "location", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={edu.startDate ? edu.startDate.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                          updateEducation(index, "startDate", e.target.value ? new Date(e.target.value) : undefined)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={edu.endDate ? edu.endDate.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                          updateEducation(index, "endDate", e.target.value ? new Date(e.target.value) : undefined)
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. React"
                />
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <Select
                  value={newSkill.level}
                  onValueChange={(value) => setNewSkill((prev) => ({ ...prev, level: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={newSkill.category}
                  onChange={(e) => setNewSkill((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g. Frontend"
                />
              </div>
            </div>
            <Button type="button" variant="outline" onClick={addSkill} disabled={!newSkill.name.trim()}>
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </Button>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeSkill(skill.id)}
                >
                  {skill.name} ({skill.level}) <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                  id="portfolioUrl"
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => updateFormData("portfolioUrl", e.target.value)}
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => updateFormData("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => updateFormData("githubUrl", e.target.value)}
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Privacy Settings</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => updateFormData("isPublic", checked)}
              />
              <Label htmlFor="isPublic">Make my profile visible to employers</Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {existingProfile ? "Updating..." : "Creating..."}
                </>
              ) : existingProfile ? (
                "Update Profile"
              ) : (
                "Create Profile"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
