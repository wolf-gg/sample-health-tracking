import { MetricCard } from "@/components/base/MetricCard"
import { ActivityList } from "@/components/base/ActivityList"
import AddActivityModal from "@/components/base/AddActivityModal"
import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"
import { Metric, ActivityType } from "@/types/metric"
import { useState } from "react"
import { WeekChanger } from "../base/WeekChanger"
import { WeekView } from "./WeekView"
import {
  EXERCISE_MINUTES_TARGET,
  SLEEP_HOURS_TARGET,
  STEPS_TARGET,
} from "@/constants/metric"

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [selectedMetricId, setSelectedMetricId] = useState<
    ActivityType | undefined
  >(undefined)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const changeWeek = (offset: number) => {
    setSelectedDate((current) => {
      const next = new Date(current)
      next.setDate(next.getDate() + offset * 7)
      return next
    })
  }

  const resetToThisWeek = () => setSelectedDate(new Date())

  const selectedDateString = selectedDate.toISOString()

  const { data: dashboardData, mutate: mutateDashboardData } = useSWR<{
    exerciseMinutes: number
    steps: number
    sleepHours: number
  }>(`/dashboard?dateString=${selectedDateString}`, fetcher)

  const metrics: Metric[] = [
    {
      id: ActivityType.STEPS,
      title: "Steps",
      value: dashboardData?.steps ?? 0,
      unit: "steps",
      target: STEPS_TARGET,
    },
    {
      id: ActivityType.SLEEP,
      title: "Sleep",
      value: dashboardData?.sleepHours ?? 0,
      unit: "hrs",
      target: SLEEP_HOURS_TARGET,
    },
    {
      id: ActivityType.EXERCISE,
      title: "Exercise",
      value: dashboardData?.exerciseMinutes ?? 0,
      unit: "min",
      target: EXERCISE_MINUTES_TARGET,
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <WeekChanger
          selectedDate={selectedDate}
          onLeftClick={() => changeWeek(-1)}
          onRightClick={() => changeWeek(1)}
          onTodayClick={resetToThisWeek}
        />

        <div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="rounded bg-primary px-3 py-1 text-white"
          >
            Add Activity
          </button>
        </div>
      </div>

      <WeekView
        selectedDate={selectedDate}
        onDayClick={(date) => setSelectedDate(date)}
      />

      <AddActivityModal
        selectedDate={selectedDate}
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={() => {
          setIsAddOpen(false)
          mutateDashboardData()
        }}
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
