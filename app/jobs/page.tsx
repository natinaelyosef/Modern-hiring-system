"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import type { Job, JobFilters as JobFiltersType } from "@/types/job"
import { getJobs } from "@/lib/jobs"
import { JobCard } from "@/components/jobs/job-card"
import { JobFilters } from "@/components/jobs/job-filters"
import { CreateJobForm } from "@/components/jobs/create-job-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Briefcase, MapPin, Clock, DollarSign, Users } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function JobsPage() {
  const { user, isAuthenticated } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<JobFiltersType>({})
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const canCreateJobs = user?.role === "admin" || user?.role === "hr_manager" || user?.role === "employer"
  const showStatusFilter = user?.role === "admin" || user?.role === "hr_manager" || user?.role === "employer"

  useEffect(() => {
    if (isAuthenticated) {
      loadJobs()
    }
  }, [isAuthenticated, filters])

  const loadJobs = async () => {
    setIsLoading(true)
    try {
      const jobsData = await getJobs(filters)
      setJobs(jobsData)
    } catch (error) {
      console.error("Failed to load jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobCreated = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev])
    setShowCreateForm(false)
  }

  const handleViewJob = (job: Job) => {
    setSelectedJob(job)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Please sign in</h1>
          <p className="text-muted-foreground">You need to be signed in to view jobs.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Job Opportunities</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === "job_seeker"
              ? "Discover your next career opportunity"
              : "Manage your job postings and find the right candidates"}
          </p>
        </div>
        {canCreateJobs && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Post Job
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <JobFilters filters={filters} onFiltersChange={setFilters} showStatusFilter={showStatusFilter} />

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                {Object.keys(filters).length > 0
                  ? "Try adjusting your filters to see more results."
                  : "There are no job postings available at the moment."}
              </p>
              {canCreateJobs && (
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Post the First Job
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onView={handleViewJob} showActions={canCreateJobs} />
            ))}
          </div>
        )}

        {/* Create Job Dialog */}
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
            </DialogHeader>
            <CreateJobForm onSuccess={handleJobCreated} onCancel={() => setShowCreateForm(false)} />
          </DialogContent>
        </Dialog>

        {/* Job Details Dialog */}
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedJob && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-balance">{selectedJob.title}</h2>
                    <p className="text-lg text-muted-foreground">{selectedJob.company}</p>
                  </div>
                  <Badge variant={selectedJob.status === "active" ? "default" : "secondary"}>
                    {selectedJob.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDistanceToNow(selectedJob.postedAt, { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedJob.salaryMin && selectedJob.salaryMax
                        ? `$${(selectedJob.salaryMin / 1000).toFixed(0)}k - $${(selectedJob.salaryMax / 1000).toFixed(0)}k`
                        : "Salary not specified"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedJob.applicationsCount} applications</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedJob.description}</p>
                </div>

                {selectedJob.requirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.responsibilities.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedJob.benefits.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.benefits.map((benefit) => (
                        <Badge key={benefit} variant="secondary">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user?.role === "job_seeker" && selectedJob.status === "active" && (
                  <div className="pt-4 border-t">
                    <Button size="lg" className="w-full">
                      Apply for This Position
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
