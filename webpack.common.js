module.exports = {
    output: {
        filename: 'appBundle.js',
        path: `${__dirname}/public/`,
        publicPath: '/'
    },
    stats: 'normal',
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        // es-lint loader prevents compiling
        // {
        //   enforce: 'pre',
        //   test: /\.(js|jsx)$/,
        //   exclude: /node_modules/,
        //   use: 'eslint-loader'
        // },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        },
        {
          test: /\.txt$/,
          use: 'raw-loader'
        }
      ]
    },
};