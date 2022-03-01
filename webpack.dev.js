const {merge} = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');

const localProxy = {
    target: {
        host: 'localhost',
        protocol: 'http:',
        port: 8081
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        static: [path.join(__dirname, 'public'), __dirname],
        hot: true,
        proxy: {
            '/api': {...localProxy},
            '/images/': {...localProxy},
            '/intranet': {...localProxy},
            '/pm-images': {...localProxy},
        },
        historyApiFallback: {
            rewrites: [
                {from: /^apps\/image-store/, to: '/'}
            ]
        },
        watchFiles: ['src/**/*'],
    },
    devtool: 'eval-source-map',
});
