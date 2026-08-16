import { fetcher } from "@/utils/fetcher"
import { Dumbbell } from "lucide-react"
import useSWR from "swr"

interface IExerciseActivityList {
  selectedDate: Date
}

export const ExerciseActivityList: React.FC<IExerciseActivityList> = ({
  selectedDate,
}) => {
  const { data, error } = useSWR<{ minutes: number; date: Date }[]>(
    `/exercise?dateString=${selectedDate.toISOString()}`,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  )

  return (
    <div className="mt-6 flex flex-col gap-2 rounded-lg border bg-card py-4">
      <div className="flex flex-row items-center gap-2 px-4">
        <Dumbbell size={30} />
        <h3 className="text-lg font-semibold">Exercise Activity Log</h3>
      </div>

      <div className="h-64 space-y-2 overflow-auto px-4">
        {error && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-sm text-destructive">Failed to load</div>
          </div>
        )}
        {!data && !error && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-sm text-muted-foreground">Loading…</div>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-sm text-muted-foreground">
              No activities for this day
            </div>
          </div>
        )}

        {data &&
          data.map((item, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded py-1 hover:bg-muted"
            >
              <div className="text-sm">
                {item.minutes} {item.minutes === 1 ? "minute" : "minutes"}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.date
                  ? new Date(item.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
