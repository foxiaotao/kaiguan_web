$(function () {
    var poolid = getRequestString("poolid");
	var learnEng_html = "../../language/langmain.html";//学英语
	
	//=================用户中心=============================
//	var userInfo_html = "/html/html/userInfo/userInfo.html";//用户中心
//	var userInfo_html = "/html/userInfo/userInfo.html";//用户中心
//	var userInfo_html = userInfo_html;//用户中心
	//=================用户中心=============================
	
	$("#userIndextable").click(function () {
		window.location.href = userInfo_html;
	});
	$("#resourcetable").click(function () {//资源
		window.location.href = learnEng_html;
	});

	
	$("#lenEntable").click(function () {
        window.location.href = learnEng_html;
    });
	
	
	$("#basetable").text(getPoolidName(poolid));
	
});