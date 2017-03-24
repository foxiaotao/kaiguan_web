var newsPageSize = 3;
$(function () {

	if ($.cookie('token') == null) {
        window.location.href = "../relogin.html";
    }
	initNews(1,newsPageSize);
})

function initNews(currentPage,pageSize){
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/news/getNews',
        contentType: 'application/x-www-form-urlencoded',
        data: "currentPage="+currentPage+"&pageSize="+pageSize,
        dataType: "text",
        async: true,
        success: function (result) {
            var jsonObj = jQuery.parseJSON(result);
            var currentPage = jsonObj["currentPage"];
            var totalPage = jsonObj["totalPage"];
            pageSize = jsonObj["pageSize"];
            var startNum = jsonObj["startNum"];
            var endNum = jsonObj["endNum"];
            
            $("#news_count").text("新鲜事("+(totalPage*pageSize)+")");
            
            var html = "";
            var newsList = jsonObj["rows"];
            for (var  i= 0; i < newsList.length; i++) {
				var news = newsList[i];
				//子项内容
				var itemcontent = jQuery.parseJSON(news.itemcontent);
				var item = itemcontent[0];
				
				
				html += '<a href="'+item.eventurl+'" target="news" class="news">';
				html += '<img src="'+item.picurl+'">';
				html += '<span class="news1">'+item.caption+'</span>';
				html += '<span class="news2">'+item.abstrac+'</span>';
//				html += '<span class="news2">2015年十大魔力APP双语新闻：10 Apps We Were Obsessed With in 2015.2015年十大魔力APP</span>
				html += '<span class="date">'+news.issuetimeStr.substring(0,19)+'</span>';
				html += '</a>';
				
				
//===========================================================================================				
				/*
				html += '<div class="newsCont">                                                                  ';
				//第一条
				html += '	<h3>                                                                                 ';
				
				html += '<a href="'+itemcontent[0].eventurl+'" target="_blank" style="width:50%;">';
				html += '		<span class="title" style="width:100%;">'+itemcontent[0].caption+'</span>     ';
				html += '</a>';
				
				html += '		<span class="date">'+news.issuetimeStr.substring(0,19)+'</span>                     ';
				html += '		<img src="'+news.webpicurl+'" alt="" class="title">                    ';
				html += '	</h3>                                                                                   ';
				//子项item
				for (var j = 1; j < itemcontent.length; j++) {
					var item = itemcontent[j];
					
					html += '	<div class="content">                                                                   ';
					html += '		<img src="'+item.picurl+'" alt="">                                ';
					
					html += '<a href="'+item.eventurl+'" target="_blank">';
					html += '<span class="contTitle">'+item.caption+'</span>';
					html += '</a>';
					
//					html += '		<span class="contTitle">双语新闻：我简直太生气了 我要被这个大傻子气死了 简直气死了</span>';
//					html += '		<span class="contDetail">双语新闻：你有什么话好说妈妈？说啥呀 不说了</span>          ';
					if(typeof(item.abstrac) == "undefined")
						item.abstrac = "";
					html += '		<span class="contDetail">'+item.abstrac+'</span>          ';
					html += '	</div>                                                                                  ';
					
				}
				html += '</div>                                                                                  '*/;
			}
            
            $("#newsList").html(html);
        },
        error: function (errorMsg) {
        }
    });
}
function getItemType(type){
	if(type="news"){
		return "双语新闻";
	}
	if(type="joke"){
		return "双语笑林";
	}
	if(type="newsflash"){
		return "特快信息";
	}
	if(type="version"){
		return "版本发布/内容更新";
	}
}