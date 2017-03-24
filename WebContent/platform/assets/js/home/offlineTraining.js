var pageSize = 4;
var subjectid = "001002";

$(function () {

	if ($.cookie('token') == null) {
        window.location.href = "../relogin.html";
    }
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
            
            html += '<h3><span>线下培训</span><a href="../language/training/offlineTraining.html">查看更多>></a></h3>';
            
            for (var  i= 0; i < trainingList.length; i++) {
				var training = trainingList[i];
				//子项内容
				
				if(training.trainingtype == "one"){
					html += '<a class="train" href="' + '../language/training/trainingCourse.html?trainingid='+training.id;
					html += '" target="offlineTraining">';
						
					html += '<img src="'+training.pic+'">';
					html += '<span>'+training.title+'</span>';
					
					html += '</a>';
					
				}else if(training.trainingtype == "multi"){
					html += '<a href="javascript:;" class="train">';
						
					html += '<img src="'+training.pic+'">';
					html += '<span>'+training.title+'</span><span class="right">敬请期待......&nbsp;</span>';
					
					html += '</a>';
				}
				
            }
            $("#cont1").html(html);

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