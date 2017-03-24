var radioSex = "";
var radioStudent = "";
var radioDiplomas = "";
var sexInvestor = "";

$(document).ready(function() {  
	
	init();

	//个人
	$("#submitIndividual").click(function(){
		var name = $("#nameIndividual").val();
		var gender = radioSex;
		var province = $("#provinceSelecterIndividual").val();
		var city = $("#citySelecterIndividual").val();
		var cellphone = $("#phoneIndividual").val();
		var birthday = $("#birthdayStr").val();
		var student = radioStudent;
		var schooltype = radioDiplomas;
		var schoolname = $("#schoolnameIndividual").val();
		var graduatetime = $("#biyeStr").val();
		var unit = $("#unitIndividual").val();
		var morinfo = $("#morInfoIndividual").val();
		var typecontent_Individual = document.getElementById("typecontent_Individual");
		var typeselling_Individual = document.getElementById("typeselling_Individual");
		var typecontent = typecontent_Individual.checked?"Y":"";
		var typeselling = typeselling_Individual.checked?"Y":"";
		
		
		if(inputValidate(name,"请填写您的姓名",""))return;
		if(inputValidate(gender,"请选择您的性别",""))return;
		if(inputValidate(cellphone,"请填写您的电话",""))return;
		if(inputValidate(birthday,"请选择您的出生",""))return;
		if(inputValidate(student,"请选择您是否是学生",""))return;
		if(inputValidate(schooltype,"请选择您的学校类型",radioStudent))return;
		if(inputValidate(schoolname,"请填写您学校名称",radioStudent))return;
		if(inputValidate(graduatetime,"请选择您的毕业时间",radioStudent))return;
		if(inputValidate(typecontent+typeselling,"请选择合作类型",""))return;
		
		var postdata = "";
		postdata += "name="+name;
		postdata += "&gender="+gender;
		postdata += "&province="+province;
		postdata += "&city="+city;
		postdata += "&cellphone="+cellphone;
		postdata += "&birthday="+birthday;
		postdata += "&student="+student;
		postdata += "&schooltype="+schooltype;
		postdata += "&schoolname="+schoolname;
		postdata += "&graduatetime="+graduatetime;
		postdata += "&morinfo="+morinfo;
		postdata += "&typecontent="+typecontent;
		postdata += "&typeselling="+typeselling;
		
		
		$.ajax({
	        type: "post",
	        contentType: "application/json",
	        url: baseUrl+'/resourceManager/cooperation/addIndividual',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postdata,
	        dataType: "text",
	        async: true,
	        success: function (result) {
	            var jsonObj = jQuery.parseJSON(result);
	            var flag = jsonObj["flag"];
	            var msg = jsonObj["msg"];
	            if(flag=="0"){
	            	showDiag("添加成功");
	    			$('.ok').click(function () {
	    				deleteDiag();				
	    			});
	    			$("#nameIndividual").val("");
	            }
	            if(flag=="2"){
	            	showDiag(msg);
	    			$('.ok').click(function () {
	    				deleteDiag();				
	    			});
	            }
//	            if(flag=="1"){
//	            	showDiag("登录过期，重新登录再尝试");
//	            	$('.ok').click(function () {
//	            		deleteDiag();				
//	            	});
//	            }
	        },
	        error: function (errorMsg) {
	        	showDiag("添加失败");
				$('.ok').click(function () {
					deleteDiag();				
				});
	        }
	    });
	});
	//
	//公司
	$("#submitCompany").click(function(){
		var cpname = $("#cpnameCompany").val();
		var province = $("#provinceSelecterCompany").val();
		var city = $("#citySelecterCompany").val();
		var address = $("#addressCompany").val();
		var businesslicense = $("#businesslicenseCompany").val();
		var liaison = $("#liaisonCompany").val();
		var cellphone = $("#cellphoneCompany").val();
		var morinfo = $("#morinfoCompany").val();
		var typecontent_company = document.getElementById("typecontent_company");
		var typeselling_company = document.getElementById("typeselling_company");
		var typead_company = document.getElementById("typead_company");
		var typecontent = typecontent_company.checked?"Y":"";
		var typeselling = typeselling_company.checked?"Y":"";
		var typead = typead_company.checked?"Y":"";
		
		
		if(inputValidate(cpname,"请填写您公司的名称"))return;
		if(inputValidate(address,"请填写您公司的地址"))return;
		if(inputValidate(businesslicense,"请填写您的营业执照注册号"))return;
		if(inputValidate(liaison,"请填写联系人姓名"))return;
		if(inputValidate(cellphone,"请填写联系人电话"))return;
		if(inputValidate(typecontent+typeselling+typead,"请选择合作类型"))return;
		
		
		var postdata = "";
		postdata += "cpname="+cpname;
		postdata += "&province="+province;
		postdata += "&city="+city;
		postdata += "&address="+address;
		postdata += "&businesslicense="+businesslicense;
		postdata += "&liaison="+liaison;
		postdata += "&cellphone="+cellphone;
		postdata += "&morinfo="+morinfo;
		postdata += "&typecontent="+typecontent;
		postdata += "&typeselling="+typeselling;
		postdata += "&typead="+typead;
		
		$.ajax({
			type: "post",
			contentType: "application/json",
			url: baseUrl+'/resourceManager/cooperation/addCompany',
			contentType: 'application/x-www-form-urlencoded',
			data: postdata,
			dataType: "text",
			async: true,
			success: function (result) {
				var jsonObj = jQuery.parseJSON(result);
				var flag = jsonObj["flag"];
				var msg = jsonObj["msg"];
				if(flag=="0"){
					showDiag("添加成功");
					$('.ok').click(function () {
						deleteDiag();				
					});
					$("#cpnameCompany").val("");
				}
				if(flag=="2"){
	            	showDiag(msg);
	    			$('.ok').click(function () {
	    				deleteDiag();				
	    			});
	            }
				if(flag=="1"){
					showDiag("登录过期，重新登录再尝试");
					$('.ok').click(function () {
						deleteDiag();				
					});
				}
			},
			error: function (errorMsg) {
				showDiag("添加失败");
				$('.ok').click(function () {
					deleteDiag();				
				});
			}
		});
	});
	//
	//投资人
	$("#submitInvestor").click(function(){
		var name = $("#nameInvestor").val();
		var gender = sexInvestor;
		var cellphone = $("#cellphoneInvestor").val();
		var unit = $("#unitInvestor").val();
		var morinfo = $("#morinfoInvestor").val();
		
		if(inputValidate(name,"请填写您的姓名"))return;
		if(inputValidate(gender,"请选择您的性别"))return;
		if(inputValidate(cellphone,"请填写您的手机号码"))return;
		if(inputValidate(unit,"请填写您的单位信息"))return;
		
		var postdata = "";
		postdata += "name="+name;
		postdata += "&gender="+gender;
		postdata += "&cellphone="+cellphone;
		postdata += "&unit="+unit;
		postdata += "&morinfo="+morinfo;
		
		$.ajax({
			type: "post",
			contentType: "application/json",
			url: baseUrl+'/resourceManager/cooperation/addInvestor',
			contentType: 'application/x-www-form-urlencoded',
			data: postdata,
			dataType: "text",
			async: true,
			success: function (result) {
				var jsonObj = jQuery.parseJSON(result);
				var flag = jsonObj["flag"];
				var msg = jsonObj["msg"];
				if(flag=="0"){
					showDiag("添加成功");
					$('.ok').click(function () {
						deleteDiag();				
					});
					$("#nameInvestor").val("");
				}
				if(flag=="2"){
					showDiag(msg);
					$('.ok').click(function () {
						deleteDiag();				
					});
				}
				if(flag=="1"){
					showDiag("登录过期，重新登录再尝试");
					$('.ok').click(function () {
						deleteDiag();				
					});
				}
			},
			error: function (errorMsg) {
				showDiag("添加失败");
				$('.ok').click(function () {
					deleteDiag();				
				});
			}
		});
	});
	//
});

function init(){
	
    var type = getRequestString("type");
    if(type== "personal"){
    	$(".table1").show();
    	$(".table2").hide();
    	$(".table3").hide();
    }
    if(type== "unit"){
    	$(".table1").hide();
    	$(".table2").show();
    	$(".table3").hide();
    }
    if(type== "investor"){
    	$(".table1").hide();
    	$(".table2").hide();
    	$(".table3").show();
    }
    
    $("#submitIndividual_cancel").click(function(){
    	showDiag('是否确定返回？');
		$('.ok').click(function () {
			deleteDiag();				
			window.location.href = "./cooperation.html"
		});
    });
    
    $("#submitCompany_cancel").click(function(){
    	showDiag('是否确定返回？');
		$('.ok').click(function () {
			deleteDiag();				
			window.location.href = "./cooperation.html"
		});
    });
    $("#submitInvestor_cancel").click(function(){
    	showDiag('是否确定返回？');
		$('.ok').click(function () {
			deleteDiag();				
			window.location.href = "./cooperation.html"
		});
    });
    
    
    
    $("input[name='sex']").click(function(){
    	var value = this.value;
    	if(value == "male"){
    		radioSex = "M";
    	}
    	else if(value == "female"){
    		radioSex = "F";
    	}
    });
    $("input[name='student']").click(function(){
    	var value = this.value;
    	if(value == "yes"){
    		$(".studentY").show();
    		radioStudent = "Y";
    	}
    	else if(value == "no"){
    		radioStudent = "N";
    		$(".studentY").hide();
    	}
    });
    $("input[name='diplomas']").click(function(){
    	radioDiplomas = this.value;
    });
	
    $("input[name='sexInvestor']").click(function(){
    	sexInvestor = this.value;
    });

    
	$("#birthdayStr").datepicker({
		yearRange:'-70:+0',
	    maxDate:'+0y+0m+0d',
	    firstDay:0,
	    defaultDate:'-20y'
	});
	$("#biyeStr").datepicker({
		yearRange:'-70:+0',
		maxDate:'+4y+0m+0d',
		firstDay:0,
		defaultDate:'-1y'
	});
	
	
	var html_pro_Individual = getProvinceHtml("北京");
	$("#provinceSelecterIndividual").html(html_pro_Individual);
	var html_city_Individual = getCityByProvince("北京","海淀");
	$("#citySelecterIndividual").html(html_city_Individual);
	$("#provinceSelecterIndividual").change(function(){
		var html = getCityByProvince(this.value,"-1");
		$("#citySelecterIndividual").html(html);
	});
	var html_pro_company = getProvinceHtml("北京");
	$("#provinceSelecterCompany").html(html_pro_company);
	var html_city_company = getCityByProvince("北京","海淀");
	$("#citySelecterCompany").html(html_city_company);
	$("#provinceSelecterCompany").change(function(){
		var html = getCityByProvince(this.value,"-1");
		$("#citySelecterCompany").html(html);
	});
}
function inputValidate(field,msg,radio_Student){//radioStudent = N(radioStudent=N的时候，field允许为空)
	if(field == null || field == "" || field == undefined){
		if(radio_Student == "N"){
			return false;
		}
		showDiag(msg);
		$('.ok').click(function () {
			deleteDiag();				
		});
		return true;
	}else 
		return false;
}