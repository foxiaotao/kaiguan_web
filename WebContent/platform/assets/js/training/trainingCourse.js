var pageSize = 4;
var trainingid = "";
var uid = "0"
$(function () {
	uid = $.cookie("uid");
	var trainingid_ = getRequestString("trainingid");
	if(trainingid_!=null && trainingid_!=undefined && trainingid_!="" ){
		trainingid = trainingid_;
	}
	init(1,pageSize);
	isJoinMe();
	
	
});
function isJoinMe(){
	
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/wtraining/getMemberCourseIds',
        contentType: 'application/x-www-form-urlencoded',
        data: "uid="+uid,
        dataType: "text",
        async: false,
        success: function (result) {
            var jsonObj = jQuery.parseJSON(result);
            var isFilterTrainingid = jsonObj["isFilterTrainingid"];
            var ids = jsonObj["ids"];

            var aList = $(".addMeIn");
            for (var i = 0; i < aList.length; i++) {
				var a = aList[i];
				if(trainingid == isFilterTrainingid){
					//filter表有记录，可以跳过报名
					$(a).addClass("filter");
				}
				if(ids !=undefined){
					if(ids.indexOf(a.id)>-1){
						//说明已经报名过了
						$(a).addClass("no");
						$(a).text("已报名");
					}
				}
				
			}
            join();
        },
        error: function (errorMsg) {
        }
    });
	
}
function join(){

	$(".addMeIn").click(function(){
		var className = this.className;
		var courseid = this.id;
		if(className.indexOf("filter")>-1){
			showDiag("您是活动会员，可直接参与课程培训");
			$('.ok').click(function () {
				deleteDiag();				
			});
			return;
		}
		if(className.indexOf("no")>-1){
			return;
		}
		//join in
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/wtraining/joinUs',
	        contentType: 'application/x-www-form-urlencoded',
	        data: "uid="+uid+"&courseid="+courseid+"&trainingid="+trainingid,
	        dataType: "text",
	        async: true,
	        success: function (result) {
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];

		        if(flag == "0"){
		        	showDiag("单词培训课程，报名成功");
					$('.ok').click(function () {
						deleteDiag();				
					});
					$("#"+courseid).addClass("no");
			        $("#"+courseid).text("已报名");
		        }
		        if(flag == "3001"){
		        	showDiag("课程已满");
		        	$('.ok').click(function () {
		        		deleteDiag();				
		        	});
		        }
	        },
	        error: function (errorMsg) {
	        }
	    });
		
	});
}

function init(currentPage,pageSize){
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/wtraining/trainingCoursePage',
        contentType: 'application/x-www-form-urlencoded',
        data: "currentPage="+currentPage+"&pageSize="+pageSize+"&trainingid="+trainingid,
        dataType: "text",
        async: false,
        success: function (result) {
            var jsonObj = jQuery.parseJSON(result);
            var currentPage = jsonObj["currentPage"];
            var totalPage = jsonObj["totalPage"];
            pageSize = jsonObj["pageSize"];
            var startNum = jsonObj["startNum"];
            var endNum = jsonObj["endNum"];
            

            var html = "";
            var trainingCourseList = jsonObj["rows"];
            
            for (var  i= 0; i < trainingCourseList.length; i++) {
				var tc = trainingCourseList[i];
				if(i==0){
					$("#course_desc").text(tc.desc);
					$("#course_pic1").attr("src",tc.pic);
				}
				if(1==1){
					$("#course_pic2").attr("src",tc.pic);
				}
//				tc.opentime == undefined ? "" : tc.opentime;
				//子项内容
				html += '<div class="course">                                                                              ';
				html += '<p class="center">                                                                                ';
				html += '	<span>'+tc.opentime == undefined ? "" : tc.opentime.substring(0,10)+'&nbsp;</span>                                             ';
				html += '	<span>'+getWeekday(tc.opentime)+'&nbsp;</span>                                                 ';
				html += '	<span>'+tc.opentime == undefined ? "" : tc.opentime.substring(11,16)+'</span>                                                  ';
				html += '</p>                                                                                              ';
				html += '<p>                                                                                               ';
				html += '	培训地点                                                                                       ';
				html += '	<span class="addr">'+tc.addr+'</span>                                                          ';
				html += '</p>                                                                                              ';
				html += '<p>                                                                                               ';
				html += '	费用：                                                                                         ';
				html += '	<span>'+tc.discountfee+'&nbsp;</span>                                                          ';
				html += '	名额：                                                                                         ';
				html += '	<span>'+tc.limitnumber+'&nbsp;</span>                                                          ';
				html += '	已报名：                                                                                       ';
				html += '	<span>'+tc.joinnumber+'</span>                                                                 ';
				html += '</p>                                                                                              ';
				html += '<p class="introduce">说明：<span></span></p>                                                      ';
				if(tc.limitnumber == tc.joinnumber){
					html += '	<a href="javascript:;" id="'+tc.courseid+'" class="addMeIn no">已&nbsp;满</a>   ';
				}else{
					html += '	<a href="javascript:;" id="'+tc.courseid+'" class="addMeIn" >报&nbsp;名</a>   ';
				}
				html += '</div>                                                                                            ';
            }
            $("#content").html(html);
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
    			isJoinMe();
    		});
//        	<%--给所有的分页查询添加事件--%>

        },
        error: function (errorMsg) {
        }
    });
}
function getWeekday(str){
	var cnum = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/-/g,"/");
	var date = new Date(str );
	var number = date.getDay();
	return "周"+cnum[number];
}
