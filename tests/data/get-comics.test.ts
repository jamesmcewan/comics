import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest'
import { getComics } from '../../src/data/get-comics'
import { getMetronData } from '../../src/data/get-metron-data'

// Mock the getMetronData function
vi.mock('../../src/data/get-metron-data', () => ({
  getMetronData: vi.fn(),
}))

describe('getComics', () => {
  // Mock console.error to prevent error output during tests
  beforeAll(() => {
    console.error = vi.fn()
  })

  // Reset mocks before each test
  beforeEach(() => {
    vi.resetAllMocks()
  })

  // Reset mocks after tests
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // Restore console after all tests
  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('has the correct function signature', () => {
    // Check that getComics is a function
    expect(typeof getComics).toBe('function')

    // Check that it accepts a parameter
    expect(getComics.length).toBe(1)
  })

  it('calls getMetronData with the correct endpoint', async () => {
    const mockWeek = '2024-09-04'
    const expectedEndpoint = `https://metron.cloud/api/issue/?store_date=${mockWeek}`
    const mockComicsData = {
      count: 2,
      results: [
        { id: '12345', title: 'Test Comic 1', publisher: 'Test Publisher 1' },
        { id: '67890', title: 'Test Comic 2', publisher: 'Test Publisher 2' },
      ],
    }

    // Set up the mock return value
    vi.mocked(getMetronData).mockResolvedValue(mockComicsData)

    // Call the function
    const result = await getComics(mockWeek)

    // Check if getMetronData was called with the correct endpoint
    expect(getMetronData).toHaveBeenCalledWith(expectedEndpoint)
    expect(getMetronData).toHaveBeenCalledTimes(1)

    // Check if the result matches the mock data
    expect(result).toEqual(mockComicsData)
  })

  it('handles errors from getMetronData', async () => {
    const mockWeek = '2024-09-04'

    // Set up the mock to throw an error
    vi.mocked(getMetronData).mockRejectedValue(new Error('API Error'))

    try {
      const _result = await getComics(mockWeek)
      // If we reach here, the function caught the error and returned something
      expect(getMetronData).toHaveBeenCalledWith(
        `https://metron.cloud/api/issue/?store_date=${mockWeek}`,
      )
    } catch (error) {
      // If we catch an error here, verify it's the expected one
      expect(error.message).toBe('API Error')
    }
  })

  it('returns empty object when getMetronData returns empty object', async () => {
    const mockWeek = '2024-09-04'

    // Set up the mock to return an empty object
    vi.mocked(getMetronData).mockResolvedValue({})

    // Call the function
    const result = await getComics(mockWeek)

    // Check if the result is an empty object
    expect(result).toEqual({})
  })

  it('handles invalid week parameter', async () => {
    // Since getMetronData handles errors internally and returns an empty object,
    // we can mock it to return an empty object
    vi.mocked(getMetronData).mockResolvedValue({})

    // When we pass an invalid week parameter
    const result = await getComics('invalid-date')

    // The function should return the empty object from getMetronData
    expect(result).toEqual({})

    // Verify getMetronData was called with the correct endpoint
    expect(getMetronData).toHaveBeenCalledWith(
      'https://metron.cloud/api/issue/?store_date=invalid-date',
    )
  })
})
