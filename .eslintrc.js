module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx'] }],
    'no-plusplus': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'no-param-reassign': ['error', { props: false }],
    'react/destructuring-assignment': ['disabled'],
    'react/prop-types': ['disabled'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-unresolved': ['disabled'],
    'import/extensions': ['disabled'],
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': ['error', 'after'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*config.js', '*setupTests.js'],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  globals: {
    React: true,
    ReactDOM: true,
  },
};
