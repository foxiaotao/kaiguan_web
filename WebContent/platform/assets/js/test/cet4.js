var poolurl = "language/test";

$(function () {
	
	$(".atitle").click(function(){
		var alist = $(".atitle");
		for (var i = 0; i < alist.length; i++) {
			var a = alist[i];
			$(a).removeClass("on");
		}
		$(this).addClass("on");
		if($(this).text()=="词汇分组"){
			$("#myIFrame").attr("src",staticResUrl + poolurl + "/001002x4/10/001002x4_060101_10_cet4word_01.html");
			$("#myIFrame20").attr("src",staticResUrl + poolurl + "/language/test/001002x4/20/001002x4_060101_20_cet4word_010101.html");
		}
		if($(this).text()=="词汇列表"){
			$("#myIFrame").attr("src",staticResUrl + poolurl + "/language/test/001002x4/10/001002x4_060201_10_cet4word_A.html");
			$("#myIFrame20").attr("src",staticResUrl + poolurl + "/language/test/001002x4/20/001002x4_060201_20_cet4word_A.html");
		}
	});
	
	
	
	aSignList = $(".chapterSign");
	for (var i = 0; i < aSignList.length; i++) {
		var a = aSignList[i];
		var href = $(a).attr("href");
		href = href.replace("#",staticResUrl + poolurl);
		$(a).attr("href",href);
	}
	aSignList = $(".aSign");
	for (var i = 0; i < aSignList.length; i++) {
		var a = aSignList[i];
		var href = $(a).attr("href");
		href = href.replace("#",staticResUrl + poolurl);
		$(a).attr("href",href);
	}
	var hrefFrame10 = $("#myIFrame").attr("src");
	hrefFrame10 = hrefFrame10.replace("#",staticResUrl + poolurl);
	$("#myIFrame").attr("src",hrefFrame10);
	var hrefFrame20 = $("#myIFrame20").attr("src");
	hrefFrame20 = hrefFrame20.replace("#",staticResUrl + poolurl);
	$("#myIFrame20").attr("src",hrefFrame20);
	
	
	
	/*$(".atitle").mousein(function(){
		var alist = $(".atitle");
		for (var i = 0; i < alist.length; i++) {
			var a = alist[i];
			$(a).removeClass("on");
		}
		$(this).addClass("on");
	});*/
	/*
	$(".atitle").hover(
		function () {
			var alist = $(".atitle");
			for (var i = 0; i < alist.length; i++) {
				var a = alist[i];
				$(a).removeClass("on");
			}
			$(this).addClass("on");
		},
		function () {
//		  $(this).removeClass("on");
		}
	);
	*/
//	$("#myIFrame").hide();
//	$("#myIFrame20").hide();
	
});
