$(function () {
	
	var postdata = "";
	postdata += "uid="+$.cookie('uid');
	postdata += "&ver="+$.cookie('ver');
	postdata += "&token="+$.cookie('token');
	
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/server/getAllServerLangByUid',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];
	            var serverLangList = jsonObj["serverLang"]
	            if(flag=="0"){
	            	var html = "";
	            	for(var i=0; i < serverLangList.length ; i++){
	            		var serverLang = serverLangList[i];
	            		html +='<tr class=\"tr\"><td class=\"index\">'+(i+1)+'</td><td class=\"content\">'+serverLang.title+'</td><td class=\"endtime\">有效期至： '+serverLang.dueDate+'</td></tr>';
	            	}
	            	$("#server").html(html);

	            }
	            if(flag=="2"){
//	            	showWarningDialog("没有已开通的服务");
	            	var html = '<tr class=\"tr2\"><td class=\"content\">没有查询到对应记录</td></tr>';
	            	$("#server").html(html);
	            }
	            if(flag=="1"){
	            	showWarningDialog("登录过期，重新登录再尝试");
	            }
	        },
	        error: function (errorMsg) {
	        	showErrorDialog("查询服务初始化失败");
	        }
	    });
		var postdata2 = "";
		postdata2 += "uid="+$.cookie('uid');
		postdata2 += "&ver="+$.cookie('ver');
		postdata2 += "&token="+$.cookie('token');
		
			$.ajax({
		        type: "post",
		        contentType: "application/json",
		        url: baseUrl+'/server/getNotHaveServerLangByUid',
		        contentType: 'application/x-www-form-urlencoded',
		        data: postdata2,
		        dataType: "text",
		        async: true,
		        success: function (result) {
		            var jsonObj = jQuery.parseJSON(result);
		            var flag = jsonObj["flag"];
		            var serverLangList = jsonObj["serverLang"]
		            if(flag=="0"){
		            	var html = "";
		            	for(var i=0; i < serverLangList.length ; i++){
		            		var serverLang = serverLangList[i];
		            		html +='<tr class=\"tr2\"><td class=\"checkbox\"><input type=\"checkbox\" id=\"checkBox\"></td><td class=\"index\">'+(i+1)+'</td><td class=\"content\">'+serverLang.title+'</td><td class=\"rmb\">原价 <span class=\"ssl_item\"><span>￥'+serverLang.rmb+'.00</span><div class=\"line\"></div></span></td><td class=\"viprmb\">优惠价 ￥'+serverLang.viprmb+'.00</td><td class=\"opt\">购买</td></tr>';
		            	}
		            	$("#didnot").html(html);
		            }
		            if(flag=="2"){
		            	var html = '<tr class=\"tr2\"><td class=\"content\">没有查询到对应记录</td></tr>';
		            	$("#didnot").html(html);
//		            	showWarningDialog("没有未开通的服务");
		            }
		            if(flag=="1"){
		            	showWarningDialog("登录过期，重新登录再尝试");
		            }
		        },
		        error: function (errorMsg) {
		        	showErrorDialog("查询服务初始化失败");
		        }
		    });
});

















//showSuccessDialog("请阅读《软件使用和用户注册协议》");
//showWarningDialog("请阅读《软件使用和用户注册协议》");
//showErrorDialog("请阅读《软件使用和用户注册协议》");