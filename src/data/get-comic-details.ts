import { getMetronData } from './get-metron-data'

export async function getComicDetails(id: string) {
  const endpoint = `https://metron.cloud/api/issue/${id}/`
  await getMetronData(endpoint)
}

