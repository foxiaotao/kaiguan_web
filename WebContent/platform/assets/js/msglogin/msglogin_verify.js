$(function () {
	var src = window.location.href;
	
	var param = src.split('?')[1];
	var params = param.split("&");
	
	$("#phone_text2").text(params[1].replace("_"," "));
	
	$("#verify").click(function(){
		var code = $("#code").val();
		var postdata = params[0]+"&code="+code;
		
		
		
		if(code.length==6){
			$.ajax({
				type: "post",
				contentType: "application/json",
				url: baseUrl+'/resourceManager/msglogin_verify',
				contentType: 'application/x-www-form-urlencoded',
				data: postdata,
				dataType: "text",
				async: true,
				success: function (result) {
					HandVerifyAjaxSuccess(result);
				},
				error: function (errorMsg) {
//					showWarningDialog("");
					showDiag("验证失败，请重新尝试");
		            $('.ok').click(function () {
		            	deleteDiag();				
		            });
				}
			});
		}else{
			showDiag("验证码错误");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//			showWarningDialog("验证码错误");
		}
	});
});

function HandVerifyAjaxSuccess(result) {
	var jsonObj = jQuery.parseJSON(result);
	var flag = jsonObj["flag"];
	var msg = jsonObj["msg"];
	if(flag==0){
        $.cookie('phone', jsonObj["phone"], { expires: 365 , path: '/'});
        $.cookie('uid', jsonObj["uid"], { expires: 365, path: '/' });
//        $.cookie('uname', typeof jsonObj["uname"] == 'undefined' ? null : jsonObj["uname"], { expires: 365 , path: '/'});
        $.cookie('uname', typeof jsonObj["uename"] == 'undefined' ? null : jsonObj["uename"], { expires: 365 , path: '/'});
        var cookietime = new Date();
        cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000 * 3));//coockie保存三小时
        $.cookie('token', jsonObj["token"], { expires: cookietime, path: '/' });
//        window.location.href = "../userInfo/userInfo.html";
        window.location.href = "../language/langmain.html";
//		window.location.href = "../userlogin.html";
		
		
	}else{
//		showWarningDialog(msg);
		showDiag(msg);
        $('.ok').click(function () {
        	deleteDiag();				
        });
	}

}
//			showSuccessDialog("请阅读《软件使用和用户注册协议》");
//			showWarningDialog("请阅读《软件使用和用户注册协议》");
//			showErrorDialog("请阅读《软件使用和用户注册协议》");