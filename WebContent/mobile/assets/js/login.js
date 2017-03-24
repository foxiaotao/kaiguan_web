var login_error_his = null;
jQuery(document).ready(function () {
	

	init();
    

    //login
    $('.login').click(function () {
    	login();
    });
    
});
function init(){
}
function login(){

    var username = $('.userInput').val();
    var password = $('.pwdInput').val();
//    var validword = $('#loginForm').find('.codeInput2').val();
    
    
    if (isNaN(username)) {
        showDiag("用户名内容错误！");
        $('.ok').click(function () {
        	deleteDiag();				
        });
        return;
    }
    if (!(username.length == 10 || username.length == 11)) {
		showDiag("手机号/用户号 不正确，请重新输入");
        $('.ok').click(function () {
            deleteDiag();	
        });
		return;
    }
    if (password == '') {
        showDiag("请输入登录密码！");
        $('.ok').click(function () {
        	deleteDiag();				
        });
        return;
    }
    if (username != '' && password != '') {
        var postdata = '';
        if (username.length == 10) {
            postdata += ('uid=' + username);
        } else if (username.length == 11) {
            postdata += ('cellphone=' + username);
        }
        postdata += ('&passwd=' + md5(password) + '&uetype=phoneweb&os=phoneweb');
        jQuery.support.cors = true;
		 $.ajax({
            type: "post",
            contentType: "application/json",
            url: baseUrl+'/resourceManager/login/index',
            contentType: 'application/x-www-form-urlencoded',
            data: postdata,
            dataType: "text",
            async: true,
            success: function (result) {
                HandleLoginAjaxSuccess(result);
            },
            error: function (errorMsg) {
				showDiag("登录失败，请重新尝试");
				$('.ok').click(function () {
					deleteDiag();		
				});
				$('.userInput').focus();
            }
        });
    }
}
function HandleLoginAjaxSuccess(result) {
    var jsonObj = jQuery.parseJSON(result);
    var ret = jsonObj["ret"];
    var flag = jsonObj["flag"];
    var login_error_his = $.cookie('loginErrorHis');
    switch (flag) {
        case '2':
            showDiag("密码 不正确，请重新输入");
            $('.ok').click(function () {
                deleteDiag();
            });
            break;
        case '1':
            showDiag("手机号/用户号 不正确，请重新输入");
            $('.ok').click(function () {
                deleteDiag();
            });
            break;
        case '-3':
            showDiag("校验码 不正确，请重新输入");
            $('.ok').click(function () {
                deleteDiag();
            });
            break;
        case '-4':
        	showDiag("校验码 不能为空，请重新输入");
        	$('.ok').click(function () {
        		deleteDiag();
        	});
        	break;
        case '0':
            $.cookie('phone', jsonObj["phone"], { expires: 365 , path: '/'});
            $.cookie('uid', jsonObj["uid"], { expires: 365, path: '/' });
            $.cookie('realname', jsonObj["realname"], { expires: 365, path: '/' });
            $.cookie('uname', typeof jsonObj["uename"] == 'undefined' ? null : jsonObj["uename"], { expires: 365 , path: '/'});
            var cookietime = new Date();
            cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000 * 3));//coockie保存三小时
            $.cookie('token', jsonObj["token"], { expires: cookietime, path: '/' });
            window.location.href = "./membership/membershipMain.html";
            break;
    }
}
function getTimestamp() {
    return new Date().getTime();
}
