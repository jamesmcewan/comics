import { getMetronData } from './get-metron-data'

export async function getComics(week: string) {
  // Validate and sanitize the week parameter (expected format: YYYY-MM-DD)
  const weekPattern = /^\d{4}-\d{2}-\d{2}$/
  if (!weekPattern.test(week)) {
    throw new Error('Invalid week format. Expected YYYY-MM-DD')
  }

  // Only pass the validated store_date parameter to the API
  const params = new URLSearchParams({
    store_date: week
  })
  const endpoint = `https://metron.cloud/api/issue/?${params.toString()}`
  return await getMetronData(endpoint)
}
