
jQuery(document).ready(function () {
	
	var postdata = "";
	postdata += "uid="+$.cookie('uid');
	postdata += "&ver="+$.cookie('ver');
	postdata += "&token="+$.cookie('token');
	
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/note/getNoteScaleByUid',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];
	            if(flag=="0" || flag=="2"){
//	            	showSuccessDialog("修改密码成功");
	            	$("#noteScale").text(jsonObj["noteScale"]);
	            }
	            if(flag=="1"){
	            	showWarningDialog("登录过期，重新登录再尝试");
	            }
	        },
	        error: function (errorMsg) {
	        	showErrorDialog("统计信息初始化失败");
	        }
	    });
});

//showSuccessDialog("请阅读《软件使用和用户注册协议》");
//showWarningDialog("请阅读《软件使用和用户注册协议》");
//showErrorDialog("请阅读《软件使用和用户注册协议》");

