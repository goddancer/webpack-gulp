/**
 * Created by goddancer on 2017/6/9.
 *
 *
 */
export class BrowserCheckUtil {
  /**
   * BrowserCheckUtil  用于检测浏览器类型
   */
  constructor (){
  }

  versions (){
      var ua = navigator.userAgent;
      return {
        iphone: ua.indexOf('iPhone') > -1,
        android: ua.indexOf('Android') > -1,
        mobile:/AppleWebKit.*Mobile/i.test(ua) ||/Android/i.test(ua)|| (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua)),
        isIE7:/MSIE 7.0|MSIE 8.0|MSIE/i.test(ua),
        WinPhone:/Windows Phone/i.test(ua)
      }
  };
    /**
     *  静态方法，用于检测浏览器特性
     *  @return {Object} 返回 isIphone  isAndroid  isMobile  isIE7   isWinPhone
     */
    static checkUserAgent(){
        var ua = navigator.userAgent;
        return {
            isIphone: ua.indexOf('iPhone') > -1,
            isAndroid: ua.indexOf('Android') > -1,
            isMobile:/AppleWebKit.*Mobile/i.test(ua) ||/Android/i.test(ua)|| (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua)),
            isIE7:/MSIE 7.0|MSIE 8.0|MSIE/i.test(ua),
            isWinPhone:/Windows Phone/i.test(ua),
            isWeChat:/MicroMessenger/i.test(ua),
            isCBox:/CntvCBox/i.test(ua)
        }
    }
}