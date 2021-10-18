import paths from './config/paths'

export default {
  root: true,
  env: {
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    jest: {
      version: 'latest'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    // 'prettier/prettier',
    'prettier/react'
    // 'plugin:jest/recommended'
  ],
  globals: {
    __BROWSER__: true,
    __SERVER__: true
  },
  plugins: ['prettier', 'react'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^(_|action)' }],
    'import/no-named-as-default-member': 0,
    'consistent-return': 0,
    'react/require-default-props': 0,
    'react/default-props-match-prop-types': 0,
    'react/display-name': [0, { ignoreTranspilerName: false }],
    'prettier/prettier': 2,
    'comma-dangle': [2, 'never'],
    'react/jsx-filename-extension': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'no-empty': [2, { allowEmptyCatch: true }],
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'no-underscore-dangle': [0, { allow: ['__data'] }],
    'import/no-extraneous-dependencies': 0,
    'max-len': [
      2,
      {
        tabWidth: 2,
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: '^\\s*import type.*'
      }
    ],
    'no-param-reassign': 0,
    'react/jsx-props-no-spreading': 0
  },
  overrides: [
    {
      files: ['./src/**/*.{ts,tsx}'],
      env: {
        jest: true
      },
      settings: {
        react: {
          version: 'detect'
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
          typescript: {
            project: './tsconfig.json'
          },
          node: {
            extensions: ['.ts', '.tsx']
          }
        }
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
          legacyDecorators: true
        }
      },
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier'
      ],
      rules: {
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
            tsx: 'never',
            js: 'never',
            jsx: 'never'
          }
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react/prop-types': 0
      }
    }
  ]
}
