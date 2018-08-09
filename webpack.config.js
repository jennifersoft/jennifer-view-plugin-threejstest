const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let path = require('path')
let clientPath = path.resolve(__dirname, 'src/main/client')
let outputPath = path.resolve(__dirname, 'out')

module.exports = (env) => {
    let minimizer = [];

    if(env == 'production') {
        outputPath = path.resolve(__dirname, 'src/main/resources/static')

        minimizer.push(new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }))

        minimizer.push(new OptimizeCSSAssetsPlugin({}))
    }

    return {
        mode: env,
        entry: {
            vendors: [ 'three' ],
            app: clientPath + '/index.js'
        },
        output: {
            path: outputPath,
            filename: '[name].js',
        },
        externals: {
            jquery: 'jQuery',
            moment: 'moment',
            lodash: '_',
            'juijs': 'jui',
            'juijs-ui': 'jui',
            'juijs-grid': 'jui',
            'juijs-chart': 'jui'
        },
        optimization: {
            namedModules: true,
            runtimeChunk: 'single',
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
            minimizer: minimizer
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', {modules: false}]
                        ]
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
                test: /\.(scss|css)$/,
                use: [
                    env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: {
                            minimize: {
                                safe: true
                            }
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [],
                            sourceMap: true
                        },
                    }, {
                        loader: "sass-loader",
                        options: {}
                    }
                ]
            }]
        },
        devServer: {
            hot: false,
            inline: true,
            contentBase: outputPath,
            historyApiFallback: true,
            compress: true,
            publicPath: '/',
            host: '127.0.0.1',
            port: 8081,
            proxy: {
                '**': 'http://127.0.0.1:8080'
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                path: outputPath,
                filename: '[name].css'
            }),
            new BundleAnalyzerPlugin()
        ]
    }
}