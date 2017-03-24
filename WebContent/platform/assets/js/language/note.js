//var textAreaChangedFlag = 0;
//var textStringOld = '';
//var textStringNew = '';
//
//$(function () {
//
////	$('.cancel').hide();
////	$('.cancel').hide();
///*	window.onbeforeunload = function() {
//		
//		textStringNew = $('#textarea_edit').val();//编辑之后的值，如果没有点击编辑，textStringNew = ''
//		if(textStringNew != textStringOld){
//			return '文本内容未保存，是否离开此页面?'; 
//		}
// 	}*/
//	
//    /********** Page Init **********/
////	poolid = getQueryString('poolid');
////    itemid = getQueryString('itemid');
//
//    jQuery.support.cors = true;
//    var url = baseUrl+'/resourceManager/model/getNote?uid=' + $.cookie('uid')
//        + '&token=' + $.cookie('token') + '&poolid=' + poolid + '&itemid=' + itemid + '&modetype=30';
//    var noteajax = $.ajax({ url: url, async: false });
//    var noteObj = JSON.parse(noteajax.responseText);
//    var notes = noteObj.notes;
//    if (notes.length > 0) {
//        var content = notes[0].content;
//        var time = notes[0].time;
//        var timeStr = format(parseInt(time));
//        $('#textarea').text(content);
//		$('#textarea').css({ 'padding-left':'10px'});
//		
//		//$('#textarea').show();
//		
//        $('.textfield').css({ 'background': 'none' });
//        $('.updatetime').show();
//        $('.time').html(timeStr);
//        $('.edit').show();
//    } else {
//        $('.textfield').css({ 'background': 'url(../assets/img/content/lang_note_null.png) center no-repeat' });
//        $('.edit').show();
//    }
//
//
//    /********  Event Bind  ********/
//    $('.edit').click(function () {
////    	parent.showDivEditNote($('#textarea').text());
//    	//0429
//    	var text = $('#textarea').text();
//    	$('#popupbox_note').val(text);
//    	$('.wrapblack').show();
//    	$('#popupbox').show();
//    });
//    
//    $('#popupbox_save').click(function () {
//        var text = $('#popupbox_note').val();
//        var poolid = getQueryString('poolid');
//        var itemid = getQueryString('itemid');
//        if (text == '')
//            return;
//        var postdata = 'poolid=' + poolid + '&itemid=' + itemid + '&content=' + text + '&size=' + text.length
//            + '&lasttime=' + getTimestamp() + '&uid=' + $.cookie('uid') + '&token=' + $.cookie('token');
//        jQuery.support.cors = true;
//        $.ajax({
//            type: "post",
//            contentType: "application/json",
//            url: baseUrl+'/resourceManager/model/uploadNote',
//            contentType: 'application/x-www-form-urlencoded',
//            data: postdata,
//            dataType: "text",
//            async: true,
//            success: function (result) {
//                var resultObj = jQuery.parseJSON(result);
//                if (resultObj.flag == '0') {
//                	$('.wrapblack').hide();
//            		$('#popupbox').hide();
//                    showDiag('已成功保存笔记');
//                    
//                    updateNoteContentByParent(text); 
//                    $('.ok').click(function () {
//                        deleteDiag();
//                    });
//                }
//                if (resultObj.flag == '1') {
//                    showDiag('因网络或服务器原因，笔记保存失败');
//                    $('.ok').click(function () {
//                        deleteDiag();
//                    });
//                }
//                if (resultObj.flag == '100') {
//                    showDiag('需要重新登录');
//                    $('.ok').click(function () {
//                        deleteDiag();
//                        window.parent.location.href == '../userlogin.html';
//                    });
//                }
//            },
//            error: function (errorMsg) {
//                showDiag('因网络或服务器原因，笔记保存失败');
//                $('.ok').click(function () {
//                    deleteDiag();
//                });
//            }
//        });
//    });
//
//    $('.cancel').click(function () {
//        showDiag('确定要离开编辑页面吗？');
//        $('.ok').click(function () {
//            deleteDiag();
//            $('#textarea_edit').val(textStringOld);
//            $('#textarea_div').show();
//            $('.textfield').show();
//            
//            $('#textarea_edit').hide();
//            $('.updatetime').show();
//            $('.edit').show();
////            $('.save').hide();
////            $('.cancel').hide();
//            
//            $('.wrapblack').hide();
//    		$('#popupbox').hide();
//        });
//    });
//})
//function updateNoteContentByParent(text){
//	$('#textarea').text(text);
////	$('.updatetime span').html(format(getTimestamp()));
//}
//function getQueryString(name) {
//    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//    var r = window.location.search.substr(1).match(reg);
//    if (r != null) {
//        return unescape(r[2]);
//    }
//    return null;
//}
//
//function getTimestamp() {
//    return new Date().getTime();
//}
//
//function format(shijianchuo) {
//    var time = new Date(shijianchuo);
//    var y = time.getFullYear();
//    var m = time.getMonth() + 1;
//    var d = time.getDate() + 1;
//    var h = time.getHours() + 1;
//    var mm = time.getMinutes() + 1;
//    var s = time.getSeconds() + 1;
//    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
//}
//
//function add0(m) {
//    return m < 10 ? '0' + m : m
//}
