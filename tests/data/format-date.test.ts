import { describe, it, expect } from 'vitest'
import { formatDate } from '../../src/data/format-date'

describe('formatDate', () => {
  it('formats dates with the correct ordinal suffix', () => {
    // Test 1st
    expect(formatDate('2025-01-01')).toContain('1st Jan 2025')
    
    // Test 2nd
    expect(formatDate('2025-01-02')).toContain('2nd Jan 2025')
    
    // Test 3rd
    expect(formatDate('2025-01-03')).toContain('3rd Jan 2025')
    
    // Test 4th (regular th)
    expect(formatDate('2025-01-04')).toContain('4th Jan 2025')
    
    // Test special cases for teens (11th-13th)
    expect(formatDate('2025-01-11')).toContain('11th Jan 2025')
    expect(formatDate('2025-01-12')).toContain('12th Jan 2025')
    expect(formatDate('2025-01-13')).toContain('13th Jan 2025')
    
    // Test 21st (1st suffix, but not a teen)
    expect(formatDate('2025-01-21')).toContain('21st Jan 2025')
    
    // Test 22nd (2nd suffix, but not a teen)
    expect(formatDate('2025-01-22')).toContain('22nd Jan 2025')
    
    // Test 23rd (3rd suffix, but not a teen)
    expect(formatDate('2025-01-23')).toContain('23rd Jan 2025')
  })
  
  it('handles different months correctly', () => {
    expect(formatDate('2025-02-15')).toContain('15th Feb 2025')
    expect(formatDate('2025-03-15')).toContain('15th Mar 2025')
    expect(formatDate('2025-12-25')).toContain('25th Dec 2025')
  })
  
  it('handles different years correctly', () => {
    expect(formatDate('2024-01-15')).toContain('15th Jan 2024')
    expect(formatDate('2026-01-15')).toContain('15th Jan 2026')
  })
})