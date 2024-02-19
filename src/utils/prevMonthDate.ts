export default function getPreviousMonthDates(): {
  firstDay: string
  lastDay: string
} {
  // Get the current date
  const currentDate: Date = new Date()

  // Calculate the first day of the previous month
  const firstDayPreviousMonth: Date = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  )

  // Calculate the last day of the previous month
  const lastDayPreviousMonth: Date = new Date(currentDate)
  lastDayPreviousMonth.setDate(0)

  // Format dates as strings (in "DD.MM.YYYY" format)
  const formattedFirstDay: string = formatDate(firstDayPreviousMonth)
  const formattedLastDay: string = formatDate(lastDayPreviousMonth)

  return {
    firstDay: formattedFirstDay,
    lastDay: formattedLastDay,
  }
}

// Helper function to format a date as "DD.MM.YYYY"
function formatDate(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0')
  const month: string = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year: number = date.getFullYear()
  return `${day}.${month}.${year}`
}
