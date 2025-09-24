"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Job, WorkLocation, JobType, ExperienceLevel, JobStatus } from "@/types/job"
import { createJob } from "@/lib/jobs"
import { useAuth } from "@/lib/auth"
import { Loader2, Plus, X } from "lucide-react"

interface CreateJobFormProps {
  onSuccess?: (job: Job) => void
  onCancel?: () => void
}

export function CreateJobForm({ onSuccess, onCancel }: CreateJobFormProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: user?.company || "",
    department: "",
    location: "",
    workLocation: "hybrid" as WorkLocation,
    jobType: "full-time" as JobType,
    experienceLevel: "mid" as ExperienceLevel,
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    status: "draft" as JobStatus,
  })

  const [requirements, setRequirements] = useState<string[]>([""])
  const [responsibilities, setResponsibilities] = useState<string[]>([""])
  const [skills, setSkills] = useState<string[]>([])
  const [benefits, setBenefits] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [newBenefit, setNewBenefit] = useState("")

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const addRequirement = () => {
    setRequirements((prev) => [...prev, ""])
  }

  const updateRequirement = (index: number, value: string) => {
    setRequirements((prev) => prev.map((req, i) => (i === index ? value : req)))
  }

  const removeRequirement = (index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index))
  }

  const addResponsibility = () => {
    setResponsibilities((prev) => [...prev, ""])
  }

  const updateResponsibility = (index: number, value: string) => {
    setResponsibilities((prev) => prev.map((resp, i) => (i === index ? value : resp)))
  }

  const removeResponsibility = (index: number) => {
    setResponsibilities((prev) => prev.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits((prev) => [...prev, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const removeBenefit = (benefit: string) => {
    setBenefits((prev) => prev.filter((b) => b !== benefit))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    try {
      const jobData = {
        ...formData,
        requirements: requirements.filter((req) => req.trim()),
        responsibilities: responsibilities.filter((resp) => resp.trim()),
        skills,
        benefits,
        salaryMin: formData.salaryMin ? Number.parseInt(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? Number.parseInt(formData.salaryMax) : undefined,
        postedBy: user.id,
        postedAt: new Date(),
      }

      const newJob = await createJob(jobData)
      onSuccess?.(newJob)
    } catch (error) {
      console.error("Failed to create job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Job Posting</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData("company", e.target.value)}
                placeholder="Company name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder="Describe the role, what the candidate will do, and what makes this opportunity exciting..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label>Requirements</Label>
              {requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="e.g. 3+ years of React experience"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => removeRequirement(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRequirement}
                className="mt-2 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Requirement
              </Button>
            </div>

            <div>
              <Label>Responsibilities</Label>
              {responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={resp}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    placeholder="e.g. Develop and maintain web applications"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => removeResponsibility(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addResponsibility}
                className="mt-2 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Responsibility
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="e.g. San Francisco, CA"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Work Location</Label>
              <Select value={formData.workLocation} onValueChange={(value) => updateFormData("workLocation", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="on-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select value={formData.jobType} onValueChange={(value) => updateFormData("jobType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => updateFormData("experienceLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Min Salary (USD)</Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => updateFormData("salaryMin", e.target.value)}
                placeholder="50000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Max Salary (USD)</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => updateFormData("salaryMax", e.target.value)}
                placeholder="80000"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Skills</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                    {skill} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Benefits</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add a benefit"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                />
                <Button type="button" variant="outline" onClick={addBenefit}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {benefits.map((benefit) => (
                  <Badge
                    key={benefit}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeBenefit(benefit)}
                  >
                    {benefit} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => updateFormData("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Job"
              )}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
