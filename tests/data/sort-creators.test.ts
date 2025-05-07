import { describe, it, expect } from 'vitest'
import { sortCreators } from '../../src/data/sort-creators'

describe('sortCreators', () => {
  it('sorts creators by their primary role ID in ascending order', () => {
    const unsortedCreators = [
      {
        id: 1,
        creator: 'Jane Smith',
        role: [{ id: 3, name: 'Inker' }],
      },
      {
        id: 2,
        creator: 'John Doe',
        role: [{ id: 1, name: 'Writer' }],
      },
      {
        id: 3,
        creator: 'Alice Johnson',
        role: [{ id: 2, name: 'Artist' }],
      },
    ]

    const expectedSortedCreators = [
      { name: 'John Doe', role: 'Writer' },
      { name: 'Alice Johnson', role: 'Artist' },
      { name: 'Jane Smith', role: 'Inker' },
    ]

    expect(sortCreators(unsortedCreators)).toEqual(expectedSortedCreators)
  })

  it('handles creators with multiple roles by using only the first role', () => {
    const creatorsWithMultipleRoles = [
      {
        id: 1,
        creator: 'Jane Smith',
        role: [
          { id: 2, name: 'Artist' },
          { id: 3, name: 'Inker' },
        ],
      },
      {
        id: 2,
        creator: 'John Doe',
        role: [
          { id: 1, name: 'Writer' },
          { id: 5, name: 'Editor' },
        ],
      },
    ]

    const expected = [
      { name: 'John Doe', role: 'Writer' },
      { name: 'Jane Smith', role: 'Artist' },
    ]

    expect(sortCreators(creatorsWithMultipleRoles)).toEqual(expected)
  })

  it('handles creators with empty role arrays by assigning "Unknown"', () => {
    const creatorsWithEmptyRoles = [
      {
        id: 1,
        creator: 'John Doe',
        role: [],
      },
      {
        id: 2,
        creator: 'Jane Smith',
        role: [{ id: 1, name: 'Writer' }],
      },
    ]

    const expected = [
      { name: 'Jane Smith', role: 'Writer' },
      { name: 'John Doe', role: 'Unknown' },
    ]

    expect(sortCreators(creatorsWithEmptyRoles)).toEqual(expected)
  })

  it('returns an empty array when given an empty array', () => {
    expect(sortCreators([])).toEqual([])
  })

  it('preserves the original array order when role IDs are the same', () => {
    const creatorsWithSameRoleId = [
      {
        id: 1,
        creator: 'John Doe',
        role: [{ id: 1, name: 'Writer' }],
      },
      {
        id: 2,
        creator: 'Jane Smith',
        role: [{ id: 1, name: 'Writer' }],
      },
    ]

    const expected = [
      { name: 'John Doe', role: 'Writer' },
      { name: 'Jane Smith', role: 'Writer' },
    ]

    expect(sortCreators(creatorsWithSameRoleId)).toEqual(expected)
  })
})
