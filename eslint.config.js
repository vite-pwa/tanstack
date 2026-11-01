import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      '**/.output/**',
      '**/.tanstack/**',
      '**/node_modules/**',
      'pnpm-workspace.yaml',
      // examples with their own linting config: we must add the lint
      '**/examples/**/*',
    ],
  },
  {
    files: ['**/*.md/**'],
    rules: {
      'ts/no-this-alias': 'off',
      'ts/no-unused-vars': 'off',
      'n/handle-callback-err': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      'no-labels': 'off',
    },
  },
  {
    files: [
      '**/*.ts',
    ],
    rules: {
      'ts/no-unused-vars': 'off',
    },
  },
  {
    // it detects nested arrays wrongly
    files: ['.github/labeler.yml'],
    rules: {
      'yaml/indent': 'off',
    },
  },
)
