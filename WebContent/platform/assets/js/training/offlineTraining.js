var pageSize = 2;
var subjectid = "001002";

$(function () {
	
	var subjectIdUrl = getRequestString("subjectid");
	if(subjectIdUrl!=null && subjectIdUrl!=undefined && subjectIdUrl!="" ){
		subjectid = subjectIdUrl;
	}
	
	init(1,pageSize);
	
	
});
function init(currentPage,pageSize){
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/wtraining/trainingPage',
        contentType: 'application/x-www-form-urlencoded',
        data: "currentPage="+currentPage+"&pageSize="+pageSize+"&subjectid="+subjectid,
        dataType: "text",
        async: true,
        success: function (result) {
            var jsonObj = jQuery.parseJSON(result);
            var currentPage = jsonObj["currentPage"];
            var totalPage = jsonObj["totalPage"];
            pageSize = jsonObj["pageSize"];
            var startNum = jsonObj["startNum"];
            var endNum = jsonObj["endNum"];
            
            var html = "";
            var trainingList = jsonObj["rows"];
            for (var  i= 0; i < trainingList.length; i++) {
				var training = trainingList[i];
				//子项内容
				html += '<li>';
				if(training.trainingtype == "one"){
					html += '<a href="trainingCourse.html?trainingid='+training.id+'" target="offlineTraining" class="trainLink offline001002train1">  ';
					html += '    <img alt="" src="'+training.pic+'">                                                          ';
					html += '	<h4><span>'+training.title+'</span></h4>                                                     ';
				}else if(training.trainingtype == "multi"){
					html += '<a href="javascript:;" class="trainLink offline001002train1">                                    ';
//					html += '<a href="trainingCourse.html?trainingid='+training.id+'" class="trainLink offline001002train1">  ';
					html += '    <img alt="" src="'+training.pic+'">                                                          ';
					html += '	<h4><span>'+training.title+'</span><span class="date">敬请期待......&nbsp;</span></h4>       ';
				}
				html += '</a>                                                                                                 ';
				html += '</li>                                                                                                ';
            }
            $(".content").html(html);
        	$("#pageInitHtml").html(getPageInitHtml(currentPage,totalPage,startNum,endNum));
//    	<%--给所有的分页查询添加事件--%>
        	$("span[style='cursor: pointer;']").hover(function(){
        		$(this).css("color","#ebb450");
    		},function(){
    			$(this).css("color","black");
    		});
    		
    		$("[class='condition']").unbind("click");
    		$("[class='condition']").bind("click",function(){
    			var currentPage = $(this).attr("param");
    			var url = $("#action_url").val();
    			init(currentPage,pageSize);
    		});
//        	<%--给所有的分页查询添加事件--%>

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