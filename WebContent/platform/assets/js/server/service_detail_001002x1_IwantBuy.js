$(document).ready(function() {
	var serviceId = getRequestStringdecodeURI("serviceId");
	var price = getRequestStringdecodeURI("price");
	var title = getRequestStringdecodeURI("title");
	var type = getRequestStringdecodeURI("type");
	
	var urlSuit = "./serviceOrder.html?title="+title+"&price="+price+"&serviceId="+serviceId+"&type="+type;
	//三个  只有一个 id 存在 三个页面引用同一个js
	$("#IwantBuySuit").attr("href",urlSuit);
	$("#IwantBuyNet").attr("href",urlSuit);
	$("#IwantBuyBook").attr("href",urlSuit);
});