$(function () {
    /********** Page Init **********/
    if ($.cookie('token') == null) {
        $('.mainFrame').attr('src', '../relogin.html');
    }
    $.cookie('langmainTitle', 'English');

    /********** CSS Init **********/
    $('.menuLeft').height(document.body.clientHeight - 57);
    //监听窗口resize事件
    $(window).resize(function(){
    	if($('.mainFrame').width() != $('.banner').width() - 180){
    		$('.mainFrame').width( $('.banner').width() - 180);
    	};
    });
    $('.mainFrame').height(document.body.clientHeight - 57);

    /********** Event Binding **********/
    $('.menu li').click(function () {
        $('.menu li').removeClass('selected')
        $(this).addClass('selected');
        $.cookie('langmainTitle', getEnglishByChinese($(this).find('a span').html()));
    });
    if ($.cookie('uname') != null && $.cookie('uname') != '') {
        $('.welcomeText').html( $.cookie('uname'));
    }else if($.cookie('uid') != null && $.cookie('uid') != ''){
        $('.welcomeText').html( $.cookie('uid'));
    }else{
    	$('.welcomeText').html($.cookie('phone'));
    }
    $('.logout').click(function () {
        $.cookie('token', null);
        window.location.href = "../userlogin.html";
    });
    $('.userInfo').click(function () {//个人中心
    	window.location.href = "../userInfo/userInfo.html";
    });
    $('.server').click(function () {//个人中心
    	window.location.href = "../productService/servicemain.html";
    });
    $('.logo').click(function () {//服务
    	window.location.href = "http://www.getwant.com/company/cooperation/cooperation.html";
    });
});

function getEnglishByChinese(CHN){
	if(CHN == "开关中文"){
		return "Chinese";
	}
	if(CHN == "开关英语"){
		return "English";
	}
	if(CHN == "开关韩语"){
		return "Korean";
	}
	if(CHN == "开关法语"){
		return "French";
	}
	if(CHN == "开关德语"){
		return "German";
	}
	if(CHN == "开关俄语"){
		return "Russian";
	}
	if(CHN == "西班牙语"){
		return "Spanish";
	}
	if(CHN == "阿拉伯语"){
		return "Arabic";
	}
	if(CHN == "阿拉日语"){
		return "Japanese";
	}
}