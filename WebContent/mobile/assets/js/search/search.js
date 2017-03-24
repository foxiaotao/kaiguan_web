
jQuery(document).ready(function () {
	
	var searchKey = getRequestStringdecodeURI("kw");
	if(searchKey!="" && searchKey!=null && searchKey!=undefined){
		$(".searchInput").val(searchKey);
	}else{
		$(".searchInput").val("");
	}
	
	$(".searchA").click(function(){
		var kw = $(".searchInput").val();
		window.location.href = "./detailSearch.html?kw="+kw;
	});
	
	
	
	var uid = getRequestString("uid");
	var token = getRequestString("token");
	var lang = getRequestString("lang");
	
	var hrefValue = $(".homepage").attr("href");
	hrefValue += "?uid="+uid+"&token="+token+"&lang="+lang;
	$(".homepage").attr("href",hrefValue);
});
