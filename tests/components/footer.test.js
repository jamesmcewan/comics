import { describe, test, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Footer Component', () => {
  // Read the component file directly
  const componentPath = path.resolve('src/components/footer.astro')
  const componentCode = fs.readFileSync(componentPath, 'utf-8')

  test('imports necessary components', () => {
    // Check that the MightyDinosaur component is imported
    expect(componentCode).toContain('import MightyDinosaur from')
  })

  test('has correct structure', () => {
    // Test the overall structure
    expect(componentCode).toContain('<footer class="bg-sky-900">')
    expect(componentCode).toContain('</footer>')

    // Test for the container div
    expect(componentCode).toContain(
      '<div class="mx-auto max-w-7xl p-2 sm:p-6 lg:p-8">',
    )
  })

  test('contains the credit text', () => {
    // Test that the credit text is present
    expect(componentCode).toContain(
      '<p class="font-inter font-light text-sky-100">',
    )
    expect(componentCode).toContain('Comics data provided by Metron')
  })

  test('includes the MightyDinosaur component', () => {
    // Test that the MightyDinosaur component is used
    expect(componentCode).toContain('<div class="w-40 py-2">')
    expect(componentCode).toContain('<MightyDinosaur />')
  })
})
