import { describe, test, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Logo Component', () => {
  // Read the component file directly
  const componentPath = path.resolve('src/components/logo.astro')
  const componentCode = fs.readFileSync(componentPath, 'utf-8')

  test('has correct structure', () => {
    // Test the overall structure
    expect(componentCode).toContain('<div class="h-10 w-auto">')
    expect(componentCode).toContain('<svg')
    expect(componentCode).toContain('</svg>')
    expect(componentCode).toContain('</div>')
  })

  test('has required SVG attributes', () => {
    // Test SVG attributes
    expect(componentCode).toContain('width="235"')
    expect(componentCode).toContain('height="47"')
    expect(componentCode).toContain('viewBox="0 0 235 47"')
    expect(componentCode).toContain('fill="none"')
    expect(componentCode).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(componentCode).toContain('class="h-auto w-full"')
  })

  test('contains path elements for the logo', () => {
    // Test for SVG paths by counting them
    const pathMatches = componentCode.match(/<path/g)
    expect(pathMatches).not.toBeNull()
    expect(pathMatches.length).toBeGreaterThanOrEqual(6) // The logo has at least 6 paths

    // Test that each path has a class="letter" attribute
    const letterClassMatches = componentCode.match(/class="letter"/g)
    expect(letterClassMatches).not.toBeNull()
    expect(letterClassMatches.length).toBeGreaterThanOrEqual(6)
  })

  test('has correct styling', () => {
    // Test CSS styling
    expect(componentCode).toContain('<style>')
    expect(componentCode).toContain('.letter {')
    expect(componentCode).toContain('fill: var(--color-sky-200);')
    expect(componentCode).toContain('</style>')
  })
})
