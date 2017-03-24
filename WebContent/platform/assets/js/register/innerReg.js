


jQuery(document).ready(function () {
	
	$("#birthday_s").datepicker({
		yearRange:'-70:+0',
	    maxDate:'+0y+0m+0d',
	    firstDay:0,
	    defaultDate:'-20y'
	});
	
	
	
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
		
		var postdata = "pwo="+password_old;
		postdata += "&pw="+password;
		postdata += "&pwr="+password_re;
		postdata += "&uid="+$.cookie('uid');
		
		$("#sure").attr("disabled","disabled");
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/resourceManager/user/update_password',
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
	
	
});

//showSuccessDialog("请阅读《软件使用和用户注册协议》");
//showWarningDialog("请阅读《软件使用和用户注册协议》");
//showErrorDialog("请阅读《软件使用和用户注册协议》");

