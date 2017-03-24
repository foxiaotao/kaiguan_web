$(function () {
    /********** Page Init **********/
    if ($.cookie('token') == null) {
        $('.mainFrame').attr('src', '../relogin.html');
    }
    $.cookie('langmainTitle', '学英语');

    /********** CSS Init **********/
    $('.menuLeft').height(document.body.clientHeight - 57);
    $('.mainFrame').width(document.body.clientWidth - 180);
    $('.mainFrame').height(document.body.clientHeight - 57);

    /********** Event Binding **********/
    $('.menu li').click(function () {
        $('.menu li').removeClass('selected')
        $(this).addClass('selected');
        $.cookie('langmainTitle', $(this).find('a span').html());
    });
    if ($.cookie('uname') != null && $.cookie('uname') != '') {
        $('.welcomeText').html($.cookie('uname'));
    }else if($.cookie('uid') != null && $.cookie('uid') != ''){
        $('.welcomeText').html($.cookie('uid'));
    }else{
    	$('.welcomeText').html($.cookie('phone'));
    }
    $('.logout').click(function () {
        $.cookie('token', null);
        window.location.href = "../userlogin.html";
    });
    $('#userInfo').click(function () {//个人中心
    	window.location.href = "../userInfo/userInfo.html";
    });
    $('.server').click(function () {//服务
    	
    	window.location.href = "../productService/server.html";
    });
    $('.home').click(function () {//主页
    	window.location.href = "../language/langmain.html";
    });
    $('.logo1').click(function () {//主页
    	window.location.href = homeUrl;
    });
});

















//showSuccessDialog("请阅读《软件使用和用户注册协议》");
//showWarningDialog("请阅读《软件使用和用户注册协议》");
//showErrorDialog("请阅读《软件使用和用户注册协议》");