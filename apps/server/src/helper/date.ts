export const getStartAndEndOfDay = (
  date: Date,
): { startOfDay: Date; endOfDay: Date } => {
  // Set date to the start of the day (00:00:00)
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  // Set date to the end of the day (23:59:59)
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};
