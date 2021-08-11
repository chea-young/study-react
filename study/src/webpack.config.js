const path = require('path')

module.exports = ({platform}, defaults) => ({
  ...defaults,
  entry: './index.js',
  /* ... */
  resolve: {
    ...defaults.resolve,
    alias: {
       ...defaults.resolve.alias,
      react: path.join(__dirname, 'node_modules/react'),
      'react-native': path.join(__dirname, 'node_modules/react-native'),
    }
  }
})