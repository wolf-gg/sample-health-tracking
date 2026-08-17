export const isToday = (date: Date): boolean => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const getWeekStart = (date: Date): Date => {
  const day = date.getDay()
  const diff = date.getDate() - day
  return new Date(date.getFullYear(), date.getMonth(), diff)
}

export const getWeekEnd = (date: Date): Date => {
  const start = getWeekStart(date)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return end
}

export const isSameWeek = (date1: Date, date2: Date): boolean => {
  const start1 = getWeekStart(date1)
  const start2 = getWeekStart(date2)
  return (
    start1.getDate() === start2.getDate() &&
    start1.getMonth() === start2.getMonth() &&
    start1.getFullYear() === start2.getFullYear()
  )
}

export const isCurrentWeek = (date: Date): boolean => {
  return isSameWeek(date, new Date())
}
