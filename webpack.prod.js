const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    entry: [
        './client/index.jsx'
    ],
    devtool: 'cheap-module-source-map',
    plugins: [new webpack.DefinePlugin({
                'ENVIRONMENT': JSON.stringify('production'),
              })]
});