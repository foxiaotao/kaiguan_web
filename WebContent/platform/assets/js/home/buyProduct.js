var html_tab1 = "";
var html_tab2 = "";
var currentType = "net";
$(document).ready(function() {  
	init();
//	$("a[name='tab1_2']").click(function(){
//		if(html_tab2 == ""){
//			loadUserWillService();
//		}
//	});
});  
function init(){
    
    //默认请求 开关英语套件，未购买服务
    loadUserWillService();
	
}
function loadUserWillService(){
	 var postdata = "";
		postdata += "uid="+$.cookie('uid');
		postdata += "&ver="+$.cookie('ver');
		postdata += "&token="+$.cookie('token');
		postdata += "&type=net";
	
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
	            		
	            		html += '<div class="detail">';
						html += '<h4>';
						html += '	<img src="../assets/img/product/buyproduct.jpg">';
						html += '	<span class="name" title="'+ serverLang.title + '">'+ serverLang.title + '</span>';
						html += '</h4>';
						html += '<span title="'+ serverLang.desc + '">'+serverLang.desc.substring(1,35)+'...</span>';
						html += '<span class="cross">原价：'+serverLang.rmb + '元</span>';
						html += '<span class="price">活动价：'+serverLang.viprmb + '元</span>';
						html += '<a href="../productService/serviceOrder.html?type='+ serverLang.type + '&price='+serverLang.viprmb + '&serviceId='+serverLang.servid + '&title='+serverLang.title + '\" class=\"buy\" target="_blank">我要购买</a>';
						html += '</div>';
	            	}
	            	html_tab2 = html;
            	}else{
            		html += '<div class=\"service_detail\">';
					html += '<h3>已经没有未购买服务了</h3>';
					html += '</div>';
            	}
            	$("#product_list").html(html);
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