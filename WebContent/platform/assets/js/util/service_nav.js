$(function () {
	//suit net book


	
	//--------------
	
	
	
	
	// suit
	$("#nav_suit_serviceCenter").mouseenter(function(){
		$("#nav_suit_serviceCenter").css("cursor","pointer");
		$("#nav_suit_serviceCenter").attr("class","on");
	});
	$("#nav_suit_serviceCenter").mouseleave(function(){
		$("#nav_suit_serviceCenter").attr("class","");
	});
	
	$("#nav_suit_serviceCenter").click(function(){
		location.href = "./servicemain.html"
	});
	//--------------
	$("#nav_suit_suit").mouseenter(function(){
		$("#nav_suit_suit").css("cursor","pointer");
		$("#nav_suit_suit").attr("class","on");
	});
	$("#nav_suit_suit").mouseleave(function(){
		$("#nav_suit_suit").attr("class","");
	});
	
	$("#nav_suit_suit").click(function(){
		location.href = "./userservice.html"
	});
	//--------------
	
	
	//net
	$("#nav_net_serviceCenter").mouseenter(function(){
		$("#nav_net_serviceCenter").css("cursor","pointer");
		$("#nav_net_serviceCenter").attr("class","on");
	});
	$("#nav_net_serviceCenter").mouseleave(function(){
		$("#nav_net_serviceCenter").attr("class","");
	});
	
	$("#nav_net_serviceCenter").click(function(){
		location.href = "./servicemain.html"
	});
	//--------------
	$("#nav_net_net").mouseenter(function(){
		$("#nav_net_net").css("cursor","pointer");
		$("#nav_net_net").attr("class","on");
	});
	$("#nav_net_net").mouseleave(function(){
		$("#nav_net_net").attr("class","");
	});
	
	$("#nav_net_net").click(function(){
		location.href = "./userservice_net.html"
	});
	//--------------
	
	
	//book
	$("#nav_book_serviceCenter").mouseenter(function(){
		$("#nav_book_serviceCenter").css("cursor","pointer");
		$("#nav_book_serviceCenter").attr("class","on");
	});
	$("#nav_book_serviceCenter").mouseleave(function(){
		$("#nav_book_serviceCenter").attr("class","");
	});
	
	$("#nav_book_serviceCenter").click(function(){
		location.href = "./servicemain.html"
	});
	//--------------
	$("#nav_book_book").mouseenter(function(){
		$("#nav_book_book").css("cursor","pointer");
		$("#nav_book_book").attr("class","on");
	});
	$("#nav_book_book").mouseleave(function(){
		$("#nav_book_book").attr("class","");
	});
	
	$("#nav_book_book").click(function(){
		location.href = "./userservice_book.html"
	});
	//--------------
	
	
	//training 
	$("#training_nav_languageCenter").mouseenter(function(){
		$("#training_nav_languageCenter").css("cursor","pointer");
		$("#training_nav_languageCenter").attr("class","on");
	});
	$("#training_nav_languageCenter").mouseleave(function(){
		$("#training_nav_languageCenter").attr("class","");
	});
	
	$("#training_nav_languageCenter").click(function(){
		location.href = "../../home/offlineTraining.html#cont1"
	});
	$("#training_nav_English").mouseenter(function(){
		$("#training_nav_English").css("cursor","pointer");
		$("#training_nav_English").attr("class","on");
	});
	$("#training_nav_English").mouseleave(function(){
		$("#training_nav_English").attr("class","");
	});
	
	$("#training_nav_English").click(function(){
		location.href = "../langmain.html"
	});
	
	
	
	//training  end
});