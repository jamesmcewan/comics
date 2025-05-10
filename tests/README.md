# Astro Component Testing Guide

This directory contains tests for the Astro components in the Comics project. This guide explains how to write and run tests for Astro components.

## Testing Approach

We're using a static analysis approach for testing Astro components. Instead of rendering the components (which can be complex with the Astro Container API), we examine the component source code directly to verify:

- Component structure
- Imports and dependencies
- Props interfaces
- Conditional rendering logic
- Styling classes
- Component composition

This approach allows for fast, reliable tests without the environment compatibility issues that can come from server-side rendering in a test environment.

## Writing Tests

### Basic Component Test

Here's a simple test for a component:

```javascript
import { describe, test, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('MyComponent', () => {
  // Read the component file directly
  const componentPath = path.resolve('src/components/my-component.astro')
  const componentCode = fs.readFileSync(componentPath, 'utf-8')

  test('has correct structure', () => {
    expect(componentCode).toContain('<div class="my-class">')
  })

  test('imports necessary dependencies', () => {
    expect(componentCode).toContain('import SomeComponent from')
  })
})
```

### Testing Components with Props

For components that use props:

```javascript
test('defines correct props interface', () => {
  expect(componentCode).toContain('export interface Props {')
  expect(componentCode).toContain('myProp: string')
})

test('extracts props correctly', () => {
  expect(componentCode).toContain('const { myProp } = Astro.props')
})
```

### Testing Conditional Rendering

For components with conditional rendering:

```javascript
test('conditionally renders section', () => {
  expect(componentCode).toContain('someCondition && (')
  expect(componentCode).toContain('<div class="conditional-section">')
})
```

## Running Tests

Run all component tests:

```bash
bun run test -- tests/components/
```

Run a specific test:

```bash
bun run test -- tests/components/my-component.test.js
```

Run tests in watch mode:

```bash
bun run test:watch -- tests/components/
```

## Test Structure

The test files are organized to mirror the component structure:

```
tests/
├── components/          # Component tests
│   ├── logo.test.js
│   ├── footer.test.js
│   └── ...
├── setup.js            # Test setup file
└── README.md           # This guide
```

## Future Enhancements

If you need to test component rendering more thoroughly, consider:

1. Implementing the Astro Container API when environment issues are resolved
2. Using DOM testing approaches for client components
3. Writing end-to-end tests for fully rendered pages

## Best Practices

1. Test the structure, not the implementation details
2. Focus on verifying important class names, attributes, and content
3. Ensure conditional logic is properly tested
4. Keep tests focused and readable
5. Add tests whenever creating or modifying components
