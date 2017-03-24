var currentEditAddrId = "";
var currentEditAddrIndex = "";

$(document).ready(function() {  
	init();
	
	//修改user_info地址
	$(".edithome").click(function(){
		$("#addr_user_div").show();
		var province = $("#province_userInfo").text();
		var city = $("#city_userInfo").text();
		var addr = $("#addr_userInfo").text();
		
		
//		edit 地址联动
		var html_pro_edit = getProvinceHtml(province);
		$("#provinceSelecterUser").html(html_pro_edit);
		var html_city_edit = getCityByProvince(province,city);
		$("#citySelecterUser").html(html_city_edit);
		$("#provinceSelecterUser").change(function(){
			var html = getCityByProvince(this.value,"-1");
			$("#citySelecterUser").html(html);
		});
		
		$("#addrdetail_user").val(addr);
		
	});
	
	
	//修改地址保存
	$("#addrEditSave").click(function(){
		//加载用户 所有收货地址
		var province = $("#provinceSelecter").val();
		var city = $("#citySelecter").val();
		var addr = $("#addrdetail_edit").val();
		var peopleName = $("#namedetail_edit").val();
		var peoplePhone = $("#phonedetail_edit").val();
		var checkBox_edit = document.getElementById("isDefault_edit");
		var isDefault = checkBox_edit.checked?"1":"0";
		var id = currentEditAddrId;
		if(addr == null || addr == "" || addr == undefined){
			showDiag("详细地址不能为空");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showWarningDialog("详细地址不能为空");
			return ;
		}
		if(peopleName == null || peopleName == "" || peopleName == undefined){
			showDiag("姓名不能为空");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showWarningDialog("姓名不能为空");
			return ;
		}
		if(peoplePhone == null || peoplePhone == "" || peoplePhone == undefined){
			showDiag("联系电话不能为空");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showWarningDialog("联系电话不能为空");
			return ;
		}
	    var postdata = "";
		postdata += "uid="+$.cookie('uid');
		postdata += "&token="+$.cookie('token');
		postdata += "&province="+province;
		postdata += "&city="+city;
		postdata += "&address="+addr;
		postdata += "&peopleName="+peopleName;
		postdata += "&peoplePhone="+peoplePhone;
		postdata += "&id="+id;
		postdata += "&isDefault="+isDefault;
		
		updateOrSaveUserAddr(postdata,"edit");

	});
	
	//add地址保存
	$("#addrAddSave").click(function(){
		//加载用户 所有收货地址
		var province = $("#provinceSelecteradd").val();
		var city = $("#citySelecteradd").val();
		var addr = $("#addrdetail_add").val();
		var peopleName = $("#namedetail_add").val();
		var peoplePhone = $("#phonedetail_add").val();
		var checkBox_add = document.getElementById("isDefaultadd");
		var isDefault = checkBox_add.checked?"1":"0";
//		var id = currentEditAddrId;
		if(addr == null || addr == "" || addr == undefined){
			showDiag("详细地址不能为空");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showWarningDialog("详细地址不能为空");
			return ;
		}
		if(peopleName == null || peopleName == "" || peopleName == undefined){
			showDiag("姓名不能为空");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showWarningDialog("姓名不能为空");
			return ;
		}
		if(peoplePhone == null || peoplePhone == "" || peoplePhone == undefined){
			showDiag("联系电话不能为空");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showWarningDialog("联系电话不能为空");
			return ;
		}
		var postdata = "";
		postdata += "uid="+$.cookie('uid');
		postdata += "&token="+$.cookie('token');
		postdata += "&province="+province;
		postdata += "&city="+city;
		postdata += "&address="+addr;
		postdata += "&peopleName="+peopleName;
		postdata += "&peoplePhone="+peoplePhone;
//		postdata += "&id="+id;
		postdata += "&isDefault="+isDefault;
		
		updateOrSaveUserAddr(postdata,"add");
		
	});
	//edit user_info_1003 addr
	$("#addrUserSave").click(function(){
		//加载用户 所有收货地址
		var province = $("#provinceSelecterUser").val();
		var city = $("#citySelecterUser").val();
		var addr = $("#addrdetail_user").val();
		if(addr == null || addr == "" || addr == undefined){
			showDiag("详细地址不能为空");
			$('.ok').click(function () {
				deleteDiag();				
			});
//			showWarningDialog("详细地址不能为空");
			return ;
		}
		var postdata = "";
		postdata += "uid="+$.cookie('uid');
		postdata += "&token="+$.cookie('token');
		postdata += "&province="+province;
		postdata += "&city="+city;
		postdata += "&addr="+addr;
		
		updateUserInfoAddr(postdata);//
		
	});
	
	
	$("#addrEditCancel").click(function(){
		$("#addr_edit_div").hide();
		$("#addr_p_"+currentEditAddrIndex).attr("class","addr");		
	});
	$("#addrAddCancel").click(function(){
		$("#addr_add_div").hide();
	});
	
	$("#newAddress").click(function(){
		$("#addr_add_div").show();
	});
	
	
	$("#addrNullCancel").click(function(){
		$("#addr_null_div").hide();
		$("#addr_p_0").attr("class","addr");		
	});
	$("#addrUserCancel").click(function(){
		$("#addr_user_div").hide();
	});
	
	
});  
function init(){
	
	
	//隐藏三个地址编辑框
	$("#addr_edit_div").hide();
	$("#addr_add_div").hide();
	$("#addr_user_div").hide();
	$("#addr_null_div").hide();
	
	
    $('#returnUserInfoMain').click(function () {//产品服务中心
    	window.location.href = "./userInfo.html";
    });
	

//	edit 地址联动
	var html_pro_edit = getProvinceHtml("北京");
	$("#provinceSelecter").html(html_pro_edit);
	var html_city_edit = getCityByProvince("北京","海淀");
	$("#citySelecter").html(html_city_edit);
	$("#provinceSelecter").change(function(){
		var html = getCityByProvince(this.value,"-1");
		$("#citySelecter").html(html);
	});
//	add 地址联动
	var html_pro_add = getProvinceHtml("北京");
	$("#provinceSelecteradd").html(html_pro_add);
	var html_city_add = getCityByProvince("北京","海淀");
	$("#citySelecteradd").html(html_city_add);
	$("#provinceSelecteradd").change(function(){
		var html = getCityByProvince(this.value,"-1");
		$("#citySelecteradd").html(html);
	});
//	null地址联动
	var html_pro_null = getProvinceHtml("北京");
	$("#provinceSelecternull").html(html_pro_null);
	var html_city_null = getCityByProvince("北京","海淀");
	$("#citySelecternull").html(html_city_null);
	$("#provinceSelecternull").change(function(){
		var html = getCityByProvince(this.value,"-1");
		$("#citySelecternull").html(html);
	});
	loadUserInfoAddr();//
    //加载用户 所有收货地址
	loadUserAddr();//
	
}
function loadUserAddr(){
	var postdata = "";
	var uid = $.cookie('uid');
	if(uid==undefined || uid == null || uid == ""){
//		$("#addr_null_div").show();
		return;
	}
	postdata += "uid="+uid;
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/userAddr/loadUserAddr',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
            var jsonObj = jQuery.parseJSON(result);
            var flag = jsonObj["flag"];
            var userAddrs = jsonObj["userAddrs"]
            if(flag=="0"){
            	var html = "";
            	if(userAddrs.length > 0){
	            	for(var i=0; i < userAddrs.length ; i++){
	            		var addr = userAddrs[i];
	            		html += '<div class="address">';
	            		html += '<p id="addr_p_'+i+'" class="addr">';
	            		html += '<a class="changeaddr" onclick="editAddr('+i+')"></a>';
	            		html += '<input type="hidden" id="addrId_'+i+'" value="'+addr.id+'">';
						html += '<span class="addr">地址：<span class="addr" id="province_'+i+'">'+ term(addr.province,1) +'</span>&nbsp;<span id="citi_'+i+'">'+ term(addr.city,1) +'</span>&nbsp;<span id="addr_'+i+'">'+ term(addr.address,2) +'</span>&nbsp;'+ '</span>&nbsp;';
						html += '<span class="name">姓名：<span id="peopleName_'+i+'">'+term(addr.peopleName,3)+'</span></span>&nbsp;';
						html += '<span class="phoneNumber">联系电话：<span id="peoplePhone_'+i+'">'+term(addr.peoplePhone,4)+'</span></span>&nbsp;';
						html += '</p>';
						if(addr.isDefault == "1"){
							html += '<a href="javascript:;" id="chioseAddrId_'+i+'" class="check on choiseAddr" onclick=chioseAddr('+i+')></a>';
						}else{
//							html += '<a href="javascript:;" id="chioseAddrId_'+i+'" class="check choiseAddr" onclick=chioseAddr('+i+')></a>';
						}
						html += '<a href="javascript:;" id="delete_'+i+'" class="delete" onclick=deleteAddr('+i+')></a>';
						html += '</div>';
	            	}
            	}
            	$("#addrList").html(html);
            }
            if(flag=="2"){
//	     	       用户没登录	
            	$("#addr_null_div").show();
            }
            if(flag=="1"){
            }
        },
        error: function (errorMsg) {
        }
    });
}
//加载用户 信息表的地址信息，user_info_1003
function loadUserInfoAddr(){
	var postdata = "";
	var uid = $.cookie('uid');
	if(uid==undefined || uid == null || uid == ""){
//		$("#addr_null_div").show();
		return;
	}
	postdata += "uid="+uid;
	$.ajax({
		type: "post",
		contentType: "application/json",
		url: baseUrl+'/resourceManager/user/getUser',
		contentType: 'application/x-www-form-urlencoded',
		data: postdata,
		dataType: "text",
		async: true,
		success: function (result) {
			var jsonObj = jQuery.parseJSON(result);
			var flag = jsonObj["flag"];
			var user = jsonObj["user"]
			if(flag=="0"){
				var province = user.province;
				var city = user.city;
				var addr = user.addr;
				
				$("#province_userInfo").text(province);
				$("#city_userInfo").text(city);
				$("#addr_userInfo").text(addr);
			}
		},
		error: function (errorMsg) {
		}
	});
}

function updateOrSaveUserAddr(postdata,type){//type:edit,add,null
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/userAddr/editUserAddr',//saveOrUpdate
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
            var jsonObj = jQuery.parseJSON(result);
            var flag = jsonObj["flag"];
            var msg = jsonObj["msg"];
            if(flag=="0"){
            	$("#addr_"+type+"_div").hide();
            	if(type=="edit"){
            		//局部重写刷新
            		var province = $("#provinceSelecter").val();
            		var city = $("#citySelecter").val();
            		var addr = $("#addrdetail_edit").val();
            		var peopleName = $("#namedetail_edit").val();
            		var peoplePhone = $("#phonedetail_edit").val();
	            	$("#province_"+currentEditAddrIndex).text(province);
	            	$("#city_"+currentEditAddrIndex).text(city);
	            	$("#addr_"+currentEditAddrIndex).text(addr);
	            	$("#peopleName_"+currentEditAddrIndex).text(peopleName);
	            	$("#peoplePhone_"+currentEditAddrIndex).text(peoplePhone);
	        		
	        		$("#addr_p_"+currentEditAddrIndex).attr("class","addr");
	        		var checkBox_opt = document.getElementById("isDefault_edit");
	        		if(checkBox_opt.checked){
	        			chioseAddr(currentEditAddrIndex);
	        			checkBox_opt.checked = false;
	        		}
            	}else if(type=="add"){
            		//重新加载
            		loadUserAddr();//
            	}
            	showDiag("保存成功");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
//            	showSuccessDialog("保存成功");
            }
            if(flag=="1"){
            	showDiag("未登录或登录过期");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
//            	showWarningDialog("未登录或登录过期");
            }
            if(flag=="2"){
//	     	       用户没登录	
            	$("#addr_null_div").show();
            }
            if(flag=="3"){
//	     	       用户没登录	
            	showDiag("常用地址上限为 "+msg+" 个，请修改已有不常用地址");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
//            	showWarningDialog("常用地址上限为 "+msg+" 个，请修改已有不常用地址");
            }
            if(flag=="4"){
//	     	       用户没登录	
            	showDiag("请填写正确的手机号码");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
//            	showWarningDialog("请填写正确的手机号码");
            }
            if(flag=="5"){
//	     	       用户没登录	
            	showDiag("请填写正确的地址用户信息");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
//            	showWarningDialog("请填写正确的地址用户信息");
            }
        },
        error: function (errorMsg) {
        }
    });
}
function updateUserInfoAddr(postdata){
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
        			showDiag("修改成功");
                    $('.ok').click(function () {
                    	deleteDiag();				
                    });
//        			showSuccessDialog("修改成功");
                	$("#addr_user_div").hide();
                	var province = $("#provinceSelecterUser").val();
    				var city = $("#citySelecterUser").val();
    				var addr = $("#addrdetail_user").val();
    				
    				$("#province_userInfo").text(province);
    				$("#city_userInfo").text(city);
    				$("#addr_userInfo").text(addr);
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
function editAddr(i){
	var provinceHtml = "";
	var cityHtml = "";
	var addrs = $(".address > .addr");
	for (var int = 0; int < addrs.length; int++) {
		addrs[int].className = "addr"
	}
	$("#addr_p_"+i).attr("class","addr on");
	
	
	
	var addrId = $("#addrId_"+i).val();
	var province = $("#province_"+i).text().replace(/\_/g,"");
	var city = $("#citi_"+i).text().replace(/\_/g,"");
	var addr = $("#addr_"+i).text().replace(/\_/g,"");
	var peopleName = $("#peopleName_"+i).text().replace(/\_/g,"");
	var peoplePhone = $("#peoplePhone_"+i).text().replace(/\_/g,"");
	
	currentEditAddrId = addrId;
	currentEditAddrIndex = i;
	$("#addrdetail_edit").val(addr);
	$("#namedetail_edit").val(peopleName);
	$("#phonedetail_edit").val(peoplePhone);
	
	provinceHtml = getProvinceHtml(province);
	cityHtml = getCityByProvince(province,city);
	$("#provinceSelecter").html(provinceHtml);
	$("#citySelecter").html(cityHtml);
	$("#addr_edit_div").show();
}
function editNullAddr(i){
	
	var provinceHtml = "";
	var cityHtml = "";
	
	$("#addr_p_"+i).attr("class","addr on");
	
	var province = $("#province_"+i).text().replace(/\_/g,"");
	var city = $("#citi_"+i).text().replace(/\_/g,"");
	var addr = $("#addr_"+i).text().replace(/\_/g,"");
	var peopleName = $("#peopleName_"+i).text().replace(/\_/g,"");
	var peoplePhone = $("#peoplePhone_"+i).text().replace(/\_/g,"");
	
	currentEditAddrIndex = i;
	$("#addrdetail_null").val(addr);
	$("#namedetail_null").val(peopleName);
	$("#phonedetail_null").val(peoplePhone);
	
	provinceHtml = getProvinceHtml(province);
	cityHtml = getCityByProvince(province,city);
	$("#provinceSelecternull").html(provinceHtml);
	$("#citySelecternull").html(cityHtml);
	
	$("#addrNullCancel").show();
	$("#addr_null_div").show();
}
function chioseAddr(i){
	$("#chioseAddrId_"+i).attr("class","check on choiseAddr");
	var aTargetList = $(".choiseAddr");
	for (var int = 0; int < aTargetList.length; int++) {
		var array_element = aTargetList[int];
		if(int!=i){
			array_element.className="check choiseAddr";
		}
		
	}
}
function deleteAddr(i){
	var addrId = $("#addrId_"+i).val();
	var postdata = "uid="+$.cookie('uid');
	postdata += "&addrId="+addrId;
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/resourceManager/userAddr/deleteAddr',
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: true,
        success: function (result) {
            var jsonObj = jQuery.parseJSON(result);
            var flag = jsonObj["flag"];
            if(flag=='0'){
            	showDiag("删除成功");
    			$('.ok').click(function () {
    				deleteDiag();				
    			});
    			loadUserAddr();//
            }
        },
        error: function (errorMsg) {
        }
    });
}

function term(str,i){
	if(1==i){
		return str==null?"___________":str;
	}
	else if(2 == i){
		return str==null?"______________________":str;
	}
	else if(3 == i){
		return str==null?$.cookie("realname"):str;
	}else if(4 == i){
		return str==null?$.cookie("phone"):str;
	}
}
function MacInfo(){
    var locator = $("#isDefault_edit");
//    var locator = document.getElementById("isDefault_edit");
	   console.log(locator.checked);
}