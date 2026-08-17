import { isToday } from "@/utils/date"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface IDateChanger {
  selectedDate: Date
  onLeftClick: () => void
  onRightClick: () => void
  onTodayClick: () => void
}

export const DateChanger: React.FC<IDateChanger> = ({
  selectedDate,
  onLeftClick,
  onRightClick,
  onTodayClick,
}) => {
  const selectedDateLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(selectedDate)

  return (
    <div className="mb-6 flex items-center justify-center gap-3 rounded-lg border bg-card p-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous day"
        onClick={onLeftClick}
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
        onClick={onRightClick}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onTodayClick}
        disabled={isToday(selectedDate)}
      >
        Today
      </Button>
    </div>
  )
}
