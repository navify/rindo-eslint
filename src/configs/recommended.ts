export default {
  plugins: [
    "react"
  ],
  extends: [
    "plugin:@rindo/base",
  ],
  rules: {
    '@rindo/strict-boolean-conditions': 1,
    '@rindo/ban-exported-const-enums': 2,
    // '@rindo/ban-side-effects': 2,
    '@rindo/strict-mutable': 2,
    '@rindo/decorators-style': [
      'error', {
        prop: 'inline',
        state: 'inline',
        element: 'inline',
        event: 'inline',
        method: 'multiline',
        watch: 'multiline',
        listen: 'multiline'
      }
    ],
    '@rindo/own-methods-must-be-private': 1,
    '@rindo/own-props-must-be-private': 1,
    '@rindo/dependency-suggestions': 1,
    '@rindo/required-jsdoc': 1,
    "react/jsx-no-bind": [1, {
      "ignoreRefs": true
    }]
  }
};
