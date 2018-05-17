import $ from 'jquery'
import {BrowserCheckUtil} from './BrowserCheckUtil'
export class JumpUrl {
    /**
     *  JumpUrl 静态工具类，根据策略跳转到客户端的相关页面或者跳转到下载页面
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
            dataType: "jsonp",
            jsonp: 'cb',
            url: "https://appms.app.cntvwb.cn/appms/api/version.do?applyName=1369294887",
            success: function (data) {
                callback(data.data.versionsUrl);
            }
        });
    }
    /**
     *  初始化弹层样式和html标签
     */
    static initHtml(){
        var cssstr = '<style scoped>.t_zhe{position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;display:none;background-color:rgba(0,0,0,0.6)}.t_zhe div{width:11.9rem;height:8rem;margin:10.9rem auto 0;background-color:#fff;overflow:hidden;border-radius:5px}.t_zhe .p_one{color:#2394fc;text-align:center;font-size:.7rem;margin-top:1.6rem}.t_zhe .p_two{color:#959595;text-align:center;font-size:.65rem;margin-top:.6rem}.t_zhe ul{margin:1.4rem auto;width:90%;height:1.65rem;padding:0}.t_zhe ul li{width:4.875rem;height:1.65rem;list-style:none}.t_zhe ul li img{width:100%;height:100%;display:block}.t_zhe .li_one{float:left}.t_zhe .li_two{float:right}</style>';
        var htmlstr= '<div class="download"><div class="t_zhe"><div><p class="p_one">请先下载客户端</p><p class="p_two">即可使用弹幕播放器观看视频</p><ul><li class="li_one"><img src="img/iknow1.png" alt=""></li><li class="li_two"><img src="img/downke1.png" alt=""></li></ul></div></div></div>'
        $('head').append(cssstr);
        $('body').append(htmlstr);
    }
    /**
     *  用于打开客户端，如果打开失败将跳转到相关的下载页面
     *  @param clientUrl {String} clientUrl 打开客户端的url
     *  @param fail {String} fail 失败后调取的下载页面
     */
    static openApp(clientUrl, fail) {
        var the_href = "#";
        if (BrowserCheckUtil.checkUserAgent().isIphone) {
            if (BrowserCheckUtil.checkUserAgent().isWeChat) {
                //window.location = fail;
                var jumUrl=encodeURIComponent(clientUrl);
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.cntv"+'&g_f='+jumUrl;
            } else {
                the_href = clientUrl;
                window.location = the_href;
                setTimeout(function () {
                    if(BrowserCheckUtil.checkUserAgent().isIpad){
                        window.location = "https://itunes.apple.com/cn/app/%E5%A4%AE%E8%A7%86%E5%BD%B1%E9%9F%B3hd-%E6%B5%B7%E9%87%8F%E5%A4%AE%E8%A7%86%E5%86%85%E5%AE%B9%E9%AB%98%E6%B8%85%E7%9B%B4%E6%92%AD/id391071343?mt=8";
                    }else{
                        window.location = "https://itunes.apple.com/cn/app/cntv-zhong-guo-wang-luo-dian/id331259725?mt=8";
                    }
                }, 500);
            }
        } else {
            if (BrowserCheckUtil.checkUserAgent().isWeChat) {
                var jumUrl=encodeURIComponent(clientUrl);
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.cntv"+'&android_schema='+jumUrl;
            }
            else {
                window.location = clientUrl;
                setTimeout(function () {
                    $('.t_zhe').show();
                    $('.li_one').click(function () {
                        $('.t_zhe').hide();
                    });
                    $('.li_two').click(function () {
                        JumpUrl.getDownloadUrl(function (downloadUrl) {
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
     *  @param guid {String} guid 视频的guid
     *  @param vsid {String} vsid 视频集的ID
     *  @param title {String} title 视频的标题
     */
    static datailUrl(guid, vsid, title) {
        if (vsid) {
            JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?guid=" + guid + "&vsid=" + vsid + "&title=" + title, `../download/index.html?guid=${guid}&vsid=${vsid}&title=${title}&type=2"`);
        } else {
            JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?guid=" + guid + "&title=" + title, `../download/index.html?guid=${guid}&vsid=${vsid}&title=${title}&type=2"`);

        }
    }
    /**
     *  用于打开客户端的图文底层页
     *  @param vtype {String} vtype 类型 31
     *  @param articleId {String} articleId 图文的ID
     */
    static articleUrl(vtype,articleId) {
        JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?vtype=" + vtype + "&articleId=" + articleId, `../download/index.html?vtype=31&articleId=${articleId}&type=1`);
    }
    /**
     *  用于打开客户端的订阅号页面
     *  @param vtype {String} vtype 类型 23
     *  @param mid {String} mid 订阅号的Id
     */
    static subscribeUrl(vtype, mid) {
        JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?vtype=" + vtype + "&mid=" + mid, `../download/index.html?vtype=23&mid=${mid}&type=1`);
    }

    /**
     *  用于打开客户端的直播页面
     *  @param cid {String} cid 直播的频道ID
     */
    static liveUrl(cid) {
        JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?vtype=8&channelid=" + cid, `../download/index.html?vtype=8&channelid=${cid}`);
    }

    /**
     *  用于打开客户端的t图文直播页面
     *  @param type {String} type 回流跳转类型vtype
     *  @param lid {String} lid 图文直播的频道ID
     */
    static textImage(type,lid) {
        JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?vtype="+type+"&itemid=" + lid, `../download/index.html?vtype=${type}&itemid=${lid}`);
    }

    /**
     *  用于打开客户端
     */
    static backApp() {
        JumpUrl.openApp("cntvcbox://app.cntv.cn/", `../download/index.html`);
    }

    /**
     *  用于打开快速视频
     *  guid : H5页面上当前播放的视频GUID。
     *  vsurl : 快速视频集的json地址。
     */
    static fastvideo(guid, vsurl, vtype){
        JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?guid=" + guid + "&vtype=" + vtype + "&vsurl="+vsurl , `../download/index.html?guid=${guid}&vsurl=${vsurl}&vtype=${vtype}"`);
    }

  /**
   *  用于打开赛事页面
   */
  static match(matchId){
    JumpUrl.openApp("cntvcbox://app.cntv.cn/" + "?matchid=" + matchId + "&vtype=38", `../download/index.html?vtype=38&matchid=${matchId}`);
  }

    /**
     *  用于PC端跳转CCTV
     */
    static JumpCCTV(url){
        if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            window.location.href = url;
        }
    }
}

