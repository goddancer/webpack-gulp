const gulpTask = require('./.gulplock');
gulpTask({
  taskName: 'default',
  taskEntry: './test/demo/js/main.js',
  taskDist: './test/demo/dist/'
});