import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  description?: string
  trend?: "up" | "down" | "neutral"
  format?: "number" | "percentage" | "currency" | "days"
}

export function MetricsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  description,
  trend,
  format = "number",
}: MetricsCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val

    switch (format) {
      case "percentage":
        return `${(val * 100).toFixed(1)}%`
      case "currency":
        return `$${val.toLocaleString()}`
      case "days":
        return `${val} days`
      default:
        return val.toLocaleString()
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{formatValue(value)}</div>

          {change !== undefined && (
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <span className={`text-xs ${getTrendColor()}`}>
                {change > 0 ? "+" : ""}
                {change}%{changeLabel && ` ${changeLabel}`}
              </span>
            </div>
          )}

          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
