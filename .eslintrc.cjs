module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-compiler'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-compiler/react-compiler': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
