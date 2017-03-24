var login_error_his = null;
jQuery(document).ready(function () {
	
    /********** Page Init **********/
    if ($.cookie('token') != null) {
        window.location.href = 'home/home.html';
//        window.location.href = 'lang/langmain.html';
    }
    $(".logo3").click(function(){
    	window.location.href = './productService/servicemain.html';
    });
    $(".logo").click(function(){
    	window.location.href = homeUrl;
    });
    
    if ($.cookie('phone') != null) {
        $('#loginForm').find('.userInput').val($.cookie('phone'));
    }

    /********** CSS Init **********/

    /********** Event Binding **********/
    $('.validInput').keyup(function () {
        $('.validerror').fadeOut('fast');
    });
    $('.userInput, .pwdInput').keyup(function () {
        $(this).parent().parent().find('.error').fadeOut('fast');
    });

	init();
    

    //login
    $('#loginForm .loginBtn').click(function () {
    	login();
    });
    $('#loginForm .pwdInput').keydown(function (e) {
        if(e.keyCode==13) {
            login();
         }
    });
    $('#loginForm .validInput').keydown(function (e) {
        if(e.keyCode==13) {
            login();
         }
    });
    
//  loadValidateCode()
    $("#image_code").click(function(){
    	loadValidateCode()
    });
});
function init(){
	 login_error_his = $.cookie('loginErrorHis');
	 if(login_error_his=='1'){
		 loadValidateCode();
		 showValidateCode();
	 }
	 /*
	 $('#loginForm').find('.validInput').keyup(function(){
		 var code_temp = $('#loginForm').find('.validInput').val();
		 if(code_temp.length == 4){
			 $("#codeMd5").attr("src",baseUrl+'/resourceManager/validateCode/code1');
		 }
	 });
	 */
}
function login(){

    var username = $('#loginForm').find('.userInput').val();
    var password = $('#loginForm').find('.pwdInput').val();
    var validword = $('#loginForm').find('.validInput').val();
//    var validword = $('#loginForm').find('.codeInput2').val();
    
    
    if (isNaN(username)) {
        $('.username .error').fadeIn('fast', function () {
            $('.userInput').focus();
        });
        showDiag("用户名内容错误！");
        $('.ok').click(function () {
        	deleteDiag();				
        });
//        showWarningDialog("用户名内容错误");
        return;
    }
    if (!(username.length == 10 || username.length == 11)) {
		showDiag("手机号/用户号 不正确，请重新输入");
        $('.ok').click(function () {
            deleteDiag();	
            console.log(1);
        });
		$('.userInput').focus();
		console.log(2);
		return;
    }
    if (password == '') {
        $('.password .error').fadeIn('fast', function () {
            $('.pwdInput').focus();
        });
        showDiag("请输入登录密码！");
        $('.ok').click(function () {
        	deleteDiag();				
        });
//        showWarningDialog("");
        return;
    }
    if(login_error_his=='1'){
        if (validword == '') {
            $('.validerror').fadeIn('fast', function () {
                $('.validInput').focus();
            });
            showDiag("请输入验证码！");
            $('.ok').click(function () {
            	deleteDiag();				
            });
            return;
        }
        if (validword.length!=4) {
        	$('.validerror').fadeIn('fast', function () {
        		$('.validInput').focus();
        	});
        	showDiag("请输入正确的验证码！");
        	$('.ok').click(function () {
        		deleteDiag();				
        	});
        	return;
        }
    }
    if (username != '' && password != '') {
        var postdata = '';
        if (username.length == 10) {
            postdata += ('uid=' + username);
        } else if (username.length == 11) {
            postdata += ('cellphone=' + username);
        }
        postdata += ('&passwd=' + md5(password) + '&uetype=pcweb&rand=' + validword+'&loginErrorHis=' + $.cookie('loginErrorHis')+'&os=web');
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
function loadValidateCode(){
	$('#loginForm').find('.validInput').val("");
	$("#image_code").attr("src",baseUrl + "/resourceManager/validateCode/code4?"+getTimestamp());
	
}
function showValidateCode(){
	loadValidateCode();
	$("#code_div").attr("style","display:block");
	
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
                $('#loginForm').find('.pwdInput').val('').focus();
//                myReload();
            });
            loginErrorHis();
            showValidateCode();
            break;
        case '1':
            showDiag("手机号/用户号 不正确，请重新输入");
            $('.ok').click(function () {
                deleteDiag();
                $('#loginForm').find('.userInput').val('').focus();
//                myReload();
            });
            loginErrorHis();
            showValidateCode();
            break;
        case '-3':
            showDiag("校验码 不正确，请重新输入");
            $('.ok').click(function () {
                deleteDiag();
                $('#loginForm').find('.validInput').val('').focus();
//                myReload();
            });
            loginErrorHis();
            showValidateCode();
            break;
        case '-4':
        	showDiag("校验码 不能为空，请重新输入");
        	$('.ok').click(function () {
        		deleteDiag();
        		$('#loginForm').find('.validInput').val('').focus();
        	});
        	loginErrorHis();
        	showValidateCode();
        	break;
        case '0':
            $.cookie('phone', jsonObj["phone"], { expires: 365 , path: '/'});
            $.cookie('uid', jsonObj["uid"], { expires: 365, path: '/' });
            $.cookie('realname', jsonObj["realname"], { expires: 365, path: '/' });
//            $.cookie('uname', typeof jsonObj["uname"] == 'undefined' ? null : jsonObj["uname"], { expires: 365 , path: '/'});
            $.cookie('uname', typeof jsonObj["uename"] == 'undefined' ? null : jsonObj["uename"], { expires: 365 , path: '/'});
            var cookietime = new Date();
            cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000 * 3));//coockie保存三小时
            $.cookie('token', jsonObj["token"], { expires: cookietime, path: '/' });
            window.location.href = "home/home.html";
            
            $.cookie('loginErrorHis', "");
            break;
    }
    if(login_error_his=="1"){
    	showValidateCode();
    }
}
function getTimestamp() {
    return new Date().getTime();
}
function loginErrorHis() {
	var cookietime = new Date();
    cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000 * 3));//coockie保存三小时
//    $.cookie('loginErrorHis', "", { expires: cookietime, path: '/' });
    $.cookie('loginErrorHis', "1", { expires: cookietime, path: '/' });
}
