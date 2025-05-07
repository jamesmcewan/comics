import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getNewComicBookDay } from '../../src/data/get-new-comic-book-day'

describe('getNewComicBookDay', () => {
  // Store the original Date implementation
  const OriginalDate = global.Date

  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    // Restore the original Date after each test
    global.Date = OriginalDate
  })

  it('returns an object with the expected properties', () => {
    const result = getNewComicBookDay()

    // Check that the function returns an object with the expected properties
    expect(result).toHaveProperty('currentWeek')
    expect(result).toHaveProperty('nextWeek')
    expect(result).toHaveProperty('lastWeek')

    // Check that the returned values are strings in the yyyy-mm-dd format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    expect(result.currentWeek).toMatch(dateRegex)
    expect(result.nextWeek).toMatch(dateRegex)
    expect(result.lastWeek).toMatch(dateRegex)

    // Verify that the dates are valid
    expect(() => new Date(result.currentWeek)).not.toThrow()
    expect(() => new Date(result.nextWeek)).not.toThrow()
    expect(() => new Date(result.lastWeek)).not.toThrow()

    // Check the relationship between dates
    const currentDate = new Date(result.currentWeek)
    const nextDate = new Date(result.nextWeek)
    const lastDate = new Date(result.lastWeek)

    // nextWeek should be 7 days after currentWeek
    const daysDiffNext =
      (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    expect(daysDiffNext).toBe(7)

    // lastWeek should be 7 days before currentWeek
    const daysDiffLast =
      (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    expect(daysDiffLast).toBe(7)

    // All dates should be Wednesdays (day 3)
    expect(currentDate.getDay()).toBe(3) // 0 is Sunday, so 3 is Wednesday
    expect(nextDate.getDay()).toBe(3)
    expect(lastDate.getDay()).toBe(3)
  })

  it('handles date calculations consistently', () => {
    // This test verifies the function returns dates that follow the expected pattern
    // without attempting to mock the Date object, which is complex and brittle
    
    const result = getNewComicBookDay()
    
    // Parse the dates
    const current = new Date(result.currentWeek)
    const next = new Date(result.nextWeek)
    const last = new Date(result.lastWeek)
    
    // Basic validation
    expect(current instanceof Date).toBe(true)
    expect(next instanceof Date).toBe(true)
    expect(last instanceof Date).toBe(true)
    
    // Verify all dates are Wednesdays
    expect(current.getDay()).toBe(3)
    expect(next.getDay()).toBe(3)
    expect(last.getDay()).toBe(3)
    
    // Verify the spacing between dates is exactly 7 days
    expect(next.getTime() - current.getTime()).toBe(7 * 24 * 60 * 60 * 1000)
    expect(current.getTime() - last.getTime()).toBe(7 * 24 * 60 * 60 * 1000)
  })
})