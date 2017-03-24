var searchKey = "开关教育";

$(function () {
	searchKey = getRequestStringdecodeURI("kw");
	if(searchKey!="" && searchKey!=null && searchKey!=undefined){
		$("#iframedict").attr("src","http://dict.baidu.com/s?wd="+searchKey);
	}else{
		$("#iframedict").attr("src","http://dict.baidu.com/s");
	}
	
	$(".bing").hide();
	$(".baidu").hide();
	
	$(".searchlogo").click(function(){
		window.location.href = "./search.html?kw="+searchKey;
//		getSearchUrl();
	});
	
	
	$("ul li").click(function(){

		var lastId = "";
		//所有的li标签
		var li = $("ul li");
		//遍历出class=on的标签，说明就是上次的活动标签
		for (var i = 0; i < li.length; i++) {
			var l = li[i];
			if(l.className = "on"){
				lastId = l.id;
				l.className = "";
			}
		}
		this.className = "on";
		var id = this.id;
		
//		var win = document.getElementById("iframe"+lastId).contentWindow;
//		console.log( win.document.body.innerText );
//		alert( win.document.body.innerText );
//		var srcs = document.getElementById("iframe"+lastId).src;
//		console.log("kwwww:"+decodeURI(srcs));
		
		
		
		if(id=="bing"){
			$(".bing").show();
			$(".baidu").hide();
			$(".baidudict").hide();
			if(searchKey!="" && searchKey!=null && searchKey!=undefined){
				$("#iframebing").attr("src","http://hk.bing.com/search?q="+searchKey);
			}else{
				$("#iframebing").attr("src","http://hk.bing.com/search");
			}
//			console.log(searchKey);
		}else if(id=="dict"){
			$(".bing").hide();
			$(".baidu").hide();
			$(".baidudict").show();
			if(searchKey!="" && searchKey!=null && searchKey!=undefined){
				$("#iframedict").attr("src","http://dict.baidu.com/s?wd="+searchKey);
			}else{
				$("#iframedict").attr("src","http://dict.baidu.com/s");
			}
			
//			console.log(searchKey);
		}else if(id=="baidu"){
			$(".bing").hide();
			$(".baidu").show();
			$(".baidudict").hide();
			if(searchKey!="" && searchKey!=null && searchKey!=undefined){
				$("#iframebaidu").attr("src","http://m.baidu.com/s?word="+searchKey);
//				$("#iframebaidu").attr("src","https://www.baidu.com/s?wd="+searchKey);
			}else{
				$("#iframebaidu").attr("src","http://m.baidu.com/s");
//				$("#iframebaidu").attr("src","https://www.baidu.com/s");
			}
			
//			console.log(searchKey);
		}
		
		
	});
	
});

function getSearchUrl(){
	
	var _search = window.location.search;
	console.log("url1:"+_search);
	console.log("url2:"+decodeURI(_search));
}

function setSearchKw(value){
	searchKey = value;
}