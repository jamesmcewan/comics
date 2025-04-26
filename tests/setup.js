import { expect, afterEach } from 'vitest'
// import { cleanup } from '@testing-library/dom'
import '@testing-library/jest-dom'

// // Clean up after each test
// afterEach(() => {
//   cleanup()
// })

// Extend expect with jest-dom matchers
Object.defineProperty(globalThis, 'expect', { value: expect })
