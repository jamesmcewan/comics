export async function getComics(week: string) {
  const username = import.meta.env.USERNAME || process.env.USERNAME
  const password = import.meta.env.PASSWORD || process.env.PASSWORD
  const base64Credentials = btoa(`${username}:${password}`)

  try {
    const response = await fetch(
      `https://metron.cloud/api/issue/?store_date=${week}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64Credentials}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    console.log(response)
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    return {}
  }
}
