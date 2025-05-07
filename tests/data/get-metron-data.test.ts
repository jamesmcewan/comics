import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getMetronData } from '../../src/data/get-metron-data'

// Mock the global fetch API
vi.stubGlobal('fetch', vi.fn())

// Mock btoa since it might not be available in the test environment
vi.stubGlobal(
  'btoa',
  vi.fn((str) => `mocked_base64_${str}`),
)

// Mock environment variables
vi.stubEnv('M_USERNAME', 'test_username')
vi.stubEnv('M_PASSWORD', 'test_password')

describe('getMetronData', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()
  })

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks()
  })

  it('makes a request with the correct authorization header', async () => {
    // Mock a successful response
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValue({ data: 'test data' }),
    }

    // Setup the fetch mock
    global.fetch = vi.fn().mockResolvedValue(mockResponse)

    const endpoint = 'https://api.example.com/comics'
    await getMetronData(endpoint)

    // Check if fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic mocked_base64_test_username:test_password',
      },
    })

    // Check if the response.json method was called
    expect(mockResponse.json).toHaveBeenCalled()
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

    // Setup the fetch mock
    global.fetch = vi.fn().mockResolvedValue(mockResponse)

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

    // Setup the fetch mock to throw an error
    global.fetch = vi.fn().mockResolvedValue(mockResponse)

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
    // Setup the fetch mock to throw a network error
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

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
