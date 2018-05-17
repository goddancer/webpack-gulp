export class DateUtil {
  /**
   *  DateUtil 日期、时间工具类。包含各种对时间、日期的格式化
   */
  constructor() {
  }

  /**
   *  通过日期实例，分隔符获 取XXXX-XX-XX 或者 XXXX/XX/XX 这种的格式的方法
   *  @param date {Date} date 日期实例
   *  @param separator {String} separator分隔符
   *  @return {string} 返回格式化后的日期
   */
  static getYyyyMmDd(date, separator) {
    var year_ = date.getFullYear();       //年
    var month_ = date.getMonth() + 1;  //月
    var day_ = date.getDate();         //日
    separator = separator||'-'
    var str = "";
    str += year_ + separator;
    if (month_ < 10)
      str += "0";
    str += month_ + separator;
    if (day_ < 10)
      str += "0";
    str += day_;
    return (str);
  }

  static getWantTime(divisor) {
    return parseInt(new Date().getTime()/divisor);
  }

  static toSpeclen(num,len){
  if(num.toString().length >= len){return num;}
  return this.toSpeclen("0"+num,len);
}

}
