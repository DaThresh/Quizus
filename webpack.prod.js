const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    entry: [
        './client/index.jsx'
    ],
    devtool: 'cheap-module-source-map',
});