

	var baseUrl = '/switchplatform'; 
	var userInfo_html = "/html/platform/home/home.html";//用户中心   local
	var learnEng_html = "/html/platform/home/onlineCourse.html";//学英语
	var languageCenter = "/html/platform/home/onlineCourse.html";//学英语
	var homeUrl = "/html/company/cooperation/cooperation.html";
	
//	var staticResUrl = 'http://192.168.3.144/staticpool/'; //local
//	var staticResUrl = 'http://192.168.3.144:8080/html/staticpool/'; //local
	var staticResUrl = 'http://static.getwant.com/staticpool/'; //local
		
//	var baseUrl = '/switchplatform/';//212
//	var userInfo_html = "/userInfo/userInfo.html";//用户中心	212
//	var learnEng_html = "/language/langmain.html";//学英语
//	var languageCenter = "/language/langmain.html";//学英语
//	var homeUrl = "http://www.getwant.com/company/cooperation/cooperation.html"
		
	
//===============================================================

	//var baseUrl = 'http://192.168.3.144:8080/resourceManager/resourceManager';
//	var userInfo_html = "/html/html/userInfo/userInfo.html";//用户中心
	
	
	function getRequestString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	function getRequestStringdecodeURI(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  decodeURI(r[2]); return null;
	}
	
	function getPoolidName(poolid){
		if(poolid == '001002x0'){
			return "语法篇";
		}
		if(poolid == '001002x1'){
			return "基础篇";
		}
		if(poolid == '001002x2'){
			return "场景篇";
		}
		if(poolid == '001002x3'){
			return "专业篇";
		}
		if(poolid == '001002x4'){
			return "文化篇";
		}
	}