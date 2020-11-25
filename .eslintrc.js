module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['react-app', 'airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
