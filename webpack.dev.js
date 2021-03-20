const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './src/client/index.js',
    ],
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        publicPath: '/',
    }
});