import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import eslintPluginImportHelpers from 'eslint-plugin-import-helpers'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',  // or specify a specific version
      sourceType: 'module',
      parser: tsEslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
        allowAutomaticSingleRunInference: true,
        noEmitOnError: false,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    },
    plugins: {
      prettier,
      import: eslintPluginImport,
      'import-helpers': eslintPluginImportHelpers,
      'unused-imports': eslintPluginUnusedImports,
      react,
      unicorn: eslintPluginUnicorn,
      '@typescript-eslint': tsEslint
    },
    settings: {
      react: {
        version: 'detect', // Detect React version automatically
      },
    },
    rules: {
      // General JavaScript/TypeScript Rules
      eqeqeq: ['error', 'always'],
      'func-style': ['error', 'expression'],
      'id-length': ['error', { min: 3, exceptions: ['id', 'i', '_', 'x', 'y', 'to', 't', 'gt', 'lt', 'eq', 'in'] }],
      'logical-assignment-operators': ['error', 'always'],
      'max-classes-per-file': ['error', 1],
      'no-alert': 'error',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-magic-numbers': ['error', { ignore: [0, 1], enforceConst: true, ignoreDefaultValues: true, ignoreClassFieldInitialValues: true }],
      'no-multi-assign': 'error',
      'no-loop-func': 'error',
      'no-negated-condition': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'object-shorthand': 'error',
      'operator-assignment': ['error', 'always'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      radix: 'error',
      'require-await': 'error',
      'no-console': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['multiline-const', 'multiline-let'], next: 'return' },
        { blankLine: 'always', prev: '*', next: 'class' },
        { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'do', 'switch', 'try'] },
        { blankLine: 'always', prev: ['multiline-const', 'multiline-let'], next: ['*'] },
        { blankLine: 'always', prev: ['*'], next: ['multiline-const', 'multiline-let'] },
        { blankLine: 'always', prev: ['import'], next: ['const', 'let'] },
        { blankLine: 'always', prev: ['import'], next: ['export'] },
      ],
      'no-restricted-imports': [
        'error',
        { paths: [{ name: 'dayjs', importNames: ['default'], message: 'Use the createDayjs function instead.' }] },
      ],
      'prettier/prettier': 'error',

      // TypeScript Rules
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['signature', 'static-initialization', 'constructor', 'field', 'accessor', 'get', 'set', 'method'] },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'classMethod', format: ['camelCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
        { selector: 'method', format: ['camelCase'] },
        { selector: 'parameter', format: ['camelCase'] },
        { selector: 'classProperty', format: ['camelCase'] },
        { selector: 'typeProperty', format: ['camelCase', 'snake_case'] },
      ],
      // Import Rules
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true, ignoreMemberSort: false, memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'], allowSeparatedGroups: false },
      ],
      'import-helpers/order-imports': [
        'error',
        {
          newlinesBetween: 'always',
          groups: [
            ['/^reflect/'],
            ['module', '/date-fns/', '/date-fns-tz/', '/express/', '/puppeteer/'],
            '/@\\/config/',
            '/@\\/handlers/',
            '/@\\/controllers/',
            '/@\\/domain/',
            '/@\\/utils/',
            '/@\\/ui/',
            '/^@/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],

      // Unicorn Rules
      'unicorn/filename-case': 'off',
      'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-null': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'max-classes-per-file': 'off',
      'no-magic-numbers': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'padding-line-between-statements': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'unicorn/no-null': 'off',
      'unicorn/consistent-function-scoping': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'classMethod', format: ['camelCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
        { selector: 'method', format: ['camelCase'] },
        { selector: 'parameter', format: ['camelCase'] },
        { selector: 'classProperty', format: ['camelCase'] },
        { selector: 'typeProperty', format: ['camelCase'] },
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-props-no-spread-multi': ['error'],
      'react/jsx-sort-props': ['error'],
      'react/jsx-uses-vars': ['error'],
      'react/no-children-prop': ['error'],
      'react/self-closing-comp': ['error'],
    },
  },
];