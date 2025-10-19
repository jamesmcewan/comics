import { getMetronData } from './get-metron-data'

export async function getComicDetails(id: string) {
  // Validate and sanitize the id parameter (expected to be numeric)
  const idPattern = /^\d+$/
  if (!idPattern.test(id)) {
    throw new Error('Invalid id format. Expected numeric value')
  }

  // Only pass the validated id to the API endpoint
  const endpoint = `https://metron.cloud/api/issue/${encodeURIComponent(id)}/`
  return await getMetronData(endpoint)
}
