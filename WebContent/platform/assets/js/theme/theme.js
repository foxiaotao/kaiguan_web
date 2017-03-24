$(function () {
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
	$('h4').height( $('.detailLink').width()*0.2);
	$('h4').css("line-height",$('.detailLink').width()*0.2 + 'px');
	$('h4').css("margin-top",$('.detailLink').width()*0.8);
	
	
	
	
});