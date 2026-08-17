import {
  EXERCISE_MINUTES_TARGET,
  SLEEP_HOURS_TARGET,
  STEPS_TARGET,
} from "@/constants/metric"
import { cn } from "@/lib/utils"
import { DayProgress } from "@/types/metric"
import { CompletedTargetsIndicator } from "./CompletedTargetsIndicator"

interface IDayCard {
  day: string
  date: Date
  progress: DayProgress
  selected?: boolean
  disabled?: boolean
  onClick: () => void
}

export const DayCard: React.FC<IDayCard> = ({
  day,
  date,
  progress,
  selected,
  disabled,
  onClick,
}) => {
  const getProgressPercentage = (value: number, target: number) => {
    return Math.min(100, (value / target) * 100)
  }

  const completedAllTargets =
    progress.steps >= STEPS_TARGET &&
    progress.sleepHours >= SLEEP_HOURS_TARGET &&
    progress.exerciseMinutes >= EXERCISE_MINUTES_TARGET

  const stepsPercent = getProgressPercentage(progress.steps, STEPS_TARGET)
  const sleepPercent = getProgressPercentage(
    progress.sleepHours,
    SLEEP_HOURS_TARGET
  )
  const exercisePercent = getProgressPercentage(
    progress.exerciseMinutes,
    EXERCISE_MINUTES_TARGET
  )

  const dateStr = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
  }).format(date)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex-1 rounded-lg border bg-card p-3",
        selected ? "border-2 border-black/50" : "",
        disabled ? "bg-muted" : "cursor-pointer bg-card hover:bg-muted/50"
      )}
    >
      {completedAllTargets && <CompletedTargetsIndicator />}

      <div className="text-xs font-medium text-muted-foreground">{day}</div>
      <div className="text-sm font-semibold">{dateStr}</div>

      <div className="mt-2 space-y-1">
        <div className="text-xs text-muted-foreground">
          {Math.round(progress.steps)}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${stepsPercent}%` }}
          />
        </div>

        <div className="text-xs text-muted-foreground">
          {progress.sleepHours.toFixed(1)}h
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-purple-500 transition-all"
            style={{ width: `${sleepPercent}%` }}
          />
        </div>

        <div className="text-xs text-muted-foreground">
          {progress.exerciseMinutes}m
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${exercisePercent}%` }}
          />
        </div>
      </div>
    </button>
  )
}
