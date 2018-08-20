import webpack from 'webpack';
import { resolve } from 'path';

const commonConfig = {
    entry: {
        main: ['babel-polyfill', './src/index.jsx'],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            components: resolve('src/components'),
            pages: resolve('src/pages'),
            store: resolve('src/store'),
            routes: resolve('src/routes'),
        },
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['manifest'],
        }),
    ],
};

export default commonConfig;
