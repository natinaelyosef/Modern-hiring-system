"use client"

import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Users,
  FileText,
  Calendar,
  BarChart3,
  User,
  MessageSquare,
  Navigation,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  UserCheck,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Plus,
  Filter,
  Search,
  Eye,
  Send,
} from "lucide-react"
import Link from "next/link"

export default function ShowcasePage() {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Please sign in</h1>
          <p className="text-muted-foreground">You need to be signed in to view the showcase.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">Modern Hiring System Showcase</h1>
        <p className="text-muted-foreground">Complete overview of all features and pages in the recruitment platform</p>
      </div>

      {/* System Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">System Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+25% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dashboard Views */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dashboard Views</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>Complete system oversight and management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">24</div>
                  <div className="text-xs text-muted-foreground">Active Jobs</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">156</div>
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge>System Admin</Badge>
                <Badge variant="outline">Full Access</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Job Seeker Dashboard
              </CardTitle>
              <CardDescription>Personalized job search and application tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Frontend Developer at TechCorp</span>
                  <Badge>Under Review</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">UX Designer at StartupXYZ</span>
                  <Badge variant="secondary">Applied</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">95% Profile Complete</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Job Management System</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Listings & Management</CardTitle>
                  <CardDescription>Advanced job posting, filtering, and management capabilities</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">Senior React Developer</CardTitle>
                          <CardDescription>TechCorp Inc.</CardDescription>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span>$120k - $160k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>2 days ago</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>24 applications</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">Node.js</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">Product Manager</CardTitle>
                          <CardDescription>InnovateLab</CardDescription>
                        </div>
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>Remote</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span>$90k - $130k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>Draft</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>0 applications</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Strategy</Badge>
                        <Badge variant="outline">Analytics</Badge>
                        <Badge variant="outline">Leadership</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applicant Tracking System */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Applicant Tracking System</h2>
        <Card>
          <CardHeader>
            <CardTitle>Application Management & Candidate Evaluation</CardTitle>
            <CardDescription>Comprehensive ATS with status tracking, notes, and bulk operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm">
                  All Applications
                </Button>
                <Button variant="outline" size="sm">
                  New
                </Button>
                <Button variant="outline" size="sm">
                  Under Review
                </Button>
                <Button variant="outline" size="sm">
                  Interview
                </Button>
                <Button variant="outline" size="sm">
                  Hired
                </Button>
              </div>

              <div className="space-y-3">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">Sarah Johnson</h4>
                        <p className="text-sm text-muted-foreground">Applied for Senior React Developer</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>New</Badge>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Experience:</span>
                        <div>5+ years</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <div>San Francisco, CA</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applied:</span>
                        <div>2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">Michael Chen</h4>
                        <p className="text-sm text-muted-foreground">Applied for Product Manager</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Interview Scheduled</Badge>
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Experience:</span>
                        <div>8+ years</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <div>Remote</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applied:</span>
                        <div>3 days ago</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Interview: Tomorrow 2PM
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resume & Profile Management</h2>
        <Card>
          <CardHeader>
            <CardTitle>Candidate Profile System</CardTitle>
            <CardDescription>Comprehensive profile management with skills, experience, and portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alex Rodriguez</h3>
                    <p className="text-muted-foreground">Senior Full Stack Developer</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">Available</Badge>
                      <Badge variant="outline">Remote</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>alex.rodriguez@email.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>alexrodriguez.dev</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Professional Links</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </Button>
                      <Button variant="outline" size="sm">
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>JavaScript</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>React</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>Python</Badge>
                    <Badge>PostgreSQL</Badge>
                    <Badge>AWS</Badge>
                    <Badge>Docker</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Experience</h4>
                  <div className="space-y-3">
                    <div className="border-l-2 border-primary pl-4">
                      <h5 className="font-medium">Senior Developer</h5>
                      <p className="text-sm text-muted-foreground">TechCorp Inc. • 2021 - Present</p>
                      <p className="text-sm mt-1">Led development of microservices architecture serving 1M+ users</p>
                    </div>
                    <div className="border-l-2 border-muted pl-4">
                      <h5 className="font-medium">Full Stack Developer</h5>
                      <p className="text-sm text-muted-foreground">StartupXYZ • 2019 - 2021</p>
                      <p className="text-sm mt-1">Built and maintained React/Node.js applications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview Scheduling */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Interview Scheduling System</h2>
        <Card>
          <CardHeader>
            <CardTitle>Interview Management & Calendar Integration</CardTitle>
            <CardDescription>
              Comprehensive interview scheduling with multiple formats and automated reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Upcoming Interviews</h4>
                <div className="space-y-3">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-medium">Sarah Johnson</h5>
                          <p className="text-sm text-muted-foreground">Senior React Developer - Technical Interview</p>
                        </div>
                        <Badge>Today</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>2:00 PM - 3:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>Video Call</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Join Call
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-medium">Michael Chen</h5>
                          <p className="text-sm text-muted-foreground">Product Manager - Final Interview</p>
                        </div>
                        <Badge variant="secondary">Tomorrow</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>10:00 AM - 11:00 AM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>Office - Room 301</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Send Reminder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Schedule New Interview</h4>
                <Card>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Candidate</label>
                        <div className="mt-1 p-2 border rounded text-sm">Emma Wilson - UX Designer</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Interview Type</label>
                        <div className="mt-1 p-2 border rounded text-sm">Technical Assessment</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Date</label>
                          <div className="mt-1 p-2 border rounded text-sm">Dec 15, 2024</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Time</label>
                          <div className="mt-1 p-2 border rounded text-sm">3:00 PM</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Format</label>
                        <div className="mt-1 p-2 border rounded text-sm">Video Call (Zoom)</div>
                      </div>
                      <Button className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Interview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Analytics & Reporting Dashboard</h2>
        <Card>
          <CardHeader>
            <CardTitle>Recruitment Analytics & Performance Metrics</CardTitle>
            <CardDescription>
              Comprehensive analytics with hiring funnel, time-to-hire, and performance tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Time to Hire</p>
                        <p className="text-2xl font-bold">18 days</p>
                      </div>
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">-3 days from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Hire Rate</p>
                        <p className="text-2xl font-bold">23%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">+5% improvement</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Cost per Hire</p>
                        <p className="text-2xl font-bold">$3,200</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-red-600 mt-1">+$200 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Quality Score</p>
                        <p className="text-2xl font-bold">4.2/5</p>
                      </div>
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">+0.3 improvement</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hiring Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Applications</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full">
                            <div className="w-full h-2 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">1,234</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Screening</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full">
                            <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">892</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Interview</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full">
                            <div className="w-1/2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">456</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Offer</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full">
                            <div className="w-1/4 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">123</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hired</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full">
                            <div className="w-1/5 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">89</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Department Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Engineering</span>
                        <div className="flex items-center gap-2">
                          <Badge>45 hires</Badge>
                          <span className="text-sm text-green-600">+12%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Product</span>
                        <div className="flex items-center gap-2">
                          <Badge>23 hires</Badge>
                          <span className="text-sm text-green-600">+8%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Design</span>
                        <div className="flex items-center gap-2">
                          <Badge>12 hires</Badge>
                          <span className="text-sm text-red-600">-3%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Marketing</span>
                        <div className="flex items-center gap-2">
                          <Badge>9 hires</Badge>
                          <span className="text-sm text-green-600">+15%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communication System */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Communication Center</h2>
        <Card>
          <CardHeader>
            <CardTitle>Integrated Messaging & Communication</CardTitle>
            <CardDescription>Real-time messaging between recruiters, candidates, and team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Recent Conversations</h4>
                <div className="space-y-3">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium">Sarah Johnson</h5>
                            <span className="text-xs text-muted-foreground">2 min ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Thank you for the interview opportunity. I'm excited about...
                          </p>
                          <Badge variant="outline" className="mt-1">
                            Candidate
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium">HR Team</h5>
                            <span className="text-xs text-muted-foreground">1 hour ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Please review the candidate profiles for the PM role...
                          </p>
                          <Badge variant="outline" className="mt-1">
                            Internal
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium">Michael Chen</h5>
                            <span className="text-xs text-muted-foreground">3 hours ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            I have a question about the technical requirements...
                          </p>
                          <Badge variant="outline" className="mt-1">
                            Candidate
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Message Thread</h4>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-medium">Sarah Johnson</h5>
                        <p className="text-xs text-muted-foreground">Senior React Developer Candidate</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      <div className="flex gap-3">
                        <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-3 w-3" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-muted p-2 rounded-lg text-sm">
                            Hi! I wanted to follow up on my application for the Senior React Developer position.
                          </div>
                          <span className="text-xs text-muted-foreground">Yesterday 3:24 PM</span>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="flex-1 flex justify-end">
                          <div className="bg-primary text-primary-foreground p-2 rounded-lg text-sm max-w-xs">
                            Thank you for your interest! We've reviewed your application and would like to schedule a
                            technical interview.
                          </div>
                        </div>
                        <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-primary" />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-3 w-3" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-muted p-2 rounded-lg text-sm">
                            That's wonderful! I'm available this week. What times work best for your team?
                          </div>
                          <span className="text-xs text-muted-foreground">Today 10:15 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-md text-sm"
                      />
                      <Button size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">System Navigation</h2>
        <Card>
          <CardHeader>
            <CardTitle>Complete Feature Access</CardTitle>
            <CardDescription>All available pages and features in the Modern Hiring System</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <Building2 className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Dashboard</CardTitle>
                    <CardDescription className="text-sm">Main overview and statistics</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/jobs">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <Briefcase className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Jobs</CardTitle>
                    <CardDescription className="text-sm">Job postings and management</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/applications">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <Users className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Applications</CardTitle>
                    <CardDescription className="text-sm">Applicant tracking system</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/profile">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <User className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Profile</CardTitle>
                    <CardDescription className="text-sm">Resume and profile management</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/interviews">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <Calendar className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Interviews</CardTitle>
                    <CardDescription className="text-sm">Interview scheduling system</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/analytics">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <BarChart3 className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Analytics</CardTitle>
                    <CardDescription className="text-sm">Recruitment analytics dashboard</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/messages">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <MessageSquare className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Messages</CardTitle>
                    <CardDescription className="text-sm">Communication center</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/navigation">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <Navigation className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="text-lg">Navigation</CardTitle>
                    <CardDescription className="text-sm">Site navigation overview</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t">
        <p className="text-muted-foreground">
          Modern Hiring System - Complete recruitment platform built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </>
  )
}
