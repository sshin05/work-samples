module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended-legacy',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'jest', 'sonarjs', 'local-rules'],
  rules: {
    'local-rules/no-next-router': 'error',
    'local-rules/no-test-ids': 'error',

    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 4],

    'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
    'react/jsx-boolean-value': ['error'],

    'import/no-duplicates': ['error', { 'prefer-inline': true }],

    // name a variable with `_` at beginning, `ref`, and it won't be flagged; also try-cathes evidently have a different pattern name; TMYK
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_.*|^ref$',
        argsIgnorePattern: '^_.*|^ref$',
        caughtErrorsIgnorePattern: '^_.*'
      }
    ],

    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false
      }
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',

    // the asset-handler already leverages our AWS for img optimization, an extra layer of abstraction + the necessary network requests actually slows performance
    '@next/next/no-img-element': 'off',

    'jest/expect-expect': 'error',
    'jest/valid-expect': 'error',

    /* sonarjs specific rules which would have been a pain to leave enabled */
    'sonarjs/cognitive-complexity': ['warn', 20], // making this 20 vs the 15 default for now
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-immediate-return': 'off',
    'sonarjs/no-nested-conditional': 'off',
    'sonarjs/no-ignored-exceptions': 'off',
    'sonarjs/no-unused-vars': 'off',
    'sonarjs/table-header': 'off',
    'sonarjs/unused-import': 'off',
    'sonarjs/prefer-regexp-exec': 'off',
    'sonarjs/no-redundant-jump': 'off',
    'sonarjs/prefer-single-boolean-return': 'off',
    'sonarjs/no-small-switch': 'off',
    'sonarjs/no-selector-parameter': 'off',
    'sonarjs/prefer-read-only-props': 'off', // had a bunch of failures here; though I did find that `sort()` was mutating incoming props, so those are now fixed
    'sonarjs/function-return-type': 'off',
    'sonarjs/no-skipped-tests': 'off', // we may want this enabled in the future

    /* sonarjs lowinger severity rules to match requirements */
    'sonarjs/deprecation': 'off',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-empty-character-class': 'warn',
    'sonarjs/regex-complexity': 'warn',
    'sonarjs/slow-regex': 'warn',
    'sonarjs/pseudo-random': 'warn',
    'sonarjs/no-dead-store': 'warn',
    'sonarjs/todo-tag': 'off',
    'sonarjs/concise-regex': 'warn',
    'sonarjs/class-name': 'warn',
    'sonarjs/prefer-promise-shorthand': 'warn',
    'sonarjs/hashing': 'warn',
    'sonarjs/jsx-no-leaked-render': 'warn'
  },

  overrides: [
    {
      files: [
        './src/app/mp/\\[missionPartnerId\\]/cohorts/\\[groupId\\]/components/Group/Group.tsx'
      ],
      rules: {
        'sonarjs/cognitive-complexity': 'off'
      }
    },
    {
      files: ['**/*.test.*'],
      rules: {
        'react/jsx-boolean-value': 'off',
        'intreact/display-name': 'off'
      }
    },
    // THENABLE doesn't work for non-ts parser (see our parserOptions at the top);
    // resetting to default parser for js files.  (Need to also disable thenable, which breaks with espree)
    {
      files: ['*.js', '*.jsx'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      rules: {
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
      }
    }
  ]
};
