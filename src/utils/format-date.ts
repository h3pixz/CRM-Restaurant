const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatShortDate(isoDate: string): string {
  return shortDateFormatter.format(new Date(isoDate))
}
