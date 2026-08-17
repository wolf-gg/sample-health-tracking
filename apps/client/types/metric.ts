export enum ActivityType {
  STEPS = "steps",
  SLEEP = "sleep",
  EXERCISE = "exercise",
}

export interface Metric {
  id: ActivityType
  title: string
  value: number
  unit: string
  target: number
}
