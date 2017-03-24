var poolid = "001002x1";
$(function() {
	getPrivilge();
});

function getPrivilge(){
	
	_poolid = getRequestString("poolid");
	if(_poolid!=null && _poolid!=undefined && _poolid!="" ){
		poolid = _poolid;
	}
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

