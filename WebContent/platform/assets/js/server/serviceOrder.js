var currentEditAddrId = "";
var currentEditAddrIndex = "";
var currentPayMethodId = "paymethod_1";

var chioseAddrIndex = "";
var serviceType = "net";

var regUid = "";//新的手机号码 注册的uid

$(document).ready(function() {  
	init();
	//修改地址保存
	$("#addrEditSave").click(function(){
		//加载用户 所有收货地址
		var province = $("#provinceSelecter").val();
		var city = $("#citySelecter").val();
		var addr = $("#addrdetail_edit").val();
		var peopleName = $("#namedetail_edit").val();
		var peoplePhone = $("#phonedetail_edit").val();
		var checkBox_edit = document.getElementById("isDefault_edit");;
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
		
		updateOrSaveUserAddr(postdata,"add");
		
	});
	//null地址保存
	$("#addrNullSave").click(function(){
		//加载用户 所有收货地址
		var province = $("#provinceSelecternull").val();
		var city = $("#citySelecternull").val();
		var addr = $("#addrdetail_null").val();
		var peopleName = $("#namedetail_null").val();
		var peoplePhone = $("#phonedetail_null").val();
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
		var addrInfo = "";
		addrInfo += "&province="+province;
		addrInfo += "&city="+city;
		addrInfo += "&address="+addr;
		addrInfo += "&peopleName="+peopleName;
		addrInfo += "&peoplePhone="+peoplePhone;
		
		var html = "";
		var i = 0;
		html += '<div class="address">';
		html += '<p id="addr_p_'+i+'" class="addr">';
		html += '<a class="changeaddr" onclick="editNullAddr('+i+')"></a>';
		html += '<input type="hidden" id="addrId_'+i+'" value="'+addr.id+'">';
		html += '<span class="addr">地址：<span class="addr" id="province_'+i+'">'+ province +'</span>&nbsp;<span id="citi_'+i+'">'+ city +'</span>&nbsp;<span id="addr_'+i+'">'+ addr +'</span>&nbsp;'+ '</span>&nbsp;';
		html += '<span class="name">姓名：<span id="peopleName_'+i+'">'+peopleName+'</span></span>&nbsp;';
		html += '<span class="phoneNumber">联系电话：<span id="peoplePhone_'+i+'">'+peoplePhone+'</span></span>&nbsp;';
		html += '</p>';
//		html += '<a href="javascript:;" id="chioseAddrId_'+i+'" class="check" onclick=chioseAddr('+i+')></a>';
		html += '</div>';
    	$("#addrList").html(html);
		
    	$("#addr_null_div").hide();
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
	
	
});  
function init(){
	
	
	//隐藏三个地址编辑框
	$("#addr_edit_div").hide();
	$("#addr_add_div").hide();
	$("#addr_null_div").hide();
	
	
	serviceType = getRequestString("type");//suit,net,book
	var price = getRequestString("price");
	var title = getRequestStringdecodeURI("title");
	
	$(".sum").text(price);
	$("#product_name_id").text(title);
	
	$('#returnServiceType').text(getServiceTypeName(serviceType));
    $('#returnServiceType').click(function () {//产品服务中心
    	if(serviceType == "suit"){
    		window.location.href = "./userservice.html";
    	}else{
    		window.location.href = "./userservice_"+serviceType+".html";
    	}
    });
	
	
	$(".paymethod").click(function(){//支付方式选择
		var $paymethod = $(".paymethod");
		for(var i = 0 ; i < $paymethod.length ; i ++ ){
			$paymethod[i].className = "check paymethod";
//			console.log("s");
		}
		currentPayMethodId = this.id;
		this.className="check on paymethod";
	});
	//默认支付方式选定
//	var $paymethod = $(".paymethod");
//	for(var i = 0 ; i < $paymethod.length ; i ++ ){
//		if($paymethod[i].className == "check on paymethod"){
//			currentPayMethodId = "paymethod_"+i;
//		}
//	}
	
	$("#inLogin_phone").text($.cookie("phone"));
	
	
    var token = $.cookie("token");
	if(token==null || token ==""){//未登录
		$("#outLogin_tip").show();
		$("#outLogin_phone").show();
		$("#inLogin_phone").hide();
		
		$("#newAddress").hide();//加地址 隐藏
		$("#addr_null_div").show();
		$("#addrNullCancel").hide();//null 填地址 取消
		
		
	}else{
		$("#outLogin_tip").hide();
		$("#outLogin_phone").hide();
		$("#inLogin_phone").show();
		
	}
	

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
	
    //加载用户 所有收货地址
    
	/*if(serviceType == "net"){//只有套件 和 书 才显示地址
	}else{
		loadUserAddr();//
	}*/
	loadUserAddr();//
	
	
	$("#paySubmit").click(function(){
		
		var serviceId = getRequestString("serviceId");
		//已登录
		var token = $.cookie("token");
		var uid = $.cookie("uid");
		if(token!= "" && token!=null && token!= undefined && uid!= "" && uid!=null && uid!= undefined){
			toPay(uid,serviceId,"1");
		}else{
			//未登录
			//注册
			var postdata = "cellphone="+$("#outLogin_phone").val();
			$.ajax({
		        type: "post",
		        contentType: "application/json",
		        url: baseUrl+'/resourceManager/payReg',
		        contentType: 'application/x-www-form-urlencoded',
		        data: postdata,
		        dataType: "text",
		        async: false,//同步
		        success: function (result) {
		        	var jsonObj = jQuery.parseJSON(result);
		            var flag = jsonObj["flag"];
		            var orderNo = jsonObj["orderNo"];
		            var uid = jsonObj["uid"];
		            if(flag == '0'){
		            	regUid = uid;
		            }
		            //请填写正确的手机号码
		            if(flag == '2'){
		            	showDiag("请填写正确的手机号码");
						$('.ok').click(function () {
							deleteDiag();				
						});
						return;
		            }
		            //请填写您的手机号码
		            if(flag == '3'){
		            	showDiag("请填写您的手机号码");
						$('.ok').click(function () {
							deleteDiag();				
						});
						return;
		            }
		            if(flag == '4'){
		            	regUid = uid;
		            }
		            //请填写您的手机号码
		            if(flag == '5'){
		            	showDiag("会员注册功能暂时关闭");
		            	$('.ok').click(function () {
		            		deleteDiag();				
		            	});
		            	return;
		            }
		            //请填写您的手机号码
		            if(flag == '6'){
		            	showDiag("会员注册功能暂时关闭");
		            	$('.ok').click(function () {
		            		deleteDiag();				
		            	});
		            	return;
		            }
		        },
		        error: function (errorMsg) {
		        }
		    });
			//购买
			toPay(regUid,serviceId,"0");
		}
		
		
		
	});
	
}
function loadUserAddr(){
	var postdata = "";
	var uid = $.cookie('uid');
	if(uid==undefined || uid == null || uid == ""){
		$("#addr_null_div").show();
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
							html += '<a href="javascript:;" id="chioseAddrId_'+i+'" class="check choiseAddr" onclick=chioseAddr('+i+')></a>';
						}
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
	chioseAddrIndex = i;//第i个地址被选中
	var aTargetList = $(".choiseAddr");
	for (var int = 0; int < aTargetList.length; int++) {
		var array_element = aTargetList[int];
		if(int!=i){
			array_element.className="check choiseAddr";
		}
		
	}
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
function getServiceTypeName(type){
	if(type == "suit"){
		return "学习套件";
	}
	if(type == "net"){
		return "网络会员";
	}
	if(type == "book"){
		return "书籍资料";
	}
}
//uidIsNull : 0 uid=null;1:uid 非空
function toPay(uid,serviceId,uidIsNull){

	var WIDout_trade_no = (uid+'')+new Date().getTime();
	var WIDsubject = "开关教育-"+$("#product_name_id").text();
	var WIDtotal_fee = $(".sum").text();
	var WIDbody = "开关教育-"+$("#product_name_id").text()+"-购买支付";
	
	
	var $addrArr = $(".choiseAddr");
	for(var i = 0 ; i < $addrArr.length ; i ++ ){
		if($addrArr[i].className == "check on choiseAddr"){
			chioseAddrIndex = i;//确定选中地址 序号
			break;
		}
	}
	var shoppingAddr = "";
	//将收获地址 合成一个字符串
	if(uidIsNull=="0"){
		chioseAddrIndex = 0;
	}
	shoppingAddr = $("#province_"+chioseAddrIndex).text()+" ";
	shoppingAddr += $("#citi_"+chioseAddrIndex).text()+" "
	shoppingAddr += $("#addr_"+chioseAddrIndex).text()+" "
	shoppingAddr += $("#peopleName_"+chioseAddrIndex).text()+" "
	shoppingAddr += $("#peoplePhone_"+chioseAddrIndex).text()+" "
	
	
	var postdata = "";
	postdata += "uid="+uid;
	postdata += "&WIDout_trade_no="+WIDout_trade_no;
	postdata += "&WIDsubject="+WIDsubject;
	postdata += "&WIDtotal_fee="+WIDtotal_fee;
	postdata += "&WIDbody="+WIDbody;
	postdata += "&serviceId="+serviceId;
	postdata += "&shoppingAddr="+shoppingAddr;
	
	$.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl+'/alipay/submit',//saveOrUpdate
        contentType: 'application/x-www-form-urlencoded',
        data: postdata,
        dataType: "text",
        async: false,
        success: function (result) {
        	var jsonObj = jQuery.parseJSON(result);
            var flag = jsonObj["flag"];
            var orderNo = jsonObj["orderNo"];
            if(flag == '0'){
            }
            //这个产品未完成的订单,更改订单号
            if(flag == '1'){
            	WIDout_trade_no = orderNo;
            }
            //已购买
            if(flag == '2'){
            	showDiag("您已经购买，请勿重复购买");
				$('.ok').click(function () {
					deleteDiag();				
				});
				return;
            }
//        	console.log("flag");
//        	console.log("result");
        },
        error: function (errorMsg) {
        }
    });
//	console.log("out");
	//转到支付页面
	if(currentPayMethodId == "paymethod_1"){//支付宝
		
		$("input[name='uid']").val(uid);//订单名称
		$("input[name='WIDseller_email']").val("hongluan@getwant.com");//
		$("input[name='WIDout_trade_no']").val(WIDout_trade_no);//订单hao
		$("input[name='WIDsubject']").val(WIDsubject);//订单名称
//		$("input[name='WIDtotal_fee']").val("0.01");//订单金额
		$("input[name='WIDtotal_fee']").val($(".sum").text());//订单金额
		$("input[name='WIDbody']").val(WIDbody);
		$("input[name='WIDshow_url']").val("http://www.getwant.com/productService/userservice.html");
		$("form[name='alipayment']").attr("action",baseUrl+'/alipayapi.jsp');
		$("form[name='alipayment']").submit();
	}else{//支付宝 end
		showDiag("该支付类型,内部测试中,敬请期待 ...");
		$('.ok').click(function () {
			deleteDiag();				
		});
		return;
	}
}


function MacInfo(){
    var locator = $("#isDefault_edit");
//    var locator = document.getElementById("isDefault_edit");
	   console.log(locator.checked);
}