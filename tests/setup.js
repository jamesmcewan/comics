import { expect } from 'vitest'
import '@testing-library/jest-dom'

// Set up required Node.js globals for Astro Container API testing
import { TextEncoder, TextDecoder } from 'node:util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Add any other required globals
if (typeof globalThis.fetch === 'undefined') {
  // Polyfill fetch if needed
  global.fetch = vi.fn()
}

Object.defineProperty(globalThis, 'expect', { value: expect })
