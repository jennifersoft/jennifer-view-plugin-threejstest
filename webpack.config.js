const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const staticPath = path.resolve(__dirname, 'src/main/resources/static')

module.exports = {
    context: staticPath,
    entry: staticPath + '/script/index.js',
    output: {
        path: staticPath,
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: staticPath + '/script',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {modules: false}]
                    ]
                }
            }]
        }, {
            test: /\.css$/,
            include: staticPath + '/style',
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }]
            })
        }, {
            test: /\.scss/,
            include: staticPath + '/style',
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: 'postcss.config.js',
                        },
                    },
                }]
            })
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            include: staticPath + '/file',
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024 * 1024
                }
            }]
        }]
    },
    devServer: {
        hot: false,
        inline: true,
        contentBase: staticPath,
        historyApiFallback: true,
        compress: true,
        publicPath: '/',
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '**': 'http://localhost:8080'
        }
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'app.bundle.css' }),
        new webpack.NamedModulesPlugin()
    ]
}