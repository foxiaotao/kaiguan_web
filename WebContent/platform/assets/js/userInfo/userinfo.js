var pwo = "";
var pw = "";
var pwr = "";

$(function () {
	init();
    loadUserInfo();
    setTimeout(function(){
    	loadUserAccount();
    	loadUserCoupon();
    	loadNoteSpace();
    }, 200)
	
	$("#save").click(function(){
		var uid = $.cookie('uid');
        var chnname = $("#chnname").val();
        var engname = $("#engname").val();
        var cellphone = $("#cellphone").val();
        var realname = $("#realname").val();
        var addr = $("#addr").val();
        var city = $("#city").val();
		var postdata = "uid="+uid;
		postdata += "&chnname="+chnname;
		postdata += "&engname="+engname;
		postdata += "&cellphone="+cellphone;
		postdata += "&realname="+realname;
		postdata += "&addr="+addr;
		postdata += "&city="+city;
		editUserInfo(postdata);
	});
	
	updatePassword();
});
function init(){
	window.name = "user_info"
	$(".tab_content").hide(); //Hide all content  
    $("ul.tabs li:first").addClass("on").show(); //Activate first tab  
    $(".tab_content:first").show(); //Show first tab content  
    //On Click Event  
    $("ul.tabs li").click(function() {  
        $("ul.tabs li").removeClass("on"); //Remove any "on" class  
        $(this).addClass("on"); //Add "on" class to selected tab  
        $(".tab_content").hide(); //Hide all tab content  
        var onTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the on tab + content  
        $(onTab).fadeIn(); //Fade in the on content  
        return false;  
    }); 
}
function loadUserInfo(){

	//初始化，用户信息
	
	var uid = $.cookie('uid');
	var postdata = "uid="+uid;
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/user/getUser',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
        		//更新成功
        	    var jsonObj = jQuery.parseJSON(result);
        	    var flag = jsonObj["flag"];
        	    var user = jsonObj["user"];
        	    if(flag=="0"){
//        	    	showSuccessDialog("修改成功");
        	    	var uid = $.cookie('uid');
        	        var chnname = user["chnname"];
        	        var engname = user["engname"];
        	        var cellphone = user["cellphone"];
        	        var realname = user["realname"];
        	        var province = user["province"];
        	        var city = user["city"];
        	        var addr = user["addr"];
        	        
        	        if(typeof(chnname) == "undefined")
        	        	chnname = "";
        	        if(typeof(engname) == "undefined")
        	        	engname = "";
        	        if(typeof(realname) == "undefined")
        	        	realname = "";
        	        if(typeof(province) == "undefined")
        	        	province = "";
        	        if(typeof(city) == "undefined")
        	        	city = "";
        	        if(typeof(addr) == "undefined")
        	        	addr = "";
        	        
        	        
        	        $("#uid").val(uid);
        	        $("#chnname").val(chnname);
        	        $("#engname").val(engname);
        	        $("#cellphone").val(cellphone);
        	        $("#realname").val(realname);
        	        $("#city").val(city);
        	        $("#addr").val(addr);
        	        //span
        	        $(".uid").text(uid);
        	        $(".chnname").text(chnname);
        	        $(".engname").text(engname);
        	        $(".cellphone").text(cellphone);
        	        $(".realname").text(realname);
        	        $(".city").text(province+ " " + city+ " " + addr);
//        	        $(".addr").text(addr);
        	    }
        	    if(flag=="2"){
        	    	showDiag("查询失败");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        	    	showErrorDialog("查询失败");
        	    }
        	    if(flag=="1"){
        	    	showDiag("token错误或过期，请重新登录");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        	    	showWarningDialog("token错误或过期，请重新登录");
        	    }
        },
        error: function (errorMsg) {
        	showDiag("查询失败");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//        	showErrorDialog("查询失败");
        }
    });
}
function loadUserAccount(){
	var postdata = "";
	postdata += "uid="+$.cookie('uid');
	postdata += "&ver="+$.cookie('ver');
	postdata += "&token="+$.cookie('token');
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/resourceManager/balance/getBalanceByUid',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];
	            if(flag=="0" || flag=="2"){
	            	$("#balance").text(jsonObj["balance"]);
//	            	$("#coupon").text(jsonObj["couponCount"]);
	            }
	            if(flag=="1"){
	            	showDiag("登录过期，重新登录再尝试");
	                $('.ok').click(function () {
	                	deleteDiag();				
	                });
//	            	showWarningDialog("登录过期，重新登录再尝试");
	            }
	        },
	        error: function (errorMsg) {
	        	showDiag("账户信息初始化失败");
                $('.ok').click(function () {
                	deleteDiag();				
                });
//	        	showErrorDialog("账户信息初始化失败");
	        }
	    });
}
function loadUserCoupon(){
	var postdata = "";
	postdata += "uid="+$.cookie('uid');
	postdata += "&ver="+$.cookie('ver');
	postdata += "&token="+$.cookie('token');
	$.ajax({
		type: "post",
		contentType: "application/json",
		url: baseUrl+'/resourceManager/coupon',
		contentType: 'application/x-www-form-urlencoded',
		data: postdata,
		dataType: "text",
		async: true,
		success: function (result) {
			var jsonObj = jQuery.parseJSON(result);
			var flag = jsonObj["flag"];
			var couponList = jsonObj["couponList"];
			var msg = jsonObj["msg"];
			if(flag=="0"){
				var html = "";
				for (var int = 0; int < couponList.length; int++) {
					var array_element = couponList[int];
					html += '<div class=\"coupon\">';
					html += '<span class=\"coupon_title\">' + array_element.title + '(' + array_element.rmb + '元) &nbsp;&nbsp;&nbsp; ' + array_element.count + '张</span>';
					html += '<span class=\"coupon_date\">有效期至：' + array_element.endtimeStr.substring(0,10) + '</span>';
					html += '<span class=\"coupon_use\">未使用</span>';
					html += '</div>';
				}
				$("#coupon_content").html(html);
			}
			if(flag=="1"){
				showDiag("登录过期，重新登录再尝试");
                $('.ok').click(function () {
                	deleteDiag();				
                });
//				showWarningDialog("登录过期，重新登录再尝试");
			}
			if(flag=="2"){
				var html = "";
				html += '<div class=\"coupon\">';
				html += '<span class=\"coupon_title\">'+msg+'</span>';
				html += '<span class=\"coupon_date\"></span>';
				html += '<span class=\"coupon_use\"></span>';
				html += '</div>';
				$("#coupon_content").html(html);
			}
		},
		error: function (errorMsg) {
			showDiag("账户信息初始化失败");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//			showErrorDialog("账户信息初始化失败");
		}
	});
}
function loadNoteSpace(){
	var postdata = "";
	postdata += "uid="+$.cookie('uid');
	postdata += "&ver="+$.cookie('ver');
	postdata += "&token="+$.cookie('token');
	
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/resourceManager/note/getNoteScaleByUid',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];
	            if(flag=="0" || flag=="2"){
//	            	showSuccessDialog("修改密码成功");
	            	$("#sortage").text(jsonObj["noteScale"]);
	            }
	            if(flag=="1"){
	            	showDiag("登录过期，重新登录再尝试");
	                $('.ok').click(function () {
	                	deleteDiag();				
	                });
//	            	showWarningDialog("登录过期，重新登录再尝试");
	            }
	        },
	        error: function (errorMsg) {
	        	showDiag("统计信息初始化失败");
                $('.ok').click(function () {
                	deleteDiag();				
                });
//	        	showErrorDialog("统计信息初始化失败");
	        }
	    });
}

function updatePassword(){
	
	$("#passwordSave").click(function(){
		var password_old = $("#pwo").val();
		var password = $("#pw").val();
		var password_re = $("#pwr").val();
		if(password_old== "" || password_old == undefined){
			showDiag("原密码不能为空");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//			showWarningDialog("原密码不能为空");
			return ;
		}
		if(password== "" || password == undefined){
			showDiag("新密码不能为空");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//			showWarningDialog("新密码不能为空");
			return ;
		}
		if(password_re== "" || password_re == undefined){
			showDiag("重复新密码不能为空");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//			showWarningDialog("重复新密码不能为空");
			return ;
		}
		if(password != password_re){
			showDiag("两次密码输入不匹配");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//			showWarningDialog("两次密码输入不匹配");
			return ;
		}
		
		//js MD5加密
		var postdata = "pwo="+md5(password_old);
		postdata += "&pw="+md5(password);
		postdata += "&pwr="+md5(password_re);
//		var postdata = "pwo="+password_old;
//		postdata += "&pw="+password;
//		postdata += "&pwr="+password_re;
		postdata += "&uid="+$.cookie('uid');
		postdata += "&ver="+$.cookie('ver');
		postdata += "&token="+$.cookie('token');
		
		$("#sure").attr("disabled","disabled");
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/resourceManager/user/updatePassword',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
//	        	$("#sure").removeAttr("disabled");
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];
	            if(flag=="0"){
	            	showDiag("修改密码成功");
	                $('.ok').click(function () {
	                	deleteDiag();				
	                });
//	            	showSuccessDialog("修改密码成功");
	                //清空 input
	                resetInput();
	            }
	            if(flag=="1"){
	            	$("#sure").removeAttr("disabled");
	            	$("#sure").removeAttr("disabled");
	            	showDiag("两次输入的密码不匹配");
	                $('.ok').click(function () {
	                	deleteDiag();				
	                });
//	            	showWarningDialog("两次输入的密码不匹配");
	            }
	            if(flag=="2"){
	            	$("#sure").removeAttr("disabled");
	            	showDiag("原始密码错误");
	                $('.ok').click(function () {
	                	deleteDiag();				
	                });
//	            	showWarningDialog("原始密码错误");
	            }
	            if(flag=="3"){
	            	$("#sure").removeAttr("disabled");
	            	showDiag("修改密码失败");
	                $('.ok').click(function () {
	                	deleteDiag();				
	                });
//	            	showErrorDialog("修改密码失败");
	            }
	        },
	        error: function (errorMsg) {
	        	$("#sure").removeAttr("disabled");
	        	showDiag("修改密码失败");
                $('.ok').click(function () {
                	deleteDiag();				
                });
//	        	showErrorDialog("修改密码失败");
	        }
	    });
	});
	$("#passwordReset").click(function(){
		resetInput();
	});
	
	$("#xs").bind("click", function(){
		pwo = $("#pwo").val();
		pw = $("#pw").val();
		pwr = $("#pwr").val();
		
		$("#yc").attr("style","display:inline-block");
		$("#xs").attr("style","display:none");
		
		var html = "";
		html += '<p>请输入原始密码：<input type=\"text\" id=\"pwo\" value=\"'+pwo+'\" class=\"password\"></p>';
		html += '<p>请输入新的密码：<input type=\"text\" id=\"pw\" value=\"'+pw+'\" class=\"password\"></p>';
		html += '<p>请再次输入密码：<input type=\"text\" id=\"pwr\" value=\"'+pwr+'\" class=\"password\"></p>';
		$("#password_html").html(html);
	});
	$("#yc").bind("click", function(){
		pwo = $("#pwo").val();
		pw = $("#pw").val();
		pwr = $("#pwr").val();
		$("#xs").attr("style","display:inline-block");
		$("#yc").attr("style","display:none");
		var html = "";
		html += '<p>请输入原始密码：<input type=\"password\" id=\"pwo\" value=\"'+pwo+'\" class=\"password\"></p>';
		html += '<p>请输入新的密码：<input type=\"password\" id=\"pw\" value=\"'+pw+'\" class=\"password\"></p>';
		html += '<p>请再次输入密码：<input type=\"password\" id=\"pwr\" value=\"'+pwr+'\" class=\"password\"></p>';
		$("#password_html").html(html);
	});
}

function editUserInfo(postdata){
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/user/update',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
        		//更新成功
        	    var jsonObj = jQuery.parseJSON(result);
        	    var flag = jsonObj["flag"];
        	    if(flag=="0"){
        	        //span
        	        $(".uid").text($("#uid").val());
        	        $(".chnname").text( $("#chnname").val());
        	        $(".engname").text($("#engname").val());
        	        $(".cellphone").text($("#cellphone").val());
        	        $(".realname").text($("#realname").val());
        	        $(".city").text( $("#city").val());
        	        $(".addr").text( $("#addr").val());

        			$('.input').show();
        			$('#tab1 input').hide();
        			$('#tab1 .button #save,#tab1 .button #cancel').hide();
        			$('#tab1 .button #change').show();
        			
        			showDiag("修改成功");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        			showSuccessDialog("修改成功");
        	    }
        	    if(flag=="1"){
        	    	showDiag("修改失败");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        	    	showErrorDialog("修改失败");
        	    }
        	    if(flag=="2"){
        	    	showDiag("token错误或过期，请重新登录");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        	    	showWarningDialog("token错误或过期，请重新登录");
        	    }
        },
        error: function (errorMsg) {
        	showDiag("修改失败");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//        	showErrorDialog("修改失败");
        }
    });
}
function resetInput(){
	$("#pwo").val("");
	$("#pw").val("");
	$("#pwr").val("");
}
//showSuccessDialog("请阅读《软件使用和用户注册协议》");
//showWarningDialog("请阅读《软件使用和用户注册协议》");
//showErrorDialog("请阅读《软件使用和用户注册协议》");