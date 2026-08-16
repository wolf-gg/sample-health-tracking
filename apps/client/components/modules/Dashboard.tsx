import { MetricCard } from "@/components/base/MetricCard"
import { ActivityList } from "@/components/base/ActivityList"
import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"
import { Metric } from "@/types/metric"
import { useState } from "react"
import { DateChanger } from "../base/DateChanger"

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [selectedMetricId, setSelectedMetricId] = useState<string | undefined>(
    undefined
  )

  const changeDay = (offset: number) => {
    setSelectedDate((current) => {
      const next = new Date(current)
      next.setDate(next.getDate() + offset)
      return next
    })
  }

  const resetToToday = () => setSelectedDate(new Date())

  const selectedDateString = selectedDate.toISOString()

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
      <DateChanger
        selectedDate={selectedDate}
        onLeftClick={() => changeDay(-1)}
        onRightClick={() => changeDay(1)}
        onTodayClick={resetToToday}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            onClick={() =>
              setSelectedMetricId((prevMetricId) => {
                if (prevMetricId === metric.id) {
                  return undefined
                }

                return metric.id
              })
            }
            selected={metric.id === selectedMetricId}
          />
        ))}
      </div>

      <ActivityList
        selectedMetricId={selectedMetricId}
        selectedDate={selectedDate}
      />
    </div>
  )
}
