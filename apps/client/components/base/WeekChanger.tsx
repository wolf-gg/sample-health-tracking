import { isCurrentWeek, getWeekStart, getWeekEnd } from "@/utils/date"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface IWeekChanger {
  selectedDate: Date
  onLeftClick: () => void
  onRightClick: () => void
  onTodayClick: () => void
}

export const WeekChanger: React.FC<IWeekChanger> = ({
  selectedDate,
  onLeftClick,
  onRightClick,
  onTodayClick,
}) => {
  const weekStart = getWeekStart(selectedDate)
  const weekEnd = getWeekEnd(selectedDate)

  const weekLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(weekStart)

  const endLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(weekEnd)

  const isCurrentWeekSelected = isCurrentWeek(selectedDate)

  return (
    <div className="mb-6 flex items-center justify-center gap-3 rounded-lg border bg-card p-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous week"
        onClick={onLeftClick}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="min-w-56 text-center text-sm font-medium">
        {weekLabel} - {endLabel}
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Next week"
        disabled={isCurrentWeekSelected}
        onClick={onRightClick}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={onTodayClick}
        disabled={isCurrentWeekSelected}
      >
        This Week
      </Button>
    </div>
  )
}
