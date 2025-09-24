"use client"

import { useState, useEffect } from "react"
import type {
  HiringMetrics,
  TimeSeriesData,
  DepartmentMetrics,
  RecruitmentEfficiency,
  AnalyticsFilters,
} from "@/types/analytics"
import { getHiringMetrics, getTimeSeriesData, getDepartmentMetrics, getRecruitmentEfficiency } from "@/lib/analytics"
import { MetricsCard } from "@/components/analytics/metrics-card"
import { HiringFunnelChart } from "@/components/analytics/hiring-funnel-chart"
import { TimeSeriesChart } from "@/components/analytics/time-series-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, Briefcase, TrendingUp, Clock, Target, Award, Building } from "lucide-react"

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<HiringMetrics | null>(null)
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [departmentMetrics, setDepartmentMetrics] = useState<DepartmentMetrics[]>([])
  const [efficiency, setEfficiency] = useState<RecruitmentEfficiency | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<AnalyticsFilters>({})

  useEffect(() => {
    loadAnalyticsData()
  }, [filters])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      const [metricsData, timeData, deptData, efficiencyData] = await Promise.all([
        getHiringMetrics(filters),
        getTimeSeriesData(filters),
        getDepartmentMetrics(filters),
        getRecruitmentEfficiency(filters),
      ])

      setMetrics(metricsData)
      setTimeSeriesData(timeData)
      setDepartmentMetrics(deptData)
      setEfficiency(efficiencyData)
    } catch (error) {
      console.error("Failed to load analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-8 bg-muted rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your hiring process and recruitment performance
          </p>
        </div>

        <div className="flex gap-2">
          <Select
            value={filters.department || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, department: value === "all" ? undefined : value }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setFilters({})}>
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Total Jobs"
            value={metrics.totalJobs}
            icon={<Briefcase className="h-4 w-4" />}
            change={12}
            changeLabel="vs last month"
            trend="up"
          />
          <MetricsCard
            title="Total Applications"
            value={metrics.totalApplications}
            icon={<Users className="h-4 w-4" />}
            change={8}
            changeLabel="vs last month"
            trend="up"
          />
          <MetricsCard
            title="Hire Rate"
            value={metrics.hireRate}
            format="percentage"
            icon={<Target className="h-4 w-4" />}
            change={-2}
            changeLabel="vs last month"
            trend="down"
          />
          <MetricsCard
            title="Avg Time to Hire"
            value={metrics.averageTimeToHire}
            format="days"
            icon={<Clock className="h-4 w-4" />}
            change={-5}
            changeLabel="vs last month"
            trend="up"
          />
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesChart data={timeSeriesData} />
        {metrics && <HiringFunnelChart data={metrics.hiringFunnel} />}
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Department Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departmentMetrics.map((dept) => (
              <div key={dept.department} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{dept.department}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{dept.openPositions} open positions</span>
                    <span>{dept.totalApplications} applications</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Hire Rate</span>
                      <span className="font-medium">{(dept.hireRate * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={dept.hireRate * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Time to Hire</span>
                      <span className="font-medium">{dept.averageTimeToHire} days</span>
                    </div>
                    <Progress value={((30 - dept.averageTimeToHire) / 30) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Application Volume</span>
                      <span className="font-medium">{dept.totalApplications}</span>
                    </div>
                    <Progress value={(dept.totalApplications / 200) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recruitment Efficiency */}
      {efficiency && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Effectiveness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Source Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {efficiency.sourceEffectiveness.map((source) => (
                  <div key={source.source} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{source.source}</div>
                      <div className="text-sm text-muted-foreground">
                        {source.applications} applications • {source.hires} hires
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-500">{(source.conversionRate * 100).toFixed(1)}%</div>
                      {source.costPerHire && (
                        <div className="text-sm text-muted-foreground">${source.costPerHire}/hire</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recruiter Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recruiter Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {efficiency.recruiterPerformance.map((recruiter) => (
                  <div key={recruiter.recruiterId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{recruiter.recruiterName}</div>
                      <div className="text-sm text-muted-foreground">
                        {recruiter.activeJobs} active jobs • {recruiter.hires} hires
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{recruiter.averageTimeToHire} days</div>
                      <div className="text-sm text-muted-foreground">avg time to hire</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Skills & Application Status */}
      {metrics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Skills in Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.topSkills.map((skill) => (
                  <div key={skill.skill} className="flex items-center justify-between">
                    <span className="font-medium">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{skill.count}</span>
                      <Badge variant="secondary">{skill.percentage.toFixed(1)}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.applicationsByStatus.map((status) => (
                  <div key={status.status} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{status.status}</span>
                      <span className="text-sm text-muted-foreground">
                        {status.count} ({status.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={status.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
