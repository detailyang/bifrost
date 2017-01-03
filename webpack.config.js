var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: {
      main: './static/js/main.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'static/out/'),
        publicPath: "/out/",
        filename: '[name].bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react'],
          }
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendors.js',
        minChunks: function (module, count) {
          return module.resource 
            && (module.resource.indexOf('vendor') !== -1
            || module.resource.indexOf('node_modules') !== -1);
        }
      })
    ],

    //plugins: [new webpack.optimize.UglifyJsPlugin({minimize: true})]
}