import path from 'node:path';
import * as process from "node:process";

export default {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                chums: {
                    test: /[\\/]common-components[\\/]/,
                    name: 'chums',
                    chunks: 'all',
                },
            }
        }
    },
    output: {
        path: path.join(process.cwd(), 'public/js'),
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        publicPath: '/',
    },
    target: ['web', 'es6'],
    watch: false,
}
