const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      watch: false,
      entry: {
        app: './test/demo/js/main.js',
        // test: 'test/test.js',
      },
      output: {
        filename: '[name].js',
      },
      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },
          {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', {
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
            loader: 'babel-loader'
          }
        ],
      },
    }))
    .pipe(gulp.dest('./test/demo/dist/'));
});