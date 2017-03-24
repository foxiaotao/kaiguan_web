var textAreaChangedFlag = 0;
var textStringOld = '';
var textStringNew = '';

var poolid = "001002x1";
var id = "001002x1_010101";
var itemid = "010101";
var volume = "T10";
var itemtitle = "1.1.1";
var poolurl = "language/module/";
var a1_2 = "10";// 摘要和内容 哪一个是正在显示的
var x, sc = $(window).width() / 640, isPlay = false, progress = 0, i = 0, max = 0, value = 0, $cover = null, $playMusic = null, $pauseMusic = null, $scale = null, $cd = null, $voice = null, $music = null, music = null,
musList = [ {
	tit : "somebody that I used to know",
	cov : "cover4.jpeg",
	voi : "./001002-theme-2-god.mp3"// 这里没用，html中的src 才是歌曲地址
} ];

$(function() {

	init();
	$(".a1").click(function() {
				$(".a2").removeClass("on");
				$(this).addClass("on");
				a1_2 = "10";
				$("#contentIFrame").attr("src", staticResUrl + poolurl + poolid + "/10/" + id + "_10.html");
			});
	$(".a2").click(function() {
				$(".a1").removeClass("on");
				$(this).addClass("on");
				a1_2 = "20";
				$("#contentIFrame").attr("src",staticResUrl + poolurl + poolid + "/20/" + id + "_20.html");
			});

	var mp3 = poolid.substr(3, 5) + "_" + itemid + "_40.mp3";
	var mp3url =  staticResUrl + poolurl + poolid + "/40/" + mp3;
	
	$cover = $('.cover');
	$playMusic = $('.start');
	$pauseMusic = $('.pause');
	$scale = $('#scale');
	$cd = $('.cd');
	$voice = $('voice');
	$music = $('#music');
	music = $music.get(0);
	initMusic(mp3url,"init");
	

});

function init() {
	//初始化 tab设置
	$(".tab_content").hide(); // Hide all content
	$("ul.tabs li:first").addClass("on").show(); // Activate first tab
	$(".tab_content:first").show(); // Show first tab content
	// On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("on"); // Remove any "on" class
		$(this).addClass("on"); // Add "on" class to selected tab
		$(".tab_content").hide(); // Hide all tab content
		var onTab = $(this).find("a").attr("href"); // Find the rel attribute
													// value to identify the on
													// tab + content
		$(onTab).fadeIn(); // Fade in the on content
		return false;
	});

	//获取参数
	var _poolid = getRequestString("poolid");
	var _itemid = getRequestString("itemid");
	var _volume = getRequestString("volume");
	var _itemtitle = getRequestStringdecodeURI("itemtitle");
	if (_poolid != null && _poolid != undefined && _poolid != "") {
		poolid = _poolid;
	}
	if (_itemid != null && _itemid != undefined && _itemid != "") {
		itemid = _itemid;
	}
	id = poolid + "_" + itemid;
	if (_volume != null && _volume != undefined && _volume != "") {
		volume = _volume;
	}
	if (_itemtitle != null && _itemtitle != undefined && _itemtitle != "") {
		itemtitle = _itemtitle;
	}


	// 加载json tree
	var menuajax = $.ajax({
		url : baseUrl + "/file/getMenujsonVolume?poolid=" + poolid + "&volume="+ volume,
		async : false
	});
	var json = menuajax.responseText.replace(/true/g, "false");// 关闭节点
	var menuObj = jQuery.parseJSON(json);
	showJsTree("tab1", menuObj);
	
	$("#title").text(itemtitle);
	$("#contentIFrame").attr("src",staticResUrl + poolurl + poolid + "/10/" + id + "_10.html");
	$("#music").attr("src",staticResUrl + poolurl + poolid + "/40/" + id + "_40.html");

	initNote();
}

//加载tree
function showJsTree(divId, data) {
	$('#' + divId).jstree({
		'plugins' : [ "wholerow" ],
		// 'plugins' : [ "wholerow", "checkbox" ],//checkbox有选择框，wholerow颜色多选
		'core' : {
			'data' : data
		}
	}).bind('click.jstree',function(event) {
				//点击右侧目录树
				var eventNodeName = event.target.nodeName;
				if (eventNodeName == 'INS') {
					return;
				} else if (eventNodeName == 'A') {
					var $subject = $(event.target).parent();
					if ($subject.find('ul').length > 0) {
					} else {
						//初始化权限
		                var previlegeStr = $.cookie("previlegeStr");
						var click_id = $(event.target).parents('li').attr('id');
		            	itemid = click_id.split("_")[1];
		            	var chapter = itemid.substring(0,2);
		            	var pri = poolid+"_"+chapter;
		            	
						if(click_id!=id){
							//说明 叶子节点变了
							id = click_id;
							var title = $(event.target).text();
							if(poolid == "001002x1"){
								if(previlegeStr.indexOf(pri)>-1){
									if ($("#" + id).hasClass('jstree-leaf')) {
										
										// 叶子节点被点击了
										initNote();
										
										$("#title").text(title);
										$("#contentIFrame").attr("src",staticResUrl + poolurl + poolid + "/"+ a1_2 + "/" + id + "_" + a1_2+ ".html");
										var mp3 = id.substr(3, 12) + "_40.mp3";
										var mp3url =  staticResUrl + poolurl + poolid + "/40/" + mp3;
										initMusic(mp3url,"change");
									}
				            	}else{
				            		showDiag("非试用章节，请购买网络会员！");
				                    $('.ok').click(function () {
				                        deleteDiag();
				                    });
				            	}
							}else{
								if ($("#" + id).hasClass('jstree-leaf')) {
									// 叶子节点被点击了
									initNote();
									
									$("#title").text(title);
									$("#contentIFrame").attr("src",staticResUrl + poolurl + poolid + "/"+ a1_2 + "/" + id + "_" + a1_2+ ".html");
									var mp3 = id.substr(3, 12) + "_40.mp3";
									var mp3url =  staticResUrl + poolurl + poolid + "/40/" + mp3;
									initMusic(mp3url,"change");
								}
							}
							
							
							
						}
						
					}
				}
	}).bind("select_node.jstree", function(event, data) { // myThis.id
		var node = data.node, inst = data.instance;
		if ($("#" + node.id).hasClass('jstree-closed')) {
			return inst.open_node(node);
		}
		if ($("#" + node.id).hasClass('jstree-open')) {
			return inst.close_node(node);
		}
	});
}



//music
function initMusic(mp3url,type) {

	$("#music").attr("src", mp3url);
	

	if (type == "change") {
		$("#entire").text("00:00");
		$("#music").attr("autoplay","autoplay");//自动播放
	}
	var audio = document.getElementById("music");
	audio.addEventListener("loadeddata", // 歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
	function() {
		var max = Math.floor(music.duration);
		if (isNaN(max)) {
			$("#entire").text("00:00");
			$playMusic.hide();
		} else {
			$("#entire").text(arrive_timer_format(max));
		}
		if (type == "change") {
//			$(".start").children("img").trigger('click');
			if (isPlay == false) {
				$(".start").children("img").trigger('click');
			}
		}
	}, false);
	
	/* 播放 */
	$playMusic.click(function() {
		if (isPlay == false) {
			iplay();
			$playMusic.hide();
		} else {
			nplay();
		}
	});
	$cd.mouseover(function() {
		if (max > 0) {
			if (isPlay == true) {
				$pauseMusic.show();
			}
			;
		}
		;
	});
	$cd.mouseout(function() {
		$pauseMusic.hide();
	});
	$pauseMusic.click(function() {
		if (isPlay == true) {
			nplay();
		} else {
			iplay();
		}
	});
	$scale.change(function() {
		progress = $scale.val();
		music.currentTime = progress;
	});

}

/* 切换歌曲 */
/*
 * $next.on('click', function() { nxt(); });
 * 
 * $before.on('click', function() { //$cover.removeClass('cover-play');
 * $cover.css('background-image', "url(build/img/" + musList[i - 1].cov + ")");
 * $music.attr('src', musList[i - 1].voi); i--; clearInterval(x); $scale.val(0);
 * if (isPlay == true) { music.onloadeddata = function() { iplay(); } } else {
 * nplay(); } });
 * 
 * function nxt() { $cover.removeClass('cover-play');
 * $cover.css('background-image', "url(build/img/" + musList[i + 1].cov + ")");
 * $music.attr('src', musList[i + 1].voi); $scale.val(0); i++; clearInterval(x);
 * if (isPlay == true) { music.onloadeddata = function() { iplay(); } } else {
 * nplay(); } };
 */
/* 播放状态 */
function iplay() {
	$scale.attr('max', music.duration);
	max = Math.floor(music.duration);
	if (max > 0) {
		$cover.addClass('cover-play');
	}
	;
	music.play();
	isPlay = true;
	x = setInterval(function() {
		progress = music.currentTime;
		$scale.val(progress);
		value = Math.floor($scale.val());
		// $("#now").text(value);
		$("#now").text(arrive_timer_format(value));
		// console.log("歌曲时长：" + max + "现在的时间：" + value);
		/* 判断歌曲是否播放结束 */
		// if (value == max) {
		// $cover.removeClass('cover-play');
		// }
	}, 50);
	// $("#entire").text(max);
	if (isNaN(max)) {
		$("#entire").text("00:00");
	} else {
		$("#entire").text(arrive_timer_format(max));
	}
};

/* 暂停状态 */
function nplay() {
	$cover.removeClass('cover-play');
	music.pause();
	isPlay = false;
	clearInterval(x);
	// console.log(123);
	$pauseMusic.hide();
	$playMusic.show();
};

function arrive_timer_format(s) {
	var t = "";
	if (s > -1) {
		hour = Math.floor(s / 3600);
		min = Math.floor(s / 60) % 60;
		sec = s % 60;
		day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			t = day + "day ";
		}
		if (hour > 0)
			t += hour + ":";
		if (min < 10) {
			t += "0";
		}
		t += min + ":";
		if (sec < 10) {
			t += "0";
		}
		t += sec;
		// if (day > 0) {
		// hour = hour - 24 * day;
		// t = day + "day " + hour + ":";
		// }
		// else t = hour + ":";
		// if(min < 10){t += "0";}
		// t += min + ":";
		// if(sec < 10){t += "0";}
		// t += sec;
	}
	return t;
}

function show(obj) {
	$(obj).children("div").show();
}
function hide(obj) {
	$(obj).children("div").hide();
}

function initNote() {
//	$('.cancel').hide();
//	$('.cancel').hide();
/*	window.onbeforeunload = function() {
		
		textStringNew = $('#textarea_edit').val();//编辑之后的值，如果没有点击编辑，textStringNew = ''
		if(textStringNew != textStringOld){
			return '文本内容未保存，是否离开此页面?'; 
		}
 	}*/
	
    /********** Page Init **********/
//	poolid = getQueryString('poolid');
//    itemid = getQueryString('itemid');

    jQuery.support.cors = true;
    var url = baseUrl+'/resourceManager/model/getNote?uid=' + $.cookie('uid')
        + '&token=' + $.cookie('token') + '&poolid=' + poolid + '&itemid=' + itemid + '&modetype=30';
    var noteajax = $.ajax({ url: url, async: false });
    var noteObj = JSON.parse(noteajax.responseText);
    var notes = noteObj.notes;
    if (notes.length > 0) {
        var content = notes[0].content;
        var time = notes[0].time;
        var timeStr = format(parseInt(time));
        $('#textarea').text(content);
		$('#textarea').css({ 'padding-left':'10px'});
		
		//$('#textarea').show();
		
        $('.textfield').css({ 'background': 'none' });
        $('.updatetime').show();
        $('.time').html(timeStr);
        $('.edit').show();
    } else {
        $('.textfield').css({ 'background': 'url(../assets/img/content/lang_note_null.png) center no-repeat' });
        $('.edit').show();
        $('#textarea').text('');
    }


    /********  Event Bind  ********/
    $('.edit').click(function () {
//    	parent.showDivEditNote($('#textarea').text());
    	//0429
    	var text = $('#textarea').text();
    	$('#popupbox_note').val(text);
    	$('.wrapblack').show();
    	$('#popupbox').show();
    });
    
    $('#popupbox_save').click(function () {
        var text = $('#popupbox_note').val();
        if (text == '')
            return;
        var postdata = 'poolid=' + poolid + '&itemid=' + itemid + '&content=' + text + '&size=' + text.length
            + '&lasttime=' + getTimestamp() + '&uid=' + $.cookie('uid') + '&token=' + $.cookie('token');
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: baseUrl+'/resourceManager/model/uploadNote',
            contentType: 'application/x-www-form-urlencoded',
            data: postdata,
            dataType: "text",
            async: true,
            success: function (result) {
                var resultObj = jQuery.parseJSON(result);
                if (resultObj.flag == '0') {
                	$('.wrapblack').hide();
            		$('#popupbox').hide();
                    showDiag('已成功保存笔记');
                    
                    updateNoteContentByParent(text); 
                    $('.ok').click(function () {
                        deleteDiag();
                    });
                }
                if (resultObj.flag == '1') {
                    showDiag('因网络或服务器原因，笔记保存失败');
                    $('.ok').click(function () {
                        deleteDiag();
                    });
                }
                if (resultObj.flag == '100') {
                    showDiag('需要重新登录');
                    $('.ok').click(function () {
                        deleteDiag();
                        window.parent.location.href == '../userlogin.html';
                    });
                }
            },
            error: function (errorMsg) {
                showDiag('因网络或服务器原因，笔记保存失败');
                $('.ok').click(function () {
                    deleteDiag();
                });
            }
        });
    });

    $('.cancel').click(function () {
        showDiag('确定要离开编辑页面吗？');
        $('.ok').click(function () {
            deleteDiag();
            $('#textarea_edit').val(textStringOld);
            $('#textarea_div').show();
            $('.textfield').show();
            
            $('#textarea_edit').hide();
            $('.updatetime').show();
            $('.edit').show();
//            $('.save').hide();
//            $('.cancel').hide();
            
            $('.wrapblack').hide();
    		$('#popupbox').hide();
        });
    });
}
function updateNoteContentByParent(text){
	$('#textarea').text(text);
//	$('.updatetime span').html(format(getTimestamp()));
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function getTimestamp() {
    return new Date().getTime();
}

function format(shijianchuo) {
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate() + 1;
    var h = time.getHours() + 1;
    var mm = time.getMinutes() + 1;
    var s = time.getSeconds() + 1;
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function add0(m) {
    return m < 10 ? '0' + m : m
}