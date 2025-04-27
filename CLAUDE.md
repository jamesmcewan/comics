# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development

- Build: `bun run build`
- Dev server: `bun run dev` or `bun run start`
- Preview: `bun run preview`

## Testing

- Run all tests: `bun run test`
- Watch mode: `bun run test:watch`
- Run single test: `bun run test -- -t 'test name'`

## Code Quality

- Lint check: `bun run lint:check`
- Lint fix: `bun run lint:fix`
- Format check: `bun run format:check`
- Format write: `bun run format:write`

## Code Style

- TypeScript with strict types
- No semicolons at line endings
- Single quotes for strings
- Trailing commas in multi-line objects/arrays
- Function names use camelCase
- Components use PascalCase
- Error handling via explicit try/catch blocks
- Import order: external libraries first, then internal modules
