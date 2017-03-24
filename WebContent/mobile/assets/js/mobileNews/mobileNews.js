var html = "";
var pageSize = 5;
var currentPage = 1;
var lastItemId = 0;//点之前 最后一个id（再点之后 值=thisItemId）
var thisItemId = 0;//点之后最后一个id
jQuery(document).ready(function () {
	

	init("init");
    $("#moreSpan").click(function(){
    	currentPage++;
    	init("more");
    });
    
});
function init(type){
	var postdata = "pageSize="+pageSize+"&currentPage="+currentPage;
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/phoneweb/news/getNewsPage',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
        	var jsonObj = jQuery.parseJSON(result);
            var newsList = jsonObj["newsList"];
            //
            lastItemId = thisItemId;//10,为了第一次点击后，定位到id=10 的地方
            
            for (var i = 0; i < newsList.length; i++) {
            	var news = newsList[i];
            	var itemcontent = jQuery.parseJSON(news.itemcontent);
            	html += '<div class="cont" id="'+ (lastItemId+i) + '">                                             ';
    			html += '<div class="time">'+getLocalTimeDisplay(news.issuetime,news.issuetimeStr)+'</div>         ';
    			html += '<div class="content">                                                   ';
    			html += '	<div class="firstNews">                                              ';
    			html += '		<img src="'+itemcontent[0].picurl+'" alt="">                     ';
    			html += '		<h3>'+itemcontent[0].caption + "_" + news.eventid+'</h3>         ';
//    			html += '		<h3>'+itemcontent[0].caption+'</h3>                              ';
    			html += '	</div>                                                               ';
				for (var j = 1; j < itemcontent.length; j++) {
					var item = itemcontent[j];
					html += '	<div class="news">                                               ';
					html += '		<span>'+item.caption+'</span>                                ';
					html += '		<img src="'+item.picurl+'" alt="">                           ';
					html += '	</div>                                                           ';
				}
    			html += '</div>                                                                  ';
    			html += '</div>                                                                  ';
			}
            thisItemId = lastItemId + newsList.length;//记录第二点击 需要定位的点，也就是第三个集合的第一号元素20
    		$(".mobile").html(html);
    		$("#moreSpan").attr("style","display:block");
    		if(type == "more"){
    			window.location.href = "#"+lastItemId;
    		}
            console.log(lastItemId);
            console.log(thisItemId);
        },
        error: function (errorMsg) {
			showDiag("查询失败");
			$('.ok').click(function () {
				deleteDiag();		
			});
        }
    });
	
}
function getTimestamp() {
    return new Date().getTime();
}
function getLocalTimeDisplay(time,timeStr) {
	if(new Date().getTime()-time<3600*1000*24){
		return timeStr.substring(11,19);
	}
	if(new Date().getTime()-time<3600*1000*48 && new Date().getTime()-time>3600*1000*24){
		return "昨天 "+timeStr.substring(11,19);
	}
	return timeStr;
//	return new Date().getTime();
}
