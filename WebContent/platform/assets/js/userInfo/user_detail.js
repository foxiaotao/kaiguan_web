var idnameOld = "";//修改的input 的id，也是userInfo 对应字段的name(上一次点击的)
var idnameNew = "";

var lastClickInputValue = "";//记录这次点击的input 的值
var lastOptHaveChangeed = "0"//是否保存编辑的文本框，1 change 0 没有 


$(function () {
	$("#chnname_change").click(function(){
		var currentId = this.id.split("_")[0];
		idnameNew = currentId;
		console.log(currentId);
		if(idnameOld!=""){
			if(idnameNew !=idnameOld){
//				console.log("还有未保存");
				showDiag("还有未保存的编辑操作");
				$('.ok').click(function () {
		            deleteDiag();	
		            console.log(1);
		        });
				return;
			}
		}else{
			//第一次点击
		}
		idnameOld = currentId;
		$("#chnname_save").show();
		$("#chnname_cancel").show();
		var valueOld = $("#chnname_span").text();
		$("#chnname_input").val(valueOld);
		$("#chnname_input").show();
		$("#chnname_span").hide();
		$("#chnname_change").hide();
		
	});
	$("#engname_change").click(function(){
		var currentId = this.id.split("_")[0];
		idnameNew = currentId;
		console.log(currentId);
		if(idnameOld!=""){
			if(idnameNew !=idnameOld){
				showDiag("还有未保存的编辑操作");
				$('.ok').click(function () {
		            deleteDiag();	
		            console.log(1);
		        });
				return;
			}
		}else{
			//第一次点击
		}
		idnameOld = currentId;
		
		$("#engname_save").show();
		$("#engname_cancel").show();
		var valueOld = $("#engname_span").text();
		$("#engname_input").val(valueOld);
		$("#engname_input").show();
		$("#engname_span").hide();
		$("#engname_change").hide();
		
	});
	$("#realname_change").click(function(){
		var currentId = this.id.split("_")[0];
		idnameNew = currentId;
		console.log(currentId);
		if(idnameOld!=""){
			if(idnameNew !=idnameOld){
				showDiag("还有未保存的编辑操作");
				$('.ok').click(function () {
		            deleteDiag();	
		            console.log(1);
		        });
				return;
			}
		}else{
			//第一次点击
		}
		idnameOld = currentId;
		$("#realname_save").show();
		$("#realname_cancel").show();
		var valueOld = $("#realname_span").text();
		$("#realname_input").val(valueOld);
		$("#realname_input").show();
		$("#realname_span").hide();
		$("#realname_change").hide();
		
	});
	

	$("#chnname_cancel").click(function(){
		idnameOld = "";
		$("#chnname_save").hide();
		$("#chnname_cancel").hide();
		var valueOld = $("#chnname_span").text();
		$("#chnname_input").val(valueOld);
		$("#chnname_input").hide();
		$("#chnname_span").show();
		$("#chnname_change").show();
	});

	$("#engname_cancel").click(function(){
		idnameOld = "";
		$("#engname_save").hide();
		$("#engname_cancel").hide();
		var valueOld = $("#engname_span").text();
		$("#engname_input").val(valueOld);
		$("#engname_input").hide();
		$("#engname_span").show();
		$("#engname_change").show();
	});
	$("#realname_cancel").click(function(){
		idnameOld = "";
		$("#realname_save").hide();
		$("#realname_cancel").hide();
		var valueOld = $("#realname_span").text();
		$("#realname_input").val(valueOld);
		$("#realname_input").hide();
		$("#realname_span").show();
		$("#realname_change").show();
	});
	$("#chnname_save").click(function(){
		var uid = $.cookie('uid');
        var chnname = $("#chnname_input").val();
		var postdata = "uid="+uid;
		postdata += "&chnname="+chnname;
		editUserInfo(postdata,"chnname");
	});
	$("#engname_save").click(function(){
		var uid = $.cookie('uid');
        var engname = $("#engname_input").val();
		var postdata = "uid="+uid;
		postdata += "&engname="+engname;
		editUserInfo(postdata,"engname");
	});
	
	$("#realname_save").click(function(){
		var uid = $.cookie('uid');
        var realname = $("#realname_input").val();
		var postdata = "uid="+uid;
		postdata += "&realname="+realname;
		editUserInfo(postdata,"realname");
	});
	
});
function editUserInfo(postdata,type){
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/user/update',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
        		//更新成功
        	    var jsonObj = jQuery.parseJSON(result);
        	    var flag = jsonObj["flag"];
        	    if(flag=="0"){
        	        //span
        	    	idnameOld = "";
        			$("#"+type+"_save").hide();
        			$("#"+type+"_cancel").hide();
        			var valueNew = $("#"+type+"_input").val();
        			$("#"+type+"_span").text(valueNew);
        			$("#"+type+"_input").hide();
        			$("#"+type+"_span").show();
        			$("#"+type+"_change").show();
        			
        			showDiag("修改成功");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        			showSuccessDialog("修改成功");
        	    }
        	    if(flag=="1"){
        	    	showDiag("修改失败");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        	    	showErrorDialog("修改失败");
        	    }
        	    if(flag=="2"){
        	    	showDiag("token错误或过期，请重新登录");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        	    	showWarningDialog("token错误或过期，请重新登录");
        	    }
        },
        error: function (errorMsg) {
        	showDiag("修改失败");
            $('.ok').click(function () {
            	deleteDiag();				
            });
//        	showErrorDialog("修改失败");
        }
    });
}