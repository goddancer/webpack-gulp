# webpack-stream
类似于webpack，只不过将打包操作交给了gulp
## 安装
### 1、npm初始化
```
npm init // 在项目目录新增package.json
```
### 2、安装依赖
```
npm install webpack-stream --save-dev // gulp-webpack已经废弃，安装最新的webpack-stream

npm install gulp --save-dev // 安装gulp

npm install css-loader --save-dev
npm install style-loader --save-dev
npm install sass node-sass sass-loader --save-dev

npm install postcss-import postcss-loader --save-dev // 安装postcss并配置，自动添加浏览器前缀。需要postcss-import依赖

npm install babel-core babel-loader --save-dev // 需要babel-loader

npm install babel-preset-env --save-dev // 使用babel处理es2015、26、17及最新语法依赖

npm install less less-loader --save-dev // 安装less及其依赖

npm install file-loader --save-dev // 仅需要url-loader是不行的
npm install url-loader --save-dev

npm install html-loader --save-dev

npm install html-webpack-plugin --save-dev

npm install image-webpack-loader --save-dev // url-loader的limit计算会根据image-webpack-loader将图片压缩以后的大小判断
```
### 3、创建gulpfile.js并初始化
```
const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      watch: false,
      entry: {
        app: './test/demo/js/main.js', // 入出口要加上./
        // test: 'test/test.js',
      },
      output: {
        filename: '[name].js',
      },
      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader' // -loader不能省略
          }
        ],
      },
    }))
    .pipe(gulp.dest('./test/demo/dist/'));
});
```