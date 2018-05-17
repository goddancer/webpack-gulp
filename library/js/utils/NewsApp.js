import $ from 'jquery'
import {BrowserCheckUtil} from './BrowserCheckUtil'
export class NewsApp {
  /**
   *  NewsApp 静态工具类，根据策略跳转到客户端的相关页面或者跳转到下载页面
   *  @requires jquery
   *  @requires BrowserCheckUtil
   */
  constructor() {
  };

  /**
   *  获取安卓的下载地址
   *  @param callback {Function} callback 获取下载地址的回调函数
   */
  static getDownloadUrl(callback) {
    $.ajax({
      dataType:"jsonp",
      jsonp:'cb',
      url:"http://appms.app.cntvwb.cn/appms/api/version.do?action=release-GetNewVersions&applyName=1372992399",
      success: function (data) {
        callback(data.data.versionsUrl);
      }
    });
  }

  /**
   *  用于打开客户端，如果打开失败将跳转到相关的下载页面
   *  @param clientUrl {String} clientUrl 打开新闻客户端的url
   *  @param fail {String} fail 失败后调取的下载页面
   */
  static openApp(clientUrl, fail) {
    var the_href = "#";
    if (BrowserCheckUtil.checkUserAgent().isIphone) {
      if (BrowserCheckUtil.checkUserAgent().isWeChat) {
        var jumUrl=encodeURIComponent(clientUrl);
        window.location = " http://a.app.qq.com/o/simple.jsp?pkgname=cn.cntvnews"+'&g_f='+jumUrl;
      } else {

        the_href = clientUrl;
        window.location = the_href;
        setTimeout(function () {
          window.location = "https://itunes.apple.com/us/app/yang-shi-xin-wen/id467289231?ls=1&amp;mt=8";
        }, 500);
      }
    } else {
      if (BrowserCheckUtil.checkUserAgent().isWeChat) {
        var jumUrl=encodeURIComponent(clientUrl);
        window.location = " http://a.app.qq.com/o/simple.jsp?pkgname=cn.cntvnews"+'&android_schema='+jumUrl;
      }
      else {
        window.location = clientUrl;
        setTimeout(function () {
          $('.t_zhe').show();
          $('.li_one').click(function () {
            $('.t_zhe').hide();
          });
          $('.li_two').click(function () {
            NewsApp.getDownloadUrl(function (downloadUrl) {
              $('.t_zhe').hide();
              window.location = downloadUrl;
            });

          });
        }, 500);

      }
    }
  }

  /**
   *  用于打开客户端的单视频底层页
   *  @param articalID {String} articalID 央视新闻的id
   *  @param type{String} type 央视新闻的type

   */
  static datailUrl(articalID, type) {
    if (articalID) {
      NewsApp.openApp("cntvnews://app.cntv.cn/" + "?id=" + articalID + "&type=" + type , `../../download/news/index.html?id=${articalID}&type=2"`);
    } else {
      NewsApp.openApp("cntvnews://app.cntv.cn/" + "?id=" + articalID , `../../download/news/index.html?id=${articalID}&type=2"`);

    }
  }

  /**
   *  用于打开客户端的订阅号页面
   *  @param vtype {String} vtype 类型 23
   *  @param mid {String} mid 订阅号的Id
   */
  static subscribeUrl(vtype, mid) {
    NewsApp.openApp("cntvnews://app.cntv.cn/" + "?vtype=" + vtype + "&mid=" + mid, `../download/index.html?vtype=23&mid=${mid}&type=1`);
  }

  /**
   *  用于打开客户端的直播页面
   *  @param mid {String} cid 直播的频道ID
   */
  static liveUrl(cid) {
    NewsApp.openApp("cntvnews://app.cntv.cn/" + "?type=3&cid=" + cid, `../download/index.html?type=3&cid=${cid}`);
  }

  /**
   *  用于打开客户端的t图文直播页面
   *  @param mid {String} lid 图文直播的频道ID
   */
  static textImage(lid) {
    NewsApp.openApp("cntvnews://app.cntv.cn/" + "?type=4&lid=" + lid, `../download/index.html?type=4&cid=${lid}`);
  }

  static backApp() {
    NewsApp.openApp("cntvnews://app.cntv.cn/", `../../download/news/index.html`);
  }

}

