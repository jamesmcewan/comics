import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { getComics } from '../../src/data/get-comics'

describe('getComics', () => {
  // Mock console.error to prevent error output during tests
  beforeAll(() => {
    console.error = vi.fn()
  })

  // Setup fetch mock for each test
  beforeEach(() => {
    global.fetch = vi.fn()
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
  
  it('handles invalid week parameter', async () => {
    // Mock fetch to return a failed response and throw an error when used
    global.fetch = vi.fn().mockImplementation(() => {
      throw new Error('Network response was not ok')
    })

    // When we pass an invalid week parameter
    const result = await getComics('invalid-date')
    
    // The function should handle the error and return an empty object
    expect(result).toEqual({})
    
    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalled()
    
    // Verify console.error was called
    expect(console.error).toHaveBeenCalled()
  })
})