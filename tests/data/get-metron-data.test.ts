import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getMetronData } from '../../src/data/get-metron-data'

// Mock environment variables
vi.stubEnv('M_USERNAME', 'test_username')
vi.stubEnv('M_PASSWORD', 'test_password')

// Mock btoa
vi.stubGlobal('btoa', (str: string) => `mocked_base64_${str}`)

describe('getMetronData', () => {
  // Store original fetch
  const originalFetch = global.fetch

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()

    // Replace global fetch with a mock
    global.fetch = vi.fn() as unknown as typeof fetch
  })

  afterEach(() => {
    // Restore global fetch
    global.fetch = originalFetch

    // Clear mocks
    vi.clearAllMocks()
  })

  it('makes a request with the correct authorization header', async () => {
    // Mock a successful response
    const mockJson = vi.fn().mockResolvedValue({ data: 'test data' })
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: mockJson,
    }

    // Setup fetch mock
    vi.mocked(global.fetch).mockResolvedValue(
      mockResponse as unknown as Response,
    )

    const endpoint = 'https://api.example.com/comics'
    await getMetronData(endpoint)

    // Check if fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic mocked_base64_test_username:test_password',
      },
    })

    // Check if the response.json method was called
    expect(mockJson).toHaveBeenCalled()
  })

  it('returns the JSON response on successful request', async () => {
    const mockData = { data: 'test data' }

    // Mock a successful response
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValue(mockData),
    }

    // Setup fetch mock
    vi.mocked(global.fetch).mockResolvedValue(
      mockResponse as unknown as Response,
    )

    const result = await getMetronData('https://api.example.com/comics')

    // Check if the result matches the mock data
    expect(result).toEqual(mockData)
  })

  it('returns an empty object when the request fails', async () => {
    // Mock a failed response
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    }

    // Setup fetch mock
    vi.mocked(global.fetch).mockResolvedValue(
      mockResponse as unknown as Response,
    )

    // Mock console.error to avoid polluting test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await getMetronData('https://api.example.com/comics')

    // Check if an empty object was returned
    expect(result).toEqual({})

    // Check if the error was logged
    expect(consoleSpy).toHaveBeenCalled()

    // Restore console.error
    consoleSpy.mockRestore()
  })

  it('handles network errors gracefully', async () => {
    // Setup fetch mock to throw a network error
    vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'))

    // Mock console.error to avoid polluting test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await getMetronData('https://api.example.com/comics')

    // Check if an empty object was returned
    expect(result).toEqual({})

    // Check if the error was logged
    expect(consoleSpy).toHaveBeenCalled()

    // Restore console.error
    consoleSpy.mockRestore()
  })
})
