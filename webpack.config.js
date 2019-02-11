const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
    let path = require('path');
    let clientPath = path.resolve(__dirname, 'src/main/client');
    let outputPath = path.resolve(__dirname, (env == 'production') ? 'src/main/resources/static' : 'out');

    return {
        mode: env,
        devtool: env == 'production' ? false : 'cheap-module-eval-source-map',
        entry: {
            app: clientPath + '/index.js'
        },
        output: {
            path: outputPath,
            filename: '[name].js',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new TerserPlugin(),
                new OptimizeCssAssetsPlugin()
            ]
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'env' ]
                    }
                }]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 1024
                    }
                }]
            }, {
                test: /\.(css)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            }]
        },
        devServer: {
            contentBase: outputPath,
            publicPath: '/',
            host: '127.0.0.1',
            port: 8081,
            proxy: {
                '**': 'http://127.0.0.1:8080'
            },
            inline: true,
            hot: false
        },
        plugins: [
            new MiniCssExtractPlugin({
                path: outputPath,
                filename: '[name].css'
            })
        ]
    }
}