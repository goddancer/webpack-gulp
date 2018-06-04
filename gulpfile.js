const gulpTask = require('./.gulplock');
gulpTask({
  taskName: 'default',
  taskWatch: true,
  inject: false,
  taskHtmlEntry: './test/demo/index.html',
  taskJsEntry: './test/demo/js/main.js',
  taskCssEntry: './test/demo/css/',
  taskDist: './test/demo/dist/',
});