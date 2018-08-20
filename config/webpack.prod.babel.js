import webpack from 'webpack';
import { resolve, relative, join } from 'path';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common.babel';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const extractScss = new ExtractTextPlugin('[name].[chunkhash].css', { allowChunks: true });
const ENV = (process.env.NODE_ENV = process.env.ENV = 'production');

const prodConfig = webpackMerge(commonConfig, {
    devtool: '',

    output: {
        path: resolve(__dirname, '..', 'public'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractScss.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            hmr: false,
                        },
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                                importLoaders: 2,
                                minimize: true,
                            },
                        },

                        'sass-loader',
                    ],
                }),
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0'],
                        code: true,
                        comments: true,
                        cacheDirectory: true,
                        babelrc: false,
                    },
                },
            },
        ],
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
        }),
        extractScss,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                let chunkName = chunk.name.split('-')[0];
                return chunkName;
            }

            let result = chunk.mapModules(m => {
                return relative(m.context, m.request);
            });

            result.join('_');
            return result;
        }),

        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify(ENV),
            },
        }),
    ],
});

export default prodConfig;
