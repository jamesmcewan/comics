export function getNewComicBookDay(): {
  currentWeek: string
  nextWeek: string
  lastWeek: string
} {
  const now = new Date()
  const utcNow = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  )
  const today = new Date(utcNow)

  const wednesday = 3 // 0 is Sunday, 3 is Wednesday

  // Calculate the date of Wednesday in the current week
  const currentWednesday = new Date(today)
  currentWednesday.setUTCDate(
    today.getUTCDate() - today.getUTCDay() + wednesday,
  )

  // If today is after Wednesday, move to next week
  if (today.getUTCDay() > wednesday) {
    currentWednesday.setUTCDate(currentWednesday.getUTCDate() + 7)
  }

  // Calculate the date of Wednesday in the next week
  const nextWednesday = new Date(currentWednesday)
  nextWednesday.setUTCDate(currentWednesday.getUTCDate() + 7)

  // Calculate the date of Wednesday in the last week
  const lastWednesday = new Date(currentWednesday)
  lastWednesday.setUTCDate(currentWednesday.getUTCDate() - 7)

  // Format dates to yyyy-mm-dd
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
  }

  return {
    currentWeek: formatDate(currentWednesday),
    nextWeek: formatDate(nextWednesday),
    lastWeek: formatDate(lastWednesday),
  }
}
