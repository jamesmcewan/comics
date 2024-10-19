export function sortDates(dates: string[]): string[] {
  return dates.sort((a, b) => {
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateA.getTime() - dateB.getTime()
  })
}
