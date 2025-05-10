import { describe, test, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('HeadMeta Component', () => {
  // Read the component file directly
  const componentPath = path.resolve('src/components/head-meta.astro')
  const componentCode = fs.readFileSync(componentPath, 'utf-8')

  test('imports necessary components and styles', () => {
    // Check that the ClientRouter is imported
    expect(componentCode).toContain(
      "import { ClientRouter } from 'astro:transitions'",
    )
    // Check that the global styles are imported
    expect(componentCode).toContain("import '../styles/global.css'")
  })

  test('has correct basic structure', () => {
    // Test the overall structure
    expect(componentCode).toContain('<head>')
    expect(componentCode).toContain('</head>')
  })

  test('contains all required meta tags', () => {
    // Test for required meta tags
    expect(componentCode).toContain('<meta charset="utf-8" />')
    expect(componentCode).toContain(
      '<meta name="viewport" content="width=device-width" />',
    )
    expect(componentCode).toContain(
      '<meta name="generator" content={Astro.generator} />',
    )
  })

  test('includes favicon link', () => {
    expect(componentCode).toContain(
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    )
  })

  test('has page title', () => {
    expect(componentCode).toContain('<title>Comics</title>')
  })

  test('includes ClientRouter component', () => {
    expect(componentCode).toContain('<ClientRouter />')
  })
})
