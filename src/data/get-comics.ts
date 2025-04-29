import { getMetronData } from './get-metron-data'

export async function getComics(week: string) {
  const endpoint = `https://metron.cloud/api/issue/?store_date=${week}`
  return await getMetronData(endpoint)
}
