	

jQuery(document).ready(function () {

	var uid = getRequestString("uid");
	var token = getRequestString("token");
	var lang = getRequestString("lang");
	
	var hrefValue = $("#membership_a").attr("href");
	hrefValue += "?uid="+uid+"&token="+token+"&lang="+lang;
	$("#membership_a").attr("href",hrefValue);
    
});