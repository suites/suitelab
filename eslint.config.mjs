import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import parser from '@typescript-eslint/parser';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';


const jsRules = {
  'no-console': 0,
  'no-irregular-whitespace': 0,
};

const tsRules = {
  '@typescript-eslint/ban-ts-comment': 0,
  '@typescript-eslint/no-explicit-any': 0,
  '@typescript-eslint/no-unused-vars': 0,
  '@typescript-eslint/no-non-null-assertion': 0,
  '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
  '@typescript-eslint/no-unused-expressions': 0,
};

const prettierRules = {
  'prettier/prettier': 'warn',
};

export default [
  js.configs.recommended,
  { rules: jsRules },
  ...ts.configs.recommended,
  { rules: tsRules },
  prettier,
  { rules: prettierRules },
  { ignores: ['node_modules', '.cache', 'public'] },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error',
    },
  },
];
