import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default tseslint.config(
  // Base JS recommended rules
  eslint.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Prettier integration (disables style rules that conflict with prettier)
  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2023,
      },
    },
    rules: {
      // Prettier as an ESLint rule
      'prettier/prettier': 'warn',

      // TypeScript-specific relaxations for NestJS patterns
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-require-imports': 'off',

      // NestJS uses decorators and interfaces extensively
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'warn',

      // Allow empty constructors (common in NestJS)
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },

  // Ignore generated, built, and config files
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'prisma/generated/**',
      'coverage/**',
      'scripts/**',
      '*.config.mjs',
      '*.config.js',
      '*.config.cjs',
    ],
  },
);
