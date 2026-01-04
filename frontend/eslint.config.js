import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignore build artifacts
  { ignores: ['dist'] },
  
  // Base recommended JS config
  js.configs.recommended,
  
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Load recommended rules for hooks
      ...reactHooks.configs.recommended.rules,
      
      // DISABLED: This removes the yellow warnings for component exports
      'react-refresh/only-export-components': 'off',
      
      // DISABLED: This removes the yellow warnings for unused variables (meds, res, etc.)
      'no-unused-vars': 'off',
      
      // Keep this as an error to catch actual undefined variables that would crash the app
      'no-undef': 'error',
    },
  },
]