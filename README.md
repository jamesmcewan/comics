# Comics Release Tracker

A web application that displays weekly comic book releases from various publishers. It automatically shows new comics on "New Comic Book Day" (Wednesday) with navigation to view upcoming and past releases.

## Features

- Displays comic book covers and issue information
- Automatically determines the current, next, and previous New Comic Book Days
- Responsive design for desktop and mobile
- Fetches data from the Metron API

## Technology Stack

- Astro.js for static site generation
- TypeScript for type-safe code
- Tailwind CSS for styling
- Metron API for comic book data

## Development

### Prerequisites

- Node.js (v18+) or Bun runtime
- Metron API credentials

### Setup

1. Clone the repository
2. Install dependencies: `bun install`
3. Set up environment variables:
   - `USERNAME`: Metron API username
   - `PASSWORD`: Metron API password

### Running Locally

```bash
bun dev
```

### Building for Production

```bash
bun build
```

## Testing

The project uses Vitest for unit testing. The tests focus on utility functions and data handling.

```bash
# Run tests
bun test

# Run tests in watch mode
bun test:watch

# Generate coverage report
bun test:coverage
```
