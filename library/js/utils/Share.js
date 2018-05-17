export class ShareTest{
  /*
  * Share 分享功能
  *新浪微博 QQ好友或群 QQ空间 百度贴吧
  *title 分享标题
  * url 被分享连接
  * pic 分享图片（缩略图）
  * desc 分享简介
  * num  分享平台
  * 1：新浪微博 2：QQ好友 3：QQ空间 4：百度贴吧
  * */
  constructor (title,url,pic,desc){
    this.title = title;
    this.url = url;
    this.pic = pic;
    this.desc = desc;
  }
  share(num){
    this.num = num;
    if(this.num == 1){
      window.location.href = `http://service.weibo.com/share/share.php?url=${this.url}&appkey=央视新闻&title=${this.title}&pic=${this.pic}`
    }else if(this.num == 2){
      window.location.href = `http://connect.qq.com/widget/shareqq/index.html?url=${this.url}&desc=${this.desc}&title=${this.title}&summary=${this.desc}&pics=${this.pic}`
    }else if(this.num == 3){
      window.location.href = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${this.url}&desc=${this.desc}&summary=${this.desc}&title=${this.title}&pics=${this.pic}`
    }else if(this.num == 4){
      window.location.href = `http://tieba.baidu.com/f/commit/share/openShareApi?title=${this.title}&desc=${this.desc}&pic=${this.pic}&url=${this.url}`
    }
  }
  
}