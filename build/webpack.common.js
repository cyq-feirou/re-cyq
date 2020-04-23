
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

const commonConfig = {
    module: {
        rules: [{
            test:/\.js$/,
            exclude:/node_modules/,
            use: [{
                loader:'babel-loader'
            }]
        },{
            test: /\.less$/,
            exclude: /node_modules/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'less-loader', 'postcss-loader']
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,'style-loader', 'css-loader', 'postcss-loader']
        },{
            test: /\.(png||jpg||gif||jpeg)$/,
            use:[{
                loader:'url-loader',
                options:{
                    name:'[name]_[hash].[ext]',
                    outputPath:'images/',
                    limit:204
                }
            }]
        }]
    },
    optimization: {
        minimizer:[new OptimizeCSSAssetsPlugin]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].chunk.css',

        }),
        new CSSSplitWebpackPlugin({
            size:4000,
            filename:'[name]-[part].[ext]',
            publicPath:"css"
        })
    ],
    output: {
        publicPath:"/",
        path:path.resolve(__dirname,'../dist')
    },
    resolve: {
        extensions:['.js','.jsx','css','less'],
        mainFiles:['index','view']
    }
}
module.exports = commonConfig;

    
