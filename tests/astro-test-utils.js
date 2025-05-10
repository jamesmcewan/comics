import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * Utility functions for testing Astro components without rendering
 */

/**
 * Extracts the props from an Astro component
 * @param {Function} Component - The Astro component
 * @param {Object} props - The props passed to the component
 * @returns {Object} The props that would be received by the component
 */
export function extractProps(Component, props = {}) {
  // Mock Astro global
  const mockAstro = { props }

  // Create a context to run the component's setup code
  const context = {
    Astro: mockAstro,
    Fragment: () => {},
    $$result: { styles: new Set() },
  }

  // Call the component function to extract what it would use
  try {
    Component.call(context)
  } catch (error) {
    // Ignore rendering errors
  }

  return {
    props: mockAstro.props,
    extractedValues: context,
  }
}

/**
 * Checks that a component imports another component
 * @param {string} componentCode - The raw component code as a string
 * @param {string} importName - The name of the import to check for
 * @param {string} [importPath] - Optional: the path that should be imported from
 * @returns {boolean} Whether the component imports the specified module
 */
export function hasImport(componentCode, importName, importPath = null) {
  // Check for named import
  const namedPattern = new RegExp(
    `import.*${importName}.*from\\s+['"]${importPath ? importPath : '.*'}['"]`,
  )

  // Check for default import
  const defaultPattern = new RegExp(
    `import\\s+${importName}\\s+from\\s+['"]${importPath ? importPath : '.*'}['"]`,
  )

  return namedPattern.test(componentCode) || defaultPattern.test(componentCode)
}

/**
 * Mocks a component for testing parent components that use it
 * @param {string} componentPath - The import path of the component to mock
 * @param {Function} mockImplementation - The mock implementation function
 */
export function mockComponent(componentPath, mockImplementation = () => '') {
  vi.mock(componentPath, () => ({
    default: vi.fn(mockImplementation),
  }))
}

/**
 * Helper function to reset all mocks after tests
 */
export function resetMocks() {
  vi.resetAllMocks()
}

// Export common testing utilities
export { describe, it, expect, vi, beforeEach, afterEach }
