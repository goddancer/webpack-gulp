export class HttpUtil {
  /**
   *  HttpUtil 静态工具类，包含对url地址，参数的一些常用方法
   */
  constructor() {
  }

  /**
   *  根据参数名称获取url地址中的参数
   *  @param name {String} name url参数的名称
   *  @return {string} 返回获取到的参数值，如果没有返回NULL
   */
  static getParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  /**
   *  根据参数名称更新url地址中的参数
   *  @param url {String} url 浏览器当前地址
   *  @param name {String} name url参数的名称
   *  @param value {String} value url参数的值
   *  @return {string} 返回更新参数值后的新的地址，如果没有返回原地址
   */
  static updateParam(url, name, value) {
    var r = url;
    if (r != null && r != 'undefined' && r != '') {
      //value = encodeURIComponent(value);
      var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
      var tmp = name + "=" + value;
      if (url.match(reg) != null) {
        r = url.replace(eval(reg), tmp);
      } else {
        if (url.match("[\?]")) {
          r = url + "&" + tmp;
        } else {
          r = url + "?" + tmp;
        }
      }
    }
    return r;
  }
  /**
   *  在head标签里添加script标签，用于动态获取脚本
   *  @param link {String} link 远程URL地址
   *  @param callback {Function} callback 回调函数
   */
  static addScript(link,callback) {
    var el = document.createElement("script");
    el.type = "text/javascript";
    el.lang = "javascript";
    if (el.readyState) {
      el.onreadystatechange = function () {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
          el.onreadystatechange = null;
          callback();
        }
      }
    }
    else {
      el.onload = function () {
        callback();
      }
    }
    el.src = link;
    document.getElementsByTagName("body")[0].appendChild(el);
  }

}
