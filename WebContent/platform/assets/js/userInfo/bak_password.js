var pwo = "";
var pw = "";
var pwr = "";



jQuery(document).ready(function () {
	
	
	$("#sure").click(function(){
		
		
		var password_old = $("#password_old").val();
		var password = $("#password").val();
		var password_re = $("#password_re").val();
		if(password_old== "" || password_old == undefined){
			showWarningDialog("原密码不能为空");
			return ;
		}
		if(password== "" || password == undefined){
			showWarningDialog("新密码不能为空");
			return ;
		}
		if(password_re== "" || password_re == undefined){
			showWarningDialog("重复新密码不能为空");
			return ;
		}
		if(password != password_re){
			showWarningDialog("两次密码输入不匹配");
			return ;
		}
		
		var postdata = "pwo="+md5(password_old);
		postdata += "&pw="+md5(password);
		postdata += "&pwr="+md5(password_re);
		postdata += "&uid="+$.cookie('uid');
		postdata += "&ver="+$.cookie('ver');
		postdata += "&token="+$.cookie('token');
		
		$("#sure").attr("disabled","disabled");
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/user/update_password',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
//	        	$("#sure").removeAttr("disabled");
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];
	            if(flag=="0"){
	            	showSuccessDialog("修改密码成功");
	            }
	            if(flag=="1"){
	            	$("#sure").removeAttr("disabled");
	            	showWarningDialog("两次输入的密码不匹配");
	            }
	            if(flag=="2"){
	            	$("#sure").removeAttr("disabled");
	            	showWarningDialog("原始密码错误");
	            }
	            if(flag=="3"){
	            	$("#sure").removeAttr("disabled");
	            	showErrorDialog("修改密码失败");
	            }
	        },
	        error: function (errorMsg) {
	        	$("#sure").removeAttr("disabled");
	        	showErrorDialog("修改密码失败");
	        }
	    });
	});
	
	$("#xs").bind("click", function(){
		pwo = $("#password_old").val();
		pw = $("#password").val();
		pwr = $("#password_re").val();
		
		$("#yc").attr("style","display:block");
		$("#xs").attr("style","display:none");
		
		$("#con_pwo").html('<input id=\"password_old\" type=\"text\" class=\"input\" value=\"'+pwo+'\" placeholder=\"请输入原始密码\"/>');
		$("#con_pw").html('<input id=\"password\" type=\"text\" class=\"input\" value=\"'+pw+'\" placeholder=\"请输入新密码\"/>');
		$("#con_pwr").html('<input id=\"password_re\" type=\"text\" class=\"input\" value=\"'+pwr+'\" placeholder=\"请重复输入新密码\"/>');
		
	});
	$("#yc").bind("click", function(){
		pwo = $("#password_old").val();
		pw = $("#password").val();
		pwr = $("#password_re").val();
		$("#xs").attr("style","display:block");
		$("#yc").attr("style","display:none");
		
		$("#con_pwo").html('<input id=\"password_old\" type=\"password\" class=\"input\" value=\"'+pwo+'\" placeholder=\"请输入原始密码\"/>');
		$("#con_pw").html('<input id=\"password\" type=\"password\" class=\"input\" value=\"'+pw+'\" placeholder=\"请输入新密码\"/>');
		$("#con_pwr").html('<input id=\"password_re\" type=\"password\" class=\"input\" value=\"'+pwr+'\" placeholder=\"请重复输入新密码\"/>');
	});
});

//showSuccessDialog("请阅读《软件使用和用户注册协议》");
//showWarningDialog("请阅读《软件使用和用户注册协议》");
//showErrorDialog("请阅读《软件使用和用户注册协议》");

