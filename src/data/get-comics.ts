export async function getComics(week: string) {
  const username = import.meta.env.USERNAME || process.env.USERNAME
  const password = import.meta.env.PASSWORD || process.env.PASSWORD
  const base64Credentials = btoa(`${username}:${password}`)

  try {
    const newComics = await fetch(
      `https://metron.cloud/api/issue/?store_date=${week}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64Credentials}`,
        },
      },
    )
    return await newComics.json()
  } catch {
    return {}
  }
}
