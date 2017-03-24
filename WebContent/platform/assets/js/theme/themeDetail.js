var sunjectid = "001002";
var poolurl = "language/theme/";

$(function () {
	var redirect = getRequestString("id");
	if(redirect!=null){
		sunjectid = redirect.substring(0,6);
	}
	var textkey = getRequestString("key");
	$("#iframe_theme").attr("src",staticResUrl + poolurl + sunjectid+"/"+redirect+"/"+redirect+"-"+textkey+".html");
	
	
	$("#nav_theme_languageCenter").mouseenter(function(){
		$("#nav_theme_languageCenter").css("cursor","pointer");
		$("#nav_theme_languageCenter").attr("class","on");
	});
	$("#nav_theme_languageCenter").mouseleave(function(){
		$("#nav_theme_languageCenter").attr("class","");
	});
	
	$("#nav_theme_languageCenter").click(function(){
		location.href = "../../home/onlineReading.html"
	});
	
	
	$("#nav_theme_English").mouseenter(function(){
		$("#nav_theme_English").css("cursor","pointer");
		$("#nav_theme_English").attr("class","on");
	});
	$("#nav_theme_English").mouseleave(function(){
		$("#nav_theme_English").attr("class","");
	});
	
	$("#nav_theme_English").click(function(){
		location.href = "../langmain.html"
	});
	
	$("#nav_theme_theme").mouseenter(function(){
		$("#nav_theme_theme").css("cursor","pointer");
		$("#nav_theme_theme").attr("class","on");
	});
	$("#nav_theme_theme").mouseleave(function(){
		$("#nav_theme_theme").attr("class","");
	});
	
	$("#nav_theme_theme").click(function(){
		location.href = "./theme.html"
	});
});