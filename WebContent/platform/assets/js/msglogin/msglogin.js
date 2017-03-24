$(function () {
	$("#reg").click(function(){
		var isSelect = $("#check_box").is(':checked');//false  未勾选，true 勾选
		var countryValue = $("#country_input").val();
		var prefixValue = $("#phone_input_suff").val();
		var phoneValue = $("#phone_input").val();
		
		var postdata = "";
		postdata += "country="+countryValue;
		postdata += "&prefix="+prefixValue;
		postdata += "&cellphone="+phoneValue;
		postdata += "&connip="+returnCitySN["cip"];
		
		
		if(isSelect){
			 $.ajax({
	                type: "post",
	                contentType: "application/json",
	                url: baseUrl+'/resourceManager/code',
	                contentType: 'application/x-www-form-urlencoded',
	                data: postdata,
	                dataType: "text",
	                async: true,
	                success: function (result) {
	                    HandleCodeAjaxSuccess(result);
	                },
	                error: function (errorMsg) {
						showDiag("登录失败，请重新尝试");
						$('.ok').click(function () {
							deleteDiag();				
						});
						$('.userInput').focus();
	                }
	            });
		}else{
			showDiag("请阅读《软件使用和用户注册协议》");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showSuccessDialog("请阅读《软件使用和用户注册协议》");
//			showWarningDialog("请阅读《软件使用和用户注册协议》");
//			showErrorDialog("请阅读《软件使用和用户注册协议》");
		}
		
	});
});

function HandleCodeAjaxSuccess(result) {
	var jsonObj = jQuery.parseJSON(result);
	var flag = jsonObj["flag"];
	var msg = jsonObj["msg"];
	if(flag=="0"){
		var prefix = jsonObj["prefix"];
		var cellphone = jsonObj["cellphone"];
		window.location.href = "msglogin_verify.html?phone="+cellphone+"&"+prefix+"_"+cellphone;
	}else{//有错误
		showErrorDialog(msg);
	}

}