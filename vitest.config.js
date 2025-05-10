import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    deps: {
      // Ensure Astro components can be imported in tests
      inline: [/astro/],
    },
  },
})
