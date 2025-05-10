import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, vi, afterEach } from 'vitest'
import { TextEncoder, TextDecoder } from 'util'

// Set up globals for Node.js environment
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Polyfill fetch if needed
if (typeof global.fetch === 'undefined') {
  global.fetch = vi.fn()
}

// Set up window properties if needed
if (typeof global.window === 'undefined') {
  global.window = {}
}

// Utility function to create and cache container instances
let containerInstance = null

/**
 * Get an Astro Container instance for testing
 * @returns {Promise<import('astro/container').AstroContainer>}
 */
export async function getContainer() {
  if (!containerInstance) {
    containerInstance = await AstroContainer.create()
  }
  return containerInstance
}

/**
 * Render an Astro component to string for testing
 * @param {any} Component - The Astro component to render
 * @param {Object} props - Props to pass to the component
 * @param {Object} options - Additional options
 * @returns {Promise<string>} - The rendered HTML
 */
export async function renderComponent(Component, props = {}, options = {}) {
  const container = await getContainer()
  return container.renderToString(Component, props, options)
}

// Clean up after tests
afterEach(() => {
  // Reset mocks
  vi.restoreAllMocks()
})

// Export common testing utilities
export { expect }
