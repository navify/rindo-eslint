export default {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          'jsx': true
        }
      },
      env: {
        es2020: true,
        browser: true,
      },
      plugins: [
        '@rindo'
      ],
      rules: {
        '@rindo/async-methods': 2,
        '@rindo/ban-prefix': [2, ['rindo']],
        '@rindo/decorators-context': 2,
        '@rindo/element-type': 2,
        '@rindo/host-data-deprecated': 2,
        '@rindo/methods-must-be-public': 2,
        '@rindo/no-unused-watch': 2,
        '@rindo/prefer-vdom-listener': 2,
        '@rindo/props-must-be-public': 2,
        '@rindo/render-returns-host': 2,
        '@rindo/reserved-member-names': 2,
        '@rindo/single-export': 2,
      }
    }
  ],
  settings: {
    "react": {
      // intentionally fill the version field with an invalid semver string. this appears to remove the error/warning
      // emitted to the console when this key/value pair is not in place, but does not tie us to a version of React,
      // even superficially
      "version": "rindo-maintainers-put-an-invalid-version-intentionally-if-this-errors-please-raise-an-issue-https://github.com/navify/rindo-eslint/issues",
    }
  },
};
