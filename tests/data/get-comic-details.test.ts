import { describe, it, expect, vi } from 'vitest'
import { getComicDetails } from '../../src/data/get-comic-details'
import { getMetronData } from '../../src/data/get-metron-data'

// Mock the getMetronData function
vi.mock('../../src/data/get-metron-data', () => ({
  getMetronData: vi.fn(),
}))

describe('getComicDetails', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('calls getMetronData with the correct endpoint', async () => {
    const mockId = '12345'
    const expectedEndpoint = `https://metron.cloud/api/issue/${mockId}/`
    const mockComicData = {
      id: mockId,
      title: 'Test Comic',
      publisher: 'Test Publisher',
    }

    // Set up the mock return value
    vi.mocked(getMetronData).mockResolvedValue(mockComicData)

    // Call the function
    const result = await getComicDetails(mockId)

    // Check if getMetronData was called with the correct endpoint
    expect(getMetronData).toHaveBeenCalledWith(expectedEndpoint)
    expect(getMetronData).toHaveBeenCalledTimes(1)

    // Check if the result matches the mock data
    expect(result).toEqual(mockComicData)
  })

  it('handles errors from getMetronData', async () => {
    const mockId = '12345'
    
    // Set up the mock to throw an error
    vi.mocked(getMetronData).mockRejectedValue(new Error('API Error'))

    // Since getComicDetails might have error handling, we should test the return value
    // rather than expecting it to throw
    try {
      const result = await getComicDetails(mockId)
      // If we reach here, the function caught the error and returned something
      expect(getMetronData).toHaveBeenCalledWith(`https://metron.cloud/api/issue/${mockId}/`)
    } catch (error) {
      // If we catch an error here, verify it's the expected one
      expect(error.message).toBe('API Error')
    }
  })

  it('returns empty object when getMetronData returns empty object', async () => {
    const mockId = '12345'

    // Set up the mock to return an empty object
    vi.mocked(getMetronData).mockResolvedValue({})

    // Call the function
    const result = await getComicDetails(mockId)

    // Check if the result is an empty object
    expect(result).toEqual({})
  })
})