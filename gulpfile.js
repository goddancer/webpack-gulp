const gulp = require('gulp');
const webpack = require('webpack-stream');
const htmlWebpackPlugin = require('html-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');

gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      watch: false,
      entry: {
        app: './test/demo/js/main.js',
        // test: 'test/test.js',
      },
      output: {
        filename: 'js/[name].js',
        publicPath: './'
      },
      module: {
        loaders: [
          {
            test: /\.css$/,
            loaders: ['style-loader', {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                indent: 'poscss',
                plugins: (loader) => [
                  require('postcss-import')({root: loader.resourcePath}),
                  require('autoprefixer')({
                    broswer: ['last 5 versions']
                  })
                ]
              }
            }]
          },
          {
            test: /\.scss$/,
            loaders: ['style-loader', {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                indent: 'poscss',
                plugins: (loader) => [
                  require('postcss-import')({root: loader.resourcePath}),
                  require('autoprefixer')({
                    broswer: ['last 5 versions']
                  })
                ]
              }
            }, 'sass-loader']
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              "presets": ['env']
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.less$/,
            loaders: ['style-loader', {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                indent: 'poscss',
                plugins: (loader) => [
                  require('postcss-import')({root: loader.resourcePath}),
                  require('autoprefixer')({
                    broswer: ['last 5 versions']
                  })
                ]
              }
            }, 'less-loader']
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loaders: [
              'url-loader?limit=20000&name=img/[name]-[hash:5].[ext]',
              'image-webpack-loader'
            ]
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ],
      },
      resolve: {
        alias: {
          vue: 'vue/dist/vue.js'
        },
        extensions: ['.ts', '.vue', '.js']
      },
      plugins: [
        new htmlWebpackPlugin({
          filename: 'index.html',
          template: './test/demo/index.ejs',
          inject: 'body',
          title: 'goddancer is awesome',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
          }
        }),
        new uglify({
          extractComments: true
        })
      ]
    }))
    .pipe(gulp.dest('./test/demo/dist/'));
});