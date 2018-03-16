let webpack = require('webpack')
let path = require('path')

module.exports = {
    entry: path.join(__dirname,'./js/apps/index.js'),
    output: {
        path: path.join(__dirname,'../public/js'),
        filename: 'index.js'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            scss: path.join(__dirname, 'scss'),
            js: path.join(__dirname, 'js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        
                    }, {
                        loader: "sass-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]

    
}