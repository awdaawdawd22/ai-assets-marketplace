const nextPlugin = require('@next/eslint-plugin-next')

module.exports = [
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'out/**', '**/*.css', '**/*.svg'],
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  nextPlugin.configs['core-web-vitals'],
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]
