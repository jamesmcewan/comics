import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  mock,
  spyOn,
} from 'bun:test'
import { getMetronData } from '../../src/data/get-metron-data'

describe('getMetronData', () => {
  let originalFetch: typeof globalThis.fetch
  let originalBtoa: typeof globalThis.btoa
  let fetchMock: ReturnType<typeof mock>

  beforeEach(() => {
    // Set environment variables
    process.env.M_USERNAME = 'test_username'
    process.env.M_PASSWORD = 'test_password'

    // Mock btoa
    originalBtoa = globalThis.btoa
    globalThis.btoa = (str: string) => `mocked_base64_${str}`

    // Mock fetch - create mock and assign it
    originalFetch = globalThis.fetch
    fetchMock = mock(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve({}),
      } as Response),
    )
    globalThis.fetch = fetchMock as any
  })

  afterEach(() => {
    // Cleanup environment
    delete process.env.M_USERNAME
    delete process.env.M_PASSWORD

    // Restore globals
    globalThis.btoa = originalBtoa
    globalThis.fetch = originalFetch
  })

  it('makes a request with the correct authorization header', async () => {
    const mockJson = mock(() => Promise.resolve({ data: 'test data' }))

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: mockJson,
    } as Response)

    const endpoint = 'https://api.example.com/comics'
    await getMetronData(endpoint)

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic mocked_base64_test_username:test_password',
      },
    })

    expect(mockJson).toHaveBeenCalled()
  })

  it('returns the JSON response on successful request', async () => {
    const mockData = { data: 'test data' }

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: mock(() => Promise.resolve(mockData)),
    } as Response)

    const result = await getMetronData('https://api.example.com/comics')
    expect(result).toEqual(mockData)
  })

  it('returns an empty object when the request fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response)

    const consoleSpy = spyOn(console, 'error').mockImplementation(() => {})

    const result = await getMetronData('https://api.example.com/comics')

    expect(result).toEqual({})
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('handles network errors gracefully', async () => {
    fetchMock.mockRejectedValue(new Error('Network error'))

    const consoleSpy = spyOn(console, 'error').mockImplementation(() => {})

    const result = await getMetronData('https://api.example.com/comics')

    expect(result).toEqual({})
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
