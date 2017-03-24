$(function () {
    /********** Page Init **********/
    if ($.cookie('token') == null) {
    	$(".welcomeText").css("cursor","pointer");
    	 $('.welcomeText').click(function () {//个人中心
    		 location.href = '../userlogin.html'
         });
    	 $(".logout").css("background","url(../assets/img/login/login_06.png)no-repeat");
    	 $(".logout").attr("title","登录");
    	
    	 $('.userInfo').css("opacity","0.5");
    	 $('.resetlang').css("opacity","0.5");
    	 
    	 $('.userInfo').click(function () {//个人中心
//    		 showDiag("请先登录！");
//             $('.ok').click(function () {
//             	deleteDiag();				
//             });
//    		 location.href = '../userlogin.html'
         });
    	 
    	 $('.server').click(function () {//服务
         	window.location.href = "../productService/servicemain.html";
         });
         $('.home').click(function () {//主页
        	 location.href = '../userlogin.html'
         });
    }else{
    	if ($.cookie('uname') != null && $.cookie('uname') != '') {
            $('.welcomeText').html( $.cookie('uname'));
        }else if($.cookie('uid') != null && $.cookie('uid') != ''){
            $('.welcomeText').html( $.cookie('uid'));
        }else{
        	$('.welcomeText').html($.cookie('phone'));
        }
    	//----------------------------------
        $('.userInfo').click(function () {//个人中心
        	window.location.href = "../userInfo/userInfo.html";
        });
        $('.resetlang').click(function () {//主页
        	window.location.href = languageCenter;//baseUrl
        });
        $('.server').click(function () {//服务
        	window.location.href = "../productService/servicemain.html";
        });
    }
    
    $('.logo1').click(function () {//服务
    	window.location.href = homeUrl;
    });
    
    $('.logout').click(function () {
        $.cookie('token', null);
        $.cookie('uid', null);
        window.location.href = "../userlogin.html";
    });
    $('#returnServiceMain').click(function () {//产品服务中心
    	window.location.href = "./servicemain.html";
    });
    
});