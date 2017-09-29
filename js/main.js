/**
 * Created by Administrator on 2017/9/20.
 */
$(function () {
    /*********首页满屏部分************/
    $(window).resize();

    /*******添加图片和数字按钮********/
    var i = 0;
    var imgWidth = parseInt($(".screen ul li").css("width"));
    var clone = $("#screen ul li").first().clone();
    $("#screen ul").append(clone);
    var ulLiLeg = $("#screen ul li").length;
    for (var j=0;j<ulLiLeg-1;j++){$("#screen ol").append("<li></li>");}
    $("#screen ol li").first().addClass("current");

    /******自动播放、鼠标移进移出事件和左右按钮点击事件*********/
    var timer = setInterval(function () {i++;move();},5000);
    $("#screen").hover(
        function () {clearInterval(timer);},
        function () {timer = setInterval(function () {i++;move();},5000);}
    );
    $("#lBtn").on("click",function () {i--;move();});
    $("#rBtn").on("click",function () {i++;move();});

    /********数字按钮点击事件**********/
    $("#screen ol li").on("click",function () {
        var index = $(this).index();
        i = index;
        $("#screen ul").stop().animate({left:-index*imgWidth},300);
        $(this).addClass("current").siblings().removeClass("current");
    });

    /**********封装动画************/
    function move() {
        if (i==ulLiLeg){
            $("#screen ul").css({left:0});
            i = 1;
        }
        if (i==-1){
            $("#screen ul").css({left:-(ulLiLeg-1)*imgWidth});
            i = ulLiLeg - 2;
        }
        $("#screen ul").stop().animate({left:-i*imgWidth},1000);
        if (i == ulLiLeg-1){
            $("#screen ol li").eq(0).addClass("current").siblings().removeClass("current");
        }else {
            $("#screen ol li").eq(i).addClass("current").siblings().removeClass("current");
        }
    }

    /**********导航栏固定部分*********/
    var topH = $("#nav").offset().top;
    var skillH = $("#skill").offset().top;
    var workH = $("#workExp").offset().top;
    var pjtH = $("#pjtExp").offset().top;
    $(window).scroll(function () {
        var docScroll = $(document).scrollTop();

        /*****banner部分*********/
        if (docScroll > topH){
            $("#nav").css({"position":"fixed", "top":0,});
            $("#nav").next().css({"margin-top":$("#nav").height(),});
        }else {
            $("#nav").css({"position":"static",});
            $("#nav").next().css({"margin-top":0,});
        }
        if ((topH - docScroll) <= $(".topBanner").height()){
            $("#topBannner").css("margin-top",-(100-(topH - docScroll)));
        }else {
            $("#topBannner").css("margin-top",0);
        }
        /*********背景速度差部分********/
        if ((docScroll > skillH - 800) && ((docScroll -skillH) <= (workH - skillH))){

            $("#skill").css({"background-position-y":-(docScroll - skillH)/3});
        }
        if ((docScroll > workH - 800) && ((docScroll -workH) <= (pjtH - workH))){

            $("#workExp").css({"background-position-y":-(docScroll - workH)/3});
        }
    });
});

$(window).resize(function () {
    $("#firPage").css({"height":$(window).height()});
});