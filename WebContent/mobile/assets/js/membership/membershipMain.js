
jQuery(document).ready(function () {
	

	
	init();
});
 
function init(){
	var uid = getRequestString("uid");
	var token = getRequestString("token");
	var lang = getRequestString("lang");
	
	var isCheck = true;
	//从传参中  获取uid
	if(uid==null || uid == "" || uid == undefined){
		//从本地cookie中获取uid，（是不是 cookie不为空，就不去验证了呢）
		uid = $.cookie("uid");
		if(uid==null || uid == "" || uid == undefined)
			window.location.href = "../login.html";
	}
	if(token==null || token == "" || token == undefined){
		token = $.cookie("token");
		if(token==null || token == "" || token == undefined){
			window.location.href = "../login.html";
		}else{
			isCheck = false;
		}
	}
	if(isCheck){
		var postdata = "uid="+uid + "&token="+ token + "&lang=" + lang;
		
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/phoneweb/membership/init',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
	        	var jsonObj = jQuery.parseJSON(result);
	            var isLogin = jsonObj["isLogin"];
	            if(isLogin == false){
	            	window.location.href = "../login.html";
	            }
	        },
	        error: function (errorMsg) {
	        	window.location.href = "../login.html";
	        }
	    });
	}
}