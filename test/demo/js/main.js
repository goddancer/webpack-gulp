import {HttpUtil} from '../../../library/js/utils/httpUtil';
import '../css/index.scss';

function hello(){
  const time = new Date().getHours();
  const str = `now the time of hour is ${time}`;
  console.log('hello webpack-stream!');
  console.log(str);
}
hello();

// const newUrl = HttpUtil.updateParam(window.location.url, 'goddancer', 123);
const name = HttpUtil.getParam('name');
console.log(name);