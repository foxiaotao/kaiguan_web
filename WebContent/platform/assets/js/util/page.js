var currentPage = "";
var totalPage = "";
function getPageInitHtml(currentPage,totalPage,startNum,endNum){
	currentPage = currentPage;
	totalPage = totalPage;
	var html = "";
	html += '<center>                                                                                                ';
	html += '第'+currentPage+'页/共'+totalPage+'页&nbsp;&nbsp;                                                         ';
	html += '<input type="button" class="condition" param="1" value="首页"/>                             ';
	html += '<input type="button" class="condition" param="'+getLastPageParam(currentPage)+'" value="上一页"/>         ';
	for (var i = startNum; i <= endNum; i++) {
		if(currentPage == i){
			html += '	<span style="cursor: pointer;" class="condition on" param="'+i+'">'+i+'</span>          ';
		}else{
			html += '	<span style="cursor: pointer;" class="condition" param="'+i+'">'+i+'</span>          ';
		}
	}
	html += '<input class="condition" type="button" value="下一页" param="'+getNextPageParam(currentPage,totalPage)+'"/>&nbsp;&nbsp;';
	html += '<input class="condition" type="button" value="尾页" param="'+totalPage+'">&nbsp;&nbsp;                                                                      ';
	html += '                                                                                                                                                            ';
	html += '<input type="text" style="width: 40px" id="inputNum" value="'+currentPage+'" onchange="inputPageChange('+totalPage+')"/>  ';
	html += '<input class="condition" type="button" value="跳转" id="Gobutton" param=""/>&nbsp;&nbsp;                                                                      ';
//	html += '每页显示条数                                                                                                                                                          ';
	html += '<input type="hidden" style="width: 40px" id="pageSize" value="'+pageSize+'"/>                                                                                 ';
	html += '</center>                                                                                 ';
	
	return html;
}
//	<%--将输入框中的值赋给gobutton--%>
$().ready(function(){
		/*$("#inputNum").change(function(){
			var num = document.getElementById("inputNum").value;
			var maxNum = totalPage;
			if(parseInt(num)==num){
				if(num>0 && num<=maxNum){
						$("#Gobutton").attr("param",$(this).val());
					}
				else if(num>maxNum){
					alert("页码不足");
					document.getElementById("inputNum").value=maxNum;
				}
				else{
					alert("页码必须为正数");
					document.getElementById("inputNum").value=currentPage;
				}
			}
			else{
				alert("请输入合法页数");
				document.getElementById("inputNum").value=currentPage;
			}
		});*/
		$("#pageSize").change(function(){
			var num = document.getElementById("pageSize").value;
			if(parseInt(num)==num){
				if(num<0){
					alert("请输入正数限制")
				}
			}
			else{
				alert("请输入合法页数");
				document.getElementById("pageSize").value="10";
			}
		});
		
//<%--	给分页添加鼠标进入，退出时间--%>
		/*$("span[style='cursor: pointer;']").hover(function(){
			$(this).css("color","white");
		},function(){
			$(this).css("color","#fff");
		});*/
		
//	<%--给所有的分页查询添加事件--%>
		$("[class='condition']").unbind("click");
		$("[class='condition']").bind("click",function(){
			var currentPage = $(this).attr("param");
			var url = $("#action_url").val();
			var pageSize = $("#pageSize").val();
			$("#condition_form").attr("action",(url+"currentPage="+currentPage+"&pageSize="+pageSize));
			$("#condition_form").submit();
		});
});
function inputPageChange(totalPage){
	var num = document.getElementById("inputNum").value;
	var maxNum = totalPage;
	if(parseInt(num)==num){
		if(num>0 && num<=maxNum){
				$("#Gobutton").attr("param",num);
			}
		else if(num>maxNum){
			alert("页码不足");
			document.getElementById("inputNum").value=maxNum;
		}
		else{
			alert("页码必须为正数");
			document.getElementById("inputNum").value=currentPage;
		}
	}
	else{
		alert("请输入合法页数");
		document.getElementById("inputNum").value=currentPage;
	}
}
function getLastPageParam(currentPage){
	return currentPage>1?currentPage-1:1
}
function getNextPageParam(currentPage,totalPage){
	return currentPage<totalPage?currentPage+1:totalPage
}