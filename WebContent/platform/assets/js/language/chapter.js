var poolid = "001002x1";
var volume = "T10";
var previlegeStr = "";

$(function() {
	if ($.cookie('token') == null) {
        window.location.href = "../relogin.html";
    }
	
	poolid = getRequestString("poolid");
	
	if(poolid == "001002x1") {
		$("[name=poolid]").html("基础篇");
		$("[name=img]").attr('src', '../assets/img/course/chapter1.png');
	} else if(poolid == "001002x0") {
		$("[name=poolid]").html("语法篇");
		$("[name=img]").attr('src', '../assets/img/course/chapter2.png');
	} else if(poolid == "001002x2") {
		$("[name=poolid]").html("场景篇");
		$("[name=img]").attr('src', '../assets/img/course/chapter3.png');
	} else if(poolid == "001002x3") {
		$("[name=poolid]").html("专业篇");
		$("[name=img]").attr('src', '../assets/img/course/chapter4.png');
	} else if(poolid == "001002x4") {
		$("[name=poolid]").html("考试篇");
		$("[name=img]").attr('src', '../assets/img/course/chapter5.png');
	}
	
	window.name = "chapter";
	$(".tab_content").hide(); //Hide all content  
    $("ul.tabs li:first").addClass("on").show(); //Activate first tab  
    $(".tab_content:first").show(); //Show first tab content  
    //On Click Event  
    $("ul.tabs li").click(function() {  
        $("ul.tabs li").removeClass("on"); //Remove any "on" class  
        $(this).addClass("on"); //Add "on" class to selected tab  
        $(".tab_content").hide(); //Hide all tab content  
        var onTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the on tab + content  
        if("#tab1" == onTab){
        	volume = "T10";
        }
        if("#tab2" == onTab){
        	volume = "T20";
        }
        if("#tab3" == onTab){
        	volume = "T30";
        }
        $(onTab).fadeIn(); //Fade in the on content  
        return false;  
    }); 
	
    
    
    
	//T10
	var menuajaxT10 = $.ajax({ url: baseUrl + "/file/getMenujsonVolume?poolid="+poolid+"&volume=T10", async: false });
	var menuObjT10 = jQuery.parseJSON(menuajaxT10.responseText);
	showJsTree("tab1",menuObjT10);
	//T20
	var menuajaxT20 = $.ajax({ url: baseUrl + "/file/getMenujsonVolume?poolid="+poolid+"&volume=T20", async: false });
	var menuObjT20 = jQuery.parseJSON(menuajaxT20.responseText);
	showJsTree("tab2",menuObjT20);
	//T30
	var menuajaxT30 = $.ajax({ url: baseUrl + "/file/getMenujsonVolume?poolid="+poolid+"&volume=T30", async: false });
	var menuObjT30 = jQuery.parseJSON(menuajaxT30.responseText);
	showJsTree("tab3",menuObjT30);
});


function showJsTree(divId,data){
	$('#'+divId).jstree({
		'plugins' : [ "wholerow" ],
//		'plugins' : [ "wholerow", "checkbox" ],//checkbox有选择框，wholerow颜色多选
		'core' : {
			'data' : data
		}
	}).bind('click.jstree', function(event) {             
	        var eventNodeName = event.target.nodeName;               
	        if (eventNodeName == 'INS') {                   
	            return;               
	        } else if (eventNodeName == 'A') {                   
	            var $subject = $(event.target).parent();                   
	            if ($subject.find('ul').length > 0) {            
	            } else { 
	            	//初始化权限
	            	getPrivilge();
	                previlegeStr = $.cookie("previlegeStr");
	                //选择的id值
	            	var id = $(event.target).parents('li').attr('id');
	            	var itemid = id.split("_")[1];
	            	var chapter = itemid.substring(0,2);
	            	var pri = poolid+"_"+chapter;
	            	var title = $(event.target).text();
//	            	console.log($(event.target).parents('li').attr('id'));
//	            	console.log($(event.target).parents('li').attr('id').length);
	            	if(poolid == "001002x1"){
	            		if(previlegeStr.indexOf(pri)>-1){
		            		if ($("#"+id).hasClass('jstree-leaf')) { 
		            			window.location.href = './chapterContent.html?poolid='+poolid+"&itemid="+itemid+"&volume="+volume+"&itemtitle="+title;
		            		}
		            	}else{
		            		showDiag("非试用章节，请购买网络会员！");
		                    $('.ok').click(function () {
		                        deleteDiag();
		                    });
		            	}
	            	}else{
	            		if ($("#"+id).hasClass('jstree-leaf')) { 
	            			window.location.href = './chapterContent.html?poolid='+poolid+"&itemid="+itemid+"&volume="+volume+"&itemtitle="+title;
	            		}
	            	}
	            	
	            }               
	        }           
	}).bind("select_node.jstree", function (event, data) {   //myThis.id 是jstree的Id,还有你必须设置每个节点的id
		var node = data.node, inst = data.instance;
		if ($("#"+node.id).hasClass('jstree-closed')) { return inst.open_node(node); }
	    if ($("#"+node.id).hasClass('jstree-open')) { return inst.close_node(node); }
    });
}

function getPrivilge(){
	
	var uid = $.cookie("uid");
	var postdata = "poolid="+poolid+"&uid="+uid;
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/wprivilege/privileges',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
        	var jsonObj = jQuery.parseJSON(result);
        	var cookietime = new Date();
            cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000 * 3));//coockie保存三小时
            $.cookie('previlegeStr', jsonObj["previlegeStr"], { expires: cookietime, path: '/' });
        },
        error: function (errorMsg) {
        }
    });
}