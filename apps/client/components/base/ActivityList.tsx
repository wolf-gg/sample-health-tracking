import { ExerciseActivityList } from "./ExerciseActivityList"
import { SleepActivityList } from "./SleepActivityList"
import { StepsActivityList } from "./StepsActivityList"

interface IActivityList {
  selectedMetricId?: string
  selectedDate: Date
}

export const ActivityList: React.FC<IActivityList> = ({
  selectedMetricId,
  selectedDate,
}) => {
  if (!selectedMetricId) return <></>

  switch (selectedMetricId) {
    case "exercise":
      return <ExerciseActivityList selectedDate={selectedDate} />
    case "sleep":
      return <SleepActivityList selectedDate={selectedDate} />
    case "steps":
      return <StepsActivityList selectedDate={selectedDate} />
  }
}
