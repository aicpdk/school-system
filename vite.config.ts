import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['text', 'html'],
    coverage: {
      all: true,
      exclude: ['test', 'config'],
    },
  },
});
