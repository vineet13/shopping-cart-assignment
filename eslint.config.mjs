import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
  },
];
