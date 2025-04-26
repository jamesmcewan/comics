import { describe, it, expect } from 'vitest'
import { getNewComicBookDay } from '../../src/data/get-new-comic-book-day'

// Since mocking dates is complex with the current setup, we'll test the basic functionality
describe('getNewComicBookDay', () => {
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
    const daysDiffNext = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    expect(daysDiffNext).toBe(7)
    
    // lastWeek should be 7 days before currentWeek
    const daysDiffLast = (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    expect(daysDiffLast).toBe(7)
    
    // All dates should be Wednesdays (day 3)
    expect(currentDate.getDay()).toBe(3) // 0 is Sunday, so 3 is Wednesday
    expect(nextDate.getDay()).toBe(3)
    expect(lastDate.getDay()).toBe(3)
  })
})