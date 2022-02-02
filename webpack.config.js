const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = (env) => {
  const CSSExtract = new ExtractTextPlugin('styles.css')
  const isProduction = env === 'production'
  return {
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
    devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public')
    }
  }
}