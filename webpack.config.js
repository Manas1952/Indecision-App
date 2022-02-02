const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CSSExtract = new ExtractTextPlugin('styles.css')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: CSSExtract.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true // will give sourceMappingURL(you can see by selecting any element in devtool and see it's styles, it would show you something like abc.css)
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }]
  },
  plugins: [
    CSSExtract
  ],
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}