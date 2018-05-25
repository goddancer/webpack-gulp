/*const gulpTask = require('zjc-npm-test');
gulpTask('hhh');*/
// const gulpTask = require('./gulpfile.lock');
const gulpTaskNew = require('zjc-npm-test');
gulpTaskNew({
  taskName: 'new',
  taskMinimize: {
    css: true,
    img: '18000'
  }
});