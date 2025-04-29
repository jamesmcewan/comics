export async function getMetronData(endpoint: string) {
  const username = import.meta.env.M_USERNAME || process.env.M_USERNAME
  const password = import.meta.env.M_PASSWORD || process.env.M_PASSWORD
  const base64Credentials = btoa(`${username}:${password}`)

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    })

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}
