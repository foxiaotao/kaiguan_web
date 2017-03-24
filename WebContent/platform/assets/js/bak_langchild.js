var subjectId = "001002";

$(function () {
    /********** Page Init **********/
	
	var subjectIdUrl = getRequestString("subjectId");
	if(subjectIdUrl!=null && subjectIdUrl!=undefined && subjectIdUrl!="" ){
		subjectId = subjectIdUrl;
	}
	
    if ($.cookie('token') == null) {
        window.location.href = "../relogin.html";
    }
    $('.title span').html($.cookie('langmainTitle'));
    $('.navBlock').click(function () {
        if ($(this).hasClass('nav1')) {
            window.parent.location.href = '../language/module/langmodule.html?poolid=001002x0';
        }
        if ($(this).hasClass('nav2')) {
            window.parent.location.href = '../language/module/langmodule.html?poolid=001002x1';
        }
        if ($(this).hasClass('nav3')) {
            window.parent.location.href = '../language/module/langmodule.html?poolid=001002x2';
        }
        if ($(this).hasClass('nav4')) {
            window.parent.location.href = '../language/module/langmodule.html?poolid=001002x3';
        }
        if ($(this).hasClass('nav5')) {
            window.parent.location.href = '../language/test/test.html?poolid=001002x4';
        }
    });
    $('.add').click(function () {
    	if ($(this).hasClass('add1')) {
    		window.open("http://www.getwant.com/mobile/search.html","_blank");
//    		window.parent.location.href = 'http://www.getwant.com/mobile/search.html';
//    		window.parent.location.href = 'news/news.html';//新鲜事，0419暂时用搜一搜代替
    	}
    	if ($(this).hasClass('add2')) {
    		window.parent.location.href = 'theme/theme.html';
    	}
    	if ($(this).hasClass('add3')) {
    		window.parent.location.href = 'training/offlineTraining.html?subjectid='+subjectId;
    	}
    });
});