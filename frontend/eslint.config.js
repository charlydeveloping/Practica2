import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Jest tests: provide jest environment for test files
  {
    files: ['**/__tests__/**', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      env: { jest: true },
    },
  },
  // Cypress config: declare plugin globals used by cypress
  {
    files: ['cypress.config.js'],
    languageOptions: {
      globals: { on: 'readonly', config: 'readonly' },
    },
  },
])
