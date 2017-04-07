var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: "inline-sourcemap",
    entry: "./public/javascripts/src/script.js",
    output: {
        path: __dirname + "/public/javascripts",
        filename: "scripts.min.js"
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: false,
            sourcemap: false,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    }
};

