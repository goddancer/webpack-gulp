/**
 * Created by goddancer on 2017/6/9.
 */
import $ from 'jquery'
export class DialogUtil{
  /*
  * DialogUtil 用于
  * @requires jquery
  * */
  constructor(){
    this.coverHtml='<div class="cover"></div>';
    this.alertHtml='<div class="prompt-alt"><p id="prompt-content">you see</p><p id="prompt-close">关闭</p></div>';
  }

  /*
  * function
  * */
  showCover(){
    var heighCover=$('html').height();
    var windowHeigh=$(window).height();
    if(windowHeigh>heighCover){
      heighCover=windowHeigh;
    }
    if($(".cover").length>=1){
      $(".cover").css({height:heighCover+"px"});
      $(".cover").show();
    }else{
      $('body').append(this.coverHtml);
      $(".cover").css({"height":heighCover+"px"});
      $(".cover").show();
    }
  };
  //隐藏覆盖层
  hideCover(){
    $(".cover").hide();
  };
  //弹出框
  showAlert(content,w,h){
    this.showCover();
    if($(".prompt-alt").length>=1){
      $(".prompt-alt").show();
    }else{
      $('body').append(this.alertHtml);
      $(".prompt-alt").show();
      $('#prompt-close').click(function(){
        this.hideAlert();
      });
    }
    $(".prompt-alt").css({height:h+"px",width:w+'px'});
    $(".prompt-alt").css({left:(($('html').width()-w)/2)+'px'});
    $('#prompt-content').html(content);
  };
  //隐藏弹出框
  hideAlert(){
    $(".prompt-alt").hide();
    this.hideCover();
  };
  showDialog(dailogId){
    this.showCover();
    $('#'+dailogId).show();
  };
  closeDialog(dailogId){
    this.hideCover();
    $('#'+dailogId).hide();
  };
}