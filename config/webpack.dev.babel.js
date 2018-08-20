import webpack from 'webpack';
import { resolve } from 'path';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common.babel';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractScss = new ExtractTextPlugin('stylezz.css', { allowChunks: true });
const extractCss = new ExtractTextPlugin('styles.css');

const devConfig = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',

    output: {
        path: resolve(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0', 'react-hmre'],
                        code: true,
                        comments: true,
                        cacheDirectory: true,
                        babelrc: false,
                    },
                },
            },
            {
                test: /\.css$/,
                use: extractCss.extract(['css-loader']),
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },

    plugins: [
        extractCss,
        extractScss,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new webpack.NamedModulesPlugin(),
    ],

    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8090,
        hot: true,
    },
});

export default devConfig;
