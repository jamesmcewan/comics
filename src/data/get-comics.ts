export async function getComics() {
  const username = import.meta.env.USERNAME || process.env.USERNAME
  const password = import.meta.env.PASSWORD || process.env.PASSWORD
  const base64Credentials = btoa(`${username}:${password}`)

  try {
    const newComics = await fetch(
      'https://metron.cloud/api/issue/?store_date=2024-10-16',
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
