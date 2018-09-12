const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: './src/popup.js',
        content: './src/content.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, './src')],
                use: 'babel-loader'
            },
            {
                test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                use: 'file-loader?limit=100000'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?limit=100000',
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            optipng: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // create popup.html from template and inject styles and script bundles
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['popup'],
            filename: 'popup.html',
            template: './src/popup.html'
        }),
        // copy extension manifest and icons
        new CopyWebpackPlugin([
            {from: './src/manifest.json'},
            {context: './src/assets', from: 'icon-**', to: 'assets'}
        ])
    ]
};
