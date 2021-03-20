const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [merge(common, {
    mode: 'production',
}),{
    mode: 'production',
    target: 'node',
    entry: {
        server: './src/index.js'
    },
    externals: [nodeExternals()],
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "package.json"},
            ],
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
}];