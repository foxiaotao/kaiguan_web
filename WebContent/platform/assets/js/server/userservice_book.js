var html_tab1 = "";
var html_tab2 = "";
var currentType = "book";
$(document).ready(function() {  
	init();
//	$("a[name='tab1_2']").click(function(){
//		if(html_tab2 == ""){
//			loadUserWillService();
//		}
//	});
});  
function init(){
	   //Default Action  
    $(".tab_content").hide(); //Hide all content  
    $("ul.tabs li:first").addClass("current").show(); //Activate first tab  
    $(".tab_content:first").show(); //Show first tab content  
    //On Click Event  
    $("ul.tabs li").click(function() {  
        $("ul.tabs li").removeClass("current"); //Remove any "current" class  
        $(this).addClass("current"); //Add "current" class to selected tab  
        $(".tab_content").hide(); //Hide all tab content  
        var currentTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the current tab + content  
        $(currentTab).fadeIn(); //Fade in the current content  
        return false;  
    });  
    $("div#tab1 .service_detail").mouseover(function(){
    	$(this).addClass("orange");//Add new class name
    });
    $("div#tab1 .service_detail").mouseout(function(){
    	$(this).removeClass("orange");//Add new class name
    });
    
    loadUserWillService();
    
    //默认请求 开关英语套件，已购买服务
    var token = $.cookie('token');
    var postdata = "";
	postdata += "uid="+$.cookie('uid');
	postdata += "&ver="+$.cookie('ver');
	postdata += "&token="+token;
	postdata += "&type=book";
	setTimeout(function(){
		if(token == null || token == "" || token == undefined || token == "null"){
		}else{
			loadUserService(postdata);//type=book
		}
	}, 500)
		//(学习套件/网络会员/书籍资料) href 
	$("#service_suit_nav").mouseenter(function(){
		$("#service_suit_nav").css("cursor","pointer");
		$("#service_suit_nav").attr("class","suit on");
	});
	$("#service_suit_nav").mouseleave(function(){
		if(currentType != "suit"){
			$("#service_suit_nav").attr("class","suit");
		}
	});
	
	$("#service_suit_nav").click(function(){
		location.href = "./userservice.html"
	});
	
	$("#service_net_nav").mouseenter(function(){
		$("#service_net_nav").css("cursor","pointer");
		$("#service_net_nav").attr("class","membership on");
	});
	$("#service_net_nav").mouseleave(function(){
		if(currentType != "net"){
			$("#service_net_nav").attr("class","membership");
		}
	});
	
	$("#service_net_nav").click(function(){
		location.href = "./userservice_net.html"
	});
	
	$("#service_book_nav").mouseenter(function(){
		$("#service_book_nav").css("cursor","pointer");
		$("#service_book_nav").attr("class","book on");
	});
	$("#service_book_nav").mouseleave(function(){
		if(currentType != "book"){
			$("#service_book_nav").attr("class","book");
		}
	});
	$("#service_book_nav").click(function(){
		location.href = "./userservice_book.html"
	});
	//(学习套件/网络会员/书籍资料) href   ==end
}
function loadUserService(postdata){
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/server/getUserServers',
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
            	if(serverLangList.length > 0){
	            	for(var i=0; i < serverLangList.length ; i++){
	            		var serverLang = serverLangList[i];
	            		html += '<div class=\"service_detail\">';
						html += '<h3>'+ (i+1) +'、'+ serverLang.title +'<span class="availabledate">有效期至'+serverLang.dueDate.substring(0,10)+'</span></h3>';
						html += '<a href=\"./'+serverLang.url+'?type='+ serverLang.type+ '&title='+serverLang.title + '\" class="button">详细介绍</a>';
						html += '<p>'+serverLang.desc+'</p>';
						html += '</div>';
						//serverLang.url,产品地址
	            	}
	            	html_tab1 = html;
            	}else{
            		html += '<div class=\"service_detail\">';
					html += '<h3>暂时您还未购买服务</h3>';
					html += '</div>';
            	}
            	$("#tab1").html(html);
            }
            if(flag=="2"){
//	            	showWarningDialog("没有已开通的服务");
            	var html = "";
            	html += '<div class=\"service_detail\">';
				html += '<h3>暂时您还未购买服务</h3>';
				html += '</div>';
            	$("#tab1").html(html);
            }
            if(flag=="1"){
            	showDiag("登录过期，重新登录再尝试");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
//            	showWarningDialog("登录过期，重新登录再尝试");
            }
        },
        error: function (errorMsg) {
        	showDiag("查询服务初始化失败");
			$('.ok').click(function () {
				deleteDiag();				
			});
//        	showErrorDialog("查询服务初始化失败");
        }
    });
}

function loadUserWillService(){
	 var postdata = "";
		postdata += "uid="+$.cookie('uid');
		postdata += "&ver="+$.cookie('ver');
		postdata += "&token="+$.cookie('token');
		postdata += "&type=book";
	
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/server/getServersNotHave',
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
            	if(serverLangList.length > 0){
	            	for(var i=0; i < serverLangList.length ; i++){
	            		var serverLang = serverLangList[i];
	            		html += '<div class=\"service_detail\">';
						html += '<h3>'+ (i+1) +'、'+ serverLang.title + '</h3>';
						html += '<p>'+serverLang.desc+'</p>';
						if(serverLang.url != null && serverLang.url != ""){
							html += '<a href=\"./'+serverLang.url+'?type='+ serverLang.type+ '&price='+serverLang.viprmb + '&title='+serverLang.title + '\" class="button">详细介绍</a>';
//							html += '<a href=\"./serviceOrder.html?type='+ serverLang.type + '&price='+serverLang.viprmb + '&title='+serverLang.title + '\" class=\"button\">我要购买</a>';
						}else{
//							html += '<a href=\"#\" class=\"button\">详细介绍</a>';
//							html += '<a href=\"#\" class=\"button\">我要购买</a>';
						}
						html += '</div>';
	            	}
	            	html_tab2 = html;
            	}else{
            		html += '<div class=\"service_detail\">';
					html += '<h3>已经没有未购买服务了</h3>';
					html += '</div>';
            	}
            	$("#tab2").html(html);
            }
            if(flag=="2"){
//	            	showWarningDialog("没有已开通的服务");
            	var html = "";
            	html += '<div class=\"service_detail\">';
				html += '<h3>已经没有未购买服务了</h3>';
				html += '</div>';
            	$("#tab2").html(html);
            }
            if(flag=="1"){
            	showDiag("登录过期，重新登录再尝试");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
//            	showWarningDialog("登录过期，重新登录再尝试");
            }
        },
        error: function (errorMsg) {
        	showDiag("查询服务初始化失败");
			$('.ok').click(function () {
				deleteDiag();				
			});
//        	showErrorDialog("查询服务初始化失败");
        }
    });
}