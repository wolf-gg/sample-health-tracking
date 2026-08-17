import { cn } from "@/lib/utils"
import { Metric } from "@/types/metric"
import React from "react"

interface IMetricCard {
  metric: Metric
  onClick?: () => void
  selected?: boolean
}

export const MetricCard: React.FC<IMetricCard> = ({
  metric,
  onClick,
  selected,
}) => {
  const formatValue = (value: number) => {
    if (metric.unit === "steps") return new Intl.NumberFormat().format(value)
    return value.toFixed(1)
  }

  const percent = Math.min(
    100,
    Math.max(0, (metric.value / metric.target) * 100)
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onClick) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className={cn(
        "rounded-lg border bg-card p-4 hover:bg-muted/50",
        onClick ? "cursor-pointer" : "",
        selected ? "border-2 border-black/50" : ""
      )}
    >
      <div className="flex items-baseline justify-between gap-2 select-none">
        <div>
          <div className="text-sm font-medium">{metric.title}</div>
          <div className="mt-1 text-2xl font-semibold">
            {formatValue(metric.value)}
            <span className="ml-1 text-sm font-medium text-muted-foreground">
              / {formatValue(metric.target)}{" "}
              {metric.unit === "steps" ? "" : metric.unit}
            </span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {Math.round(percent)}%
        </div>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
