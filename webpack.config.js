var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');

prod_state = process.env.NODE_ENV==="production"


module.exports = {
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     use:
                        [
                            { 
                                loader: 'css-loader', options: { importLoaders: 1 } 
                            },
                            'postcss-loader'
                        ],
                     publicPath: '../',
                }),
            },{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({ //利用 extractPlugin 實例裡的 extract 來建立 Loader
                    use: 
                    [
                        'css-loader', 
                        'sass-loader',
                        'postcss-loader'
                    ],
                    publicPath: '../',
                })
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                loaders: [
                    'file-loader?limit=10000&hash=sha512&digest=hex&name=image/[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 4,
                            },
                        },
                    }
                ],
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.LoaderOptionsPlugin({
            debug: !prod_state,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',            
            Chunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }            
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['vendor', 'bundle']
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ]
}