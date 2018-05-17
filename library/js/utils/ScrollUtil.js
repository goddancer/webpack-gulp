/**
 * Created by mxl on 2017/7/18.
 */
import $ from 'jquery'


export class ScrollUtil {
    constructor(el, service, type, option) {
        this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
        console.log(this.wrapper);
        this.wrapper = this.wrapper.children[0];
        this.service = service;
        var _opt = {
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
            scrollbars: false,//有滚动条
            mouseWheel: true,//允许滑轮滚动
            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
            bounce: false,//边界反弹
            interactiveScrollbars: true,//滚动条可以拖动
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
            //preventDefaultException: { className: /(^|\s)prevent(\s|$)/ },
            shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
            click: true,// 允许点击事件
            preventDefault:true,
            keyBindings: true,//允许使用按键控制
            momentum: true// 允许有惯性滑动
        };
        this.option = Object.assign({}, _opt, option);
        this.scroll = new IScroll(el, this.option);
        this.load = false;
        this.isEnd = false;
        if (type == 1) {
            this.init(this);
        }else{
            this.scroll.refresh();
        }

    }

    init(that) {
        this.scroll.refresh();
        //$(this.wrapper).prepend('<div class="pullDown"  ><div class="pullDownIcon"></div><div class="pullDownLabel">上拉刷新</div></div>');
        /*this.scroll.on('scroll', function () {
            that.onScroll(this);
        });*/
        this.scroll.on('scrollEnd', function () {
            that.scrollEnd(this);
        });
    }

    onScroll(scroll) {
        if (scroll.y > 40) {
            $(this.wrapper).find('.pullDown').addClass('flip');
            $(this.wrapper).find('.pullDownLabel').text('松手刷新');
            this.load = true;
        }
    }

    scrollEnd(scroll) {
        if (this.load) {
            $(this.wrapper).find('.pullDown').removeClass('flip').addClass('loading');
            $(this.wrapper).find('.pullDownLabel').text('正在加载...');
            this.scroll.refresh();
            this.load = false;
            this.refresh(this);
        }
        if (scroll.y < (  scroll.maxScrollY + 40) && !this.isEnd) {
            this.next(this);
        }
    }

    refresh(that) {
        this.service.refresh(function () {
            $(that.wrapper).find('.pullDown').removeClass('loading');
            $(that.wrapper).find('.pullDownLabel').text('上拉刷新...');
            that.scroll.refresh();

            if (that.service.isEnd()) {
                $(that.wrapper).find('.spinner').hide();
            } else {
                that.isEnd = false;
                $(that.wrapper).find('.spinner').show();
                that.scroll.refresh();
            };
        });
    }

    next(that) {
        this.service.next(function () {
            that.scroll.refresh();
            if (that.service.isEnd()) {
                that.isEnd = true;
                $(that.wrapper).find('.spinner').hide();
                that.scroll.refresh();
            }
        });
    }
    end(){
        $(this.wrapper).find('.spinner').hide();
        this.scroll.refresh();
    }
    /*
    * add by zjc
    * */
    goRefresh(){
        this.scroll.refresh();
    }
    /*
    * add by zjc
    * */
    goBackTop(){
        this.scroll.scrollTo(0,0,100,IScroll.utils.ease.elastic);
    }
}