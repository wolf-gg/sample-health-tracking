import { getWeekStart } from "@/utils/date"
import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"
import { useEffect, useState } from "react"
import { DayCard } from "../base/DayCard"

interface IWeekView {
  selectedDate: Date
  onDayClick: (date: Date) => void
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const WeekView: React.FC<IWeekView> = ({ selectedDate, onDayClick }) => {
  const weekStart = getWeekStart(selectedDate)
  const [weekDays, setWeekDays] = useState<Date[]>([])

  useEffect(() => {
    const days: Date[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    setWeekDays(days)
  }, [selectedDate])

  const dateStrings = weekDays.map((d) => d.toISOString())

  // Fetch data for all 7 days
  const { data: weekData } = useSWR<Record<
    string,
    {
      exerciseMinutes: number
      steps: number
      sleepHours: number
    }
  > | null>(
    dateStrings.length > 0
      ? `/dashboard/week?dates=${dateStrings.join(",")}`
      : null,
    fetcher
  )

  return (
    <div className="mb-6 grid grid-cols-7 gap-2">
      {weekDays.map((date) => {
        const dateStr = date.toISOString()
        const dayData = weekData?.[dateStr] || {
          exerciseMinutes: 0,
          steps: 0,
          sleepHours: 0,
        }

        const selected =
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear()

        return (
          <DayCard
            key={dateStr}
            day={DAYS[date.getDay()]}
            date={date}
            progress={{ date, ...dayData }}
            selected={selected}
            disabled={date > new Date()}
            onClick={() => onDayClick(date)}
          />
        )
      })}
    </div>
  )
}
