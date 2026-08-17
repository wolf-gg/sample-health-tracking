import { ExerciseActivityList } from "./ExerciseActivityList"
import { SleepActivityList } from "./SleepActivityList"
import { StepsActivityList } from "./StepsActivityList"
import { ActivityType } from "@/types/metric"

interface IActivityList {
  selectedMetricId?: ActivityType
  selectedDate: Date
}

export const ActivityList: React.FC<IActivityList> = ({
  selectedMetricId,
  selectedDate,
}) => {
  if (!selectedMetricId) return <></>

  switch (selectedMetricId) {
    case ActivityType.EXERCISE:
      return <ExerciseActivityList selectedDate={selectedDate} />
    case ActivityType.SLEEP:
      return <SleepActivityList selectedDate={selectedDate} />
    case ActivityType.STEPS:
      return <StepsActivityList selectedDate={selectedDate} />
  }
}
