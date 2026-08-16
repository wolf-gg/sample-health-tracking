import { Metric } from "@/types/metric"

interface IMetricCard {
  metric: Metric
}

export const MetricCard: React.FC<IMetricCard> = ({ metric }) => {
  const formatValue = (value: number) => {
    if (metric.unit === "steps") return new Intl.NumberFormat().format(value)
    return value.toString()
  }

  const percent = Math.min(
    100,
    Math.max(0, (metric.value / metric.target) * 100)
  )

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-baseline justify-between gap-2">
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
