import { describe, test, expect, vi } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('ComicDetails Component', () => {
  // Read the component file directly
  const componentPath = path.resolve('src/components/comic-details.astro')
  const componentCode = fs.readFileSync(componentPath, 'utf-8')

  test('imports necessary components', () => {
    // Check that the Creators component is imported
    expect(componentCode).toContain("import Creators from './creators.astro'")
  })

  test('defines correct props interface', () => {
    // Check that the component defines the right props interface
    expect(componentCode).toContain('export interface Props {')
    expect(componentCode).toContain('comic: any')
  })

  test('extracts props correctly', () => {
    // Check that the component extracts props properly
    expect(componentCode).toContain('const { comic } = Astro.props')
  })

  test('has main container structure', () => {
    // Test the overall structure
    expect(componentCode).toContain(
      '<div class="overflow-hidden rounded-lg bg-slate-200 shadow-lg">',
    )
    expect(componentCode).toContain('<div class="md:flex">')
  })

  test('renders the comic image correctly', () => {
    // Test image rendering
    expect(componentCode).toContain('<img')
    expect(componentCode).toContain('src={comic.image}')
    expect(componentCode).toContain('alt={`Cover for ${comic.issue}`}')
    expect(componentCode).toContain('class="h-auto w-full rounded-lg md:w-96"')
  })

  test('renders comic title correctly', () => {
    // Test title rendering
    expect(componentCode).toContain(
      '<h1 class="font-inter mb-4 text-2xl font-bold text-slate-900">',
    )
    expect(componentCode).toContain(
      '{comic.series.name} ({comic.series.year_began}) #{comic.number}',
    )
  })

  test('conditionally renders description section', () => {
    // Check for conditional rendering of description
    expect(componentCode).toContain('comic.desc && (')
    expect(componentCode).toContain(
      '<h2 class="font-inter mb-2 text-lg font-medium text-slate-800">',
    )
    expect(componentCode).toContain('Summary')
    expect(componentCode).toContain('set:html={comic.desc}')
  })

  test('renders metadata in a definition list', () => {
    // Test metadata rendering
    expect(componentCode).toContain(
      '<dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">',
    )

    // Check for conditional series information
    expect(componentCode).toContain('comic.series && (')
    expect(componentCode).toContain(
      '<dt class="font-medium text-slate-700">Series</dt>',
    )

    // Check for conditional volume information
    expect(componentCode).toContain('comic.volume && (')
    expect(componentCode).toContain(
      '<dt class="font-medium text-slate-700">Volume</dt>',
    )

    // Check for conditional cover date
    expect(componentCode).toContain('comic.cover_date && (')
    expect(componentCode).toContain(
      '<dt class="font-medium text-slate-700">Cover Date</dt>',
    )

    // Check for conditional store date
    expect(componentCode).toContain('comic.store_date && (')
    expect(componentCode).toContain(
      '<dt class="font-medium text-slate-700">Store Date</dt>',
    )

    // Check for conditional price
    expect(componentCode).toContain('comic.price && (')
    expect(componentCode).toContain(
      '<dt class="font-medium text-slate-700">Price</dt>',
    )

    // Check for conditional SKU
    expect(componentCode).toContain('comic.sku && (')
    expect(componentCode).toContain(
      '<dt class="font-medium text-slate-700">SKU</dt>',
    )

    // Check for conditional publisher
    expect(componentCode).toContain('comic.publisher && (')
    expect(componentCode).toContain(
      '<dt class="font-medium text-slate-700">Publisher</dt>',
    )
  })

  test('conditionally renders creators component', () => {
    // Test conditional rendering of creators component
    expect(componentCode).toContain(
      'comic.credits && comic.credits.length > 0 && (',
    )
    expect(componentCode).toContain('<Creators creators={comic.credits} />')
  })
})
