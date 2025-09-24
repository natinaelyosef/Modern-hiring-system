"use client"

import type { FunnelMetric } from "@/types/analytics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown } from "lucide-react"

interface HiringFunnelChartProps {
  data: FunnelMetric[]
}

export function HiringFunnelChart({ data }: HiringFunnelChartProps) {
  const maxCount = Math.max(...data.map((item) => item.count))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Hiring Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.stage} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.stage}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{item.count} candidates</span>
                  {item.conversionRate && index > 0 && (
                    <span className="text-xs text-blue-500">{item.conversionRate.toFixed(1)}% conversion</span>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
