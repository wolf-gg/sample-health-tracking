import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react"
import { MetricCard } from "@/components/base/MetricCard"
import { Button } from "@/components/ui/button"
import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"
import { Metric } from "@/types/metric"
import { useState } from "react"
import { isToday } from "@/utils/date"

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date())

  const changeDay = (offset: number) => {
    setSelectedDate((current) => {
      const next = new Date(current)
      next.setDate(next.getDate() + offset)
      return next
    })
  }

  const resetToToday = () => setSelectedDate(new Date())

  const selectedDateString = selectedDate.toISOString()
  const selectedDateLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(selectedDate)

  const { data: dashboardData } = useSWR<{
    exerciseMinutes: number
    steps: number
    sleepHours: number
  }>(`/dashboard?dateString=${selectedDateString}`, fetcher)

  const metrics: Metric[] = [
    {
      id: "steps",
      title: "Steps",
      value: dashboardData?.steps ?? 0,
      unit: "steps",
      target: 5000,
    },
    {
      id: "sleep",
      title: "Sleep",
      value: dashboardData?.sleepHours ?? 0,
      unit: "hrs",
      target: 7,
    },
    {
      id: "exercise",
      title: "Exercise",
      value: dashboardData?.exerciseMinutes ?? 0,
      unit: "min",
      target: 30,
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-3 rounded-lg border bg-card p-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous day"
          onClick={() => changeDay(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-44 text-center text-sm font-medium">
          {selectedDateLabel}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next day"
          disabled={isToday(selectedDate)}
          onClick={() => changeDay(1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={resetToToday}
          disabled={isToday(selectedDate)}
        >
          Today
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </div>
  )
}
