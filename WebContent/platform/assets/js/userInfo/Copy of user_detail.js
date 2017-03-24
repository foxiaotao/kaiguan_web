var idnameOld = "";//修改的input 的id，也是userInfo 对应字段的name(上一次点击的)
var idnameNew = "";

var lastClickInputValue = "";//记录这次点击的input 的值
var lastOptHaveChangeed = "0"//是否保存编辑的文本框，1 change 0 没有 

$(function () {
	
	init();
	
	//修改
	$(".opt").click(function(){
		//修改之前检查有没有修改其他的文本框，提示是否保存
		if(lastOptHaveChangeed=="1"){
			if(confirm('您有未保存的修改编辑，是否保存？')){
				
			}else{//不保存
				$("#"+idnameNew).val(lastClickInputValue);//还原 原来的值
				lastOptHaveChangeed = "0";//恢复初始值
				//opt操作  文本框按钮 显示控制
				
				var gender = $("#gender").val();
				var $genders = $("#gender_hidden").children();
			    if(gender==1 ||gender== '男'){
			    	$genders[0].selected='selected';
			    }
			    if(gender==0 ||gender== '女'){
			    	$genders[1].selected='selected';
			    }
				$("#"+idnameNew+"_hidden").attr("style","display:none");
				optControllerOptButton(this);
			}
		}
		else{
			//opt操作 文本框按钮 显示控制
			
			if(idnameNew=='gender'){
				var gender = $("#gender").val();
				var $genders = $("#gender_hidden").children();
			    if(gender==1 ||gender== '男'){
			    	$genders[0].selected='selected';
			    }
			    if(gender==0 ||gender== '女'){
			    	$genders[1].selected='selected';
			    }
			    $("#gender_hidden").attr("style","display:none");
			}
			if(idnameNew=='birthday_s'){
				$("#birthday_s_hidden").attr("style","display:none");
				
				
			}
			optControllerOptButton(this);
		}
	});
	$(".opt_gender").click(function(){
		$("#birthday_s_hidden").attr("style","display:none");
		//修改之前检查有没有修改其他的文本框，提示是否保存
		if(lastOptHaveChangeed=="1"){
			if(confirm('您有未保存的修改编辑，是否保存？')){
				
			}else{//不保存
				$("#"+idnameNew).val(lastClickInputValue);//还原 原来的值
				lastOptHaveChangeed = "0";//恢复初始值
				//opt操作  文本框按钮 显示控制
				
				var gender = $("#gender").val();
				var $genders = $("#gender_hidden").children();
			    if(gender==1 ||gender== '男'){
			    	$genders[0].selected='selected';
			    }
			    if(gender==0 ||gender== '女'){
			    	$genders[1].selected='selected';
			    }
			    
			    if(idnameNew=='birthday_s'){
			    	$("#birthday_s_hidden").attr("style","display:none");
			    	optControllerOptButton_ex(this);
				}else{
					optControllerOptButton(this);
				}
			}
		}
		else{
			var gender = $("#gender").val();
			var $genders = $("#gender_hidden").children();
		    if(gender==1 ||gender== '男'){
		    	$genders[0].selected='selected';
		    }
		    if(gender==0 ||gender== '女'){
		    	$genders[1].selected='selected';
		    }
			optControllerOptButton_ex(this);
		}
	});
	$(".opt_birthday").click(function(){
		$("#gender_hidden").attr("style","display:none");
		//修改之前检查有没有修改其他的文本框，提示是否保存
		if(lastOptHaveChangeed=="1"){
			if(confirm('您有未保存的修改编辑，是否保存？')){
				
			}else{//不保存
				$("#"+idnameNew).val(lastClickInputValue);//还原 原来的值
				lastOptHaveChangeed = "0";//恢复初始值
				//opt操作  文本框按钮 显示控制
				if(idnameNew=='gender'){
					$("#gender_hidden").attr("style","display:none");
					optControllerOptButton_ex(this);
				}else{
					optControllerOptButton(this);
				}
				
			}
		}
		else{
			optControllerOptButton_ex(this);
		}
	});
	$(".save").click(function(){
		var uid = $("#uid").val();
		
		var newClickInputValue = $("#"+idnameNew).val();
		var postdata = "uid="+uid+"&"+idnameNew+"="+newClickInputValue;
		editUserInfo(postdata);
	});
	$(".save_gender").click(function(){
		var uid = $("#uid").val();
		
		var newClickInputValue = $("#"+idnameNew).val();
		newClickInputValue = newClickInputValue.replace('女',"0");
		newClickInputValue = newClickInputValue.replace('男',"1");
		
		
		$("#"+idnameNew+"_hidden").attr("style","display:none");
		var gender = $("#gender").val();
		var $genders = $("#gender_hidden").children();
	    if(gender==1 ||gender== '男'){
//	    	$genders[0].selected='selected';
	    	$("#gender").val('男');
	    }
	    if(gender==0 ||gender== '女'){
//	    	$genders[1].selected='selected';
	    	$("#gender").val('女');
	    }
	    
	    var postdata = "uid="+uid+"&"+idnameNew+"="+newClickInputValue;
		editUserInfo(postdata);
	});
	$(".save_birthday").click(function(){
		var uid = $("#uid").val();
		
		var newClickInputValue = $("#"+idnameNew).val();
		
		
		$("#"+idnameNew+"_hidden").attr("style","display:none");
		$("#"+idnameNew).attr("readonly","readonly");
		
		var postdata = "uid="+uid+"&"+idnameNew+"="+newClickInputValue;
		editUserInfo(postdata);
	});
	
	$(".input").change(function(){
		if(this.value!=lastClickInputValue){
			lastOptHaveChangeed = "1";
		}
		else{
			lastOptHaveChangeed = "0";
		}
	});
	
});
function init(){
	
	$("#birthday_s_hidden").datepicker({
//	    minDate:'+30y+0m+0d',
		yearRange:'-70:+0',
	    maxDate:'+0y+0m+0d',
//	    showButtonPanel:true,
	    firstDay:0,
	    defaultDate:'-20y'
	});
	
	
	var uid = $.cookie('uid');
	var postdata = "uid="+uid;
	
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/user/getUser',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
        	HandleInitAjaxSuccess(result);
        },
        error: function (errorMsg) {
//			showDiag("登录失败，请重新尝试");
//			$('.ok').click(function () {
//				deleteDiag();				
//			});
//			$('.userInput').focus();
        }
    });
	
	$("#gender_hidden").change(function(){
		$("#gender").val($("#gender_hidden").val());
	});
	$("#birthday_s_hidden").change(function(){
		$("#birthday_s").val($("#birthday_s_hidden").val());
	});
	
}

function editUserInfo(postdata){
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/user/update',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
        		//更新成功
        	    var jsonObj = jQuery.parseJSON(result);
        	    var flag = jsonObj["flag"];
        	    if(flag=="0"){
        	    	showSuccessDialog("修改成功");
        	    	$("#"+idnameNew).parent().next().next().attr("style","diaplay:none");
        	    	$("#"+idnameNew).attr("style","border:0px solid #a09e9e");
        	    	lastOptHaveChangeed = "0";
        	    }
        	    if(flag=="1"){
        	    	showErrorDialog("修改失败");
        	    }
        	    if(flag=="2"){
        	    	showWarningDialog("token错误或过期，请重新登录");
        	    }
        },
        error: function (errorMsg) {
//			showDiag("登录失败，请重新尝试");
//			$('.ok').click(function () {
//				deleteDiag();				
//			});
//			$('.userInput').focus();
        	showErrorDialog("修改失败");
        }
    });
}

//opt操作  文本框按钮 显示控制
function optControllerOptButton(obj){
	//隐藏上次点击文本框的边框，隐藏上次点击修改的  保存 按钮
	var $lastInput = $("#"+idnameOld);
	$lastInput.attr("style","border:0px solid #a09e9e");
	$lastInput.attr("readonly","readonly");
	$lastInput.parent().next().next().attr("style","diaplay:none");
	
	var $td = obj.previousElementSibling;
	var $input = $td.children[0];
	$input.readOnly=false;
	idnameNew = $input.id;//也是userInfo 对应字段的name
	$("#"+idnameNew).attr("style","border:1px solid #a09e9e");//显示出边框
	idnameOld = idnameNew;
	
	//修改之前检查有没有修改其他的文本框，提示是否保存
	lastClickInputValue = $("#"+idnameNew).val();
	//保存按钮，显示
	var $save = obj.nextElementSibling;
	$save.style.display='block';
}
//opt操作  文本框按钮 显示控制
function optControllerOptButton_ex(obj){
	//opt操作 文本框按钮 显示控制
	//隐藏上次点击文本框的边框，隐藏上次点击修改的  保存 按钮
	var $lastInput = $("#"+idnameOld);
	$lastInput.attr("style","border:0px solid #a09e9e");
	$lastInput.attr("readonly","readonly");
	$lastInput.parent().next().next().attr("style","display:none");
	
	var $td = obj.previousElementSibling;
	var $input = $td.children[0];//显示文本，隐藏
	$input.style.display='none';
	
	var $input_hidden = $td.children[1];//select 标签  显示
	$input_hidden.style.display='block';
	
	$input.readOnly=false;
	idnameNew = $input.id;//也是userInfo 对应字段的name
//	$("#"+idnameNew).attr("style","border:1px solid #a09e9e");//显示出边框
	idnameOld = idnameNew;
	
	//修改之前检查有没有修改其他的文本框，提示是否保存
	lastClickInputValue = $("#"+idnameNew).val();
	//保存按钮，显示
	var $save = obj.nextElementSibling;
	$save.style.display='block';
}

function HandleInitAjaxSuccess(result) {
	var uid = $.cookie('uid');
    var jsonObj = jQuery.parseJSON(result);
    var chnname = jsonObj["chnname"];
    var engname = jsonObj["engname"];
    var cellphone = jsonObj["cellphone"];
    var mail = jsonObj["mail"];
    var realname = jsonObj["realname"];
    var gender = jsonObj["gender"];
    var birthday_s = jsonObj["birthday_s"];
    var addr = jsonObj["addr"];
    
    
    $("#uid").val(uid);
    $("#chnname").val(chnname);
    $("#engname").val(engname);
    $("#cellphone").val(cellphone);
    $("#mail").val(mail);
    $("#realname").val(realname);
    $("#addr").val(addr);
    $("#birthday_s").val(birthday_s);
    $("#gender").val(gender=='1'?'男':'女');
   
    /*$("#birthday_s").val(birthday_s);
    
    var $genders = $("#gender").children();
    if(gender==1){
    	$genders[0].selected='selected';
    }
    if(gender==0){
    	$genders[1].selected='selected';
    }*/
}

//showSuccessDialog("请阅读《软件使用和用户注册协议》");
//showWarningDialog("请阅读《软件使用和用户注册协议》");
//showErrorDialog("请阅读《软件使用和用户注册协议》");