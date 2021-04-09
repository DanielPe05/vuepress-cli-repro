module.exports = {
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error'
  }
}
