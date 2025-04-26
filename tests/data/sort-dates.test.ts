import { describe, it, expect } from 'vitest'
import { sortDates } from '../../src/data/sort-dates'

describe('sortDates', () => {
  it('sorts dates in ascending order', () => {
    const unsortedDates = [
      '2025-05-15',
      '2025-01-01',
      '2025-12-25',
      '2025-03-10',
    ]

    const expectedSortedDates = [
      '2025-01-01',
      '2025-03-10',
      '2025-05-15',
      '2025-12-25',
    ]

    expect(sortDates(unsortedDates)).toEqual(expectedSortedDates)
  })

  it('handles dates from different years', () => {
    const unsortedDates = ['2026-01-01', '2024-12-31', '2025-06-15']

    const expectedSortedDates = ['2024-12-31', '2025-06-15', '2026-01-01']

    expect(sortDates(unsortedDates)).toEqual(expectedSortedDates)
  })

  it('returns an empty array when given an empty array', () => {
    expect(sortDates([])).toEqual([])
  })

  it('returns the same array when given a single date', () => {
    const singleDate = ['2025-01-01']
    expect(sortDates(singleDate)).toEqual(singleDate)
  })

  it('handles already sorted dates', () => {
    const sortedDates = ['2025-01-01', '2025-02-01', '2025-03-01']

    expect(sortDates(sortedDates)).toEqual(sortedDates)
  })
})
