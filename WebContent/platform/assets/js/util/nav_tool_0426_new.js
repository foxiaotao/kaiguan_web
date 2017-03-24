$(function () {
    if ($.cookie('token') == null) {
        $('.welcomeText').text('请登录');
        $('.welcomeText').attr("style","cursor:pointer");
        
        $('.welcomeText').click(function () {
        	window.location.href = "../userlogin.html";
        });
        logout_login_image("login");
        
    }else{
    	$('.welcomeText').remove("style");
    	if ($.cookie('uname') != null && $.cookie('uname') != '') {
    	        $('.welcomeText').html( $.cookie('uname'));
	    }else if($.cookie('uid') != null && $.cookie('uid') != ''){
	        $('.welcomeText').html( $.cookie('uid'));
	    }else{
	    	$('.welcomeText').html($.cookie('phone'));
	    }
    	logout_login_image("logut");
    }
    
    $('.logout').click(function () {
        $.cookie('token', null);
        $('.welcomeText').text('请登录');
        $('.welcomeText').attr("style","cursor:pointer");
        
        $('.welcomeText').click(function () {
        	window.location.href = "../userlogin.html";
        });
        logout_login_image("login");
        //导航页 退出登录
        window.location.href = "./home.html";
    });
    $('#userInfo').click(function () {//个人中心
    	window.location.href = "../../userInfo/userInfo.html";
    });
    $('.userInfo').click(function () {//个人中心
    	if ($.cookie('token') == null) {
    		window.location.href = "../relogin.html";
    	}else{
    		window.open("../userInfo/userInfo.html", "user_info")
    	}
    });
    $('.resetlang').click(function () {//主页
    	window.location.href = "../../home/onlineReading.html";
    });
    $('.server').click(function () {//服务
    	window.location.href = "../../productService/servicemain.html";
    });
//    $('.logo1').click(function () {//服务
//    	window.location.href = homeUrl;
//    });
    
    
});

function logout_login_image(stat){
	if(stat == "logout"){
		$('.logout').css("background","url(http://static.getwant.com/staticpool/assets/img/public/publicBlacklogout.png)no-repeat");
    	$('.logout').css("background-size","100% 100%");
	}
	if(stat == "login"){
		//显示login的图标
    	$('.logout').css("background","url(http://static.getwant.com/staticpool/assets/img/public/publicBlacklogin.png)no-repeat");
    	$('.logout').css("background-size","100% 100%");
	}
}