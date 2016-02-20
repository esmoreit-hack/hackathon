var path = require('path');
var webpack = require('webpack');
var path = require('path');

var through = require('through2')
var superviews = require('superviews.js')
var header = 'var IncrementalDOM = require(\'incremental-dom\')\n' +
'var patch = IncrementalDOM.patch\n' +
'var elementOpen = IncrementalDOM.elementOpen\n' +
'var elementVoid = IncrementalDOM.elementVoid\n' +
'var elementClose = IncrementalDOM.elementClose\n' +
'var text = IncrementalDOM.text\n\n';

var __template_loader = function (file, options) {
  if (!/\.html$/i.test(file)) {
    return through();
  }

  return through(function (buf, enc, next) {
    var name = options && options.name ? options.name : 'description';
    var args = options && options.args ? options.args : 'data';
    var idom = options && options.insertidom ? options.insertidom : true;
    var output = 'module.exports = ' + superviews(buf, name, args) + ';\n';

    if (idom) {
      output = header + output;
    }

    this.push(output);

    next();
  });
};


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    // Set up an ES6-ish environment
    client: './src/client/index',
    server: './src/server/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      comments: false
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        /node_modules/
      ],
      query: {
        plugins: ['transform-runtime', 'transform-decorators-legacy'],
        presets: ['es2015', 'stage-0'],
      }
    },
    {
      test: /\.html$/,
      loader: `${__dirname}/src/libs/TemplateLoader!superviews.js`,
      exclude: /node_modules/
    }]
  }
};
