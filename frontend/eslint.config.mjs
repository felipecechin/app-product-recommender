import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
  globalIgnores(['tailwind.config.js', 'postcss.config.js']),
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      react,
      prettier
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off'
    }
  }
]);
