var defulteMusic = 1;//默认美国发音
var list_group = "01";

var poolurl = "language/test";
var aSignvalue ="A";
var x,
	sc = $(window).width() / 640,
	isPlay = false,
	progress = 0,
	i = 0,
	max = 0,
	value = 0,
	$cover = $('.cover'),
	$playMusic = $('.start'),
	$pauseMusic = $('.pause'),
	$scale = $('#scale'),
	$cd = $('.cd'),
//	$next = $('#next'),
//	$before = $('#before'),
	$voice = $('voice'),
	$music=$('#music'),
	music = $music.get(0),
	//js操作获得的是audio对象，jquery选择器获得的是jquery对象，0对象的才是对应的节点对象。所以不能直接使用jquery对象去操作。
	musList = [{
		tit: "somebody that I used to know",
		cov: "cover4.jpeg",
		voi: "../../file/ifIDieYoung.mp3"//这里没用，html中的src 才是歌曲地址
	}];


$(function () {
	
	//英美发音
	$(".American").click(function(){
		defulteMusic = 1;
		$(".cdtitle").text("四级词汇__"+"001002x4_06"+list_group+"01_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
		$("#music").attr("autoplay","autoplay");
		$("#music").attr("src",staticResUrl + poolurl + "/001002x4/40/001002x4_06"+list_group+"01_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
	});
	$(".English").click(function(){
		defulteMusic = 2;
		$(".cdtitle").text("四级词汇__"+"001002x4_06"+list_group+"01_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
		$("#music").attr("autoplay","autoplay");
		$("#music").attr("src",staticResUrl + poolurl + "/001002x4/40/001002x4_06"+list_group+"01_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
	});

	initMusic("init");
	
	//点击1-23章 标签事件
	$(".chapterSign").click(function(){
		list_group = "01";
		
		aSignvalue = $(this).attr("param");
			//001002x4_060101_40_cet4word_01_1.mp3
		$(".cdtitle").text("四级词汇__"+"001002x4_060101_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
		$("#music").attr("autoplay","autoplay");
		$("#music").attr("src",staticResUrl + poolurl + "/001002x4/40/001002x4_060101_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
		initMusic("change");
		titleClickOn("词汇分组");
	});
	
	
	//点击A-Z 标签事件
	$(".aSign").click(function(){
		list_group = "02";
		
		aSignvalue = $(this).text();
		var AllStr = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
		if(AllStr.indexOf(aSignvalue)>-1){
			//001002x4_060201_40_cet4word_A_1.mp3
			$(".cdtitle").text("四级词汇__"+"001002x4_060201_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
			$("#music").attr("autoplay","autoplay");
			$("#music").attr("src",staticResUrl + "/language/test/001002x4/40/001002x4_060201_40_cet4word_"+aSignvalue+"_"+defulteMusic+".mp3");
			initMusic("change");
		}
		titleClickOn("词汇列表");
	});

});

function initMusic(type){
	var audio = document.getElementById("music");
	audio.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
        function() {
			var max = Math.floor(music.duration);
			if(isNaN(max)){
				$("#entire").text("00:00");
				$playMusic.hide();
			}else{
				$("#entire").text(arrive_timer_format(max));
			}
			if(type == "change"){
				if(isPlay == false){
					$(".start").children("img").trigger('click');
//					$pauseMusic.show();
				}
			}
        }, false);
}

/*播放*/
$playMusic.on('click', function() {
	if (isPlay == false) {
		iplay();
		$playMusic.hide();
	} else {
		nplay();
	}
});
$cd.mouseover(function(){
	if (max > 0) {
		if (isPlay == true) {
			$pauseMusic.show();
		};
	};
});
$cd.mouseout(function(){
	$pauseMusic.hide();
});
$pauseMusic.on('click',function() {
	if (isPlay == true) {
		nplay();
	}else{
		iplay();
	}
});

/*切换歌曲*/
/*$next.on('click', function() {
	nxt();
});

$before.on('click', function() {
	//$cover.removeClass('cover-play');
	$cover.css('background-image', "url(build/img/" + musList[i - 1].cov + ")");
	$music.attr('src', musList[i - 1].voi);
	i--;
	clearInterval(x);
	$scale.val(0);
	if (isPlay == true) {
		music.onloadeddata = function() {
			iplay();
		}
	} else {
		nplay();
	}
});

function nxt() {
	$cover.removeClass('cover-play');
	$cover.css('background-image', "url(build/img/" + musList[i + 1].cov + ")");
	$music.attr('src', musList[i + 1].voi);
	$scale.val(0);
	i++;
	clearInterval(x);
	if (isPlay == true) {
		music.onloadeddata = function() {
			iplay();
		}
	} else {
		nplay();
	}
};
*/
/*播放状态*/
function iplay() {
	$scale.attr('max', music.duration);
	max = Math.floor(music.duration);
	if (max > 0) {
		$cover.addClass('cover-play');
	};
	music.play();
	isPlay = true;
	x = setInterval(function() {
		progress = music.currentTime;
		$scale.val(progress);
		value = Math.floor($scale.val());
//		$("#now").text(value);
		$("#now").text(arrive_timer_format(value));
//		console.log("歌曲时长：" + max + "现在的时间：" + value);
		/*判断歌曲是否播放结束*/
//		if (value == max) {
//			$cover.removeClass('cover-play');
//		}
	}, 50);
//	$("#entire").text(max);
	if(isNaN(max)){
		$("#entire").text("00:00");
	}else{
		$("#entire").text(arrive_timer_format(max));
	}
};

$scale.on('change', function() {
	progress = $scale.val();
	music.currentTime = progress;
});

/*暂停状态*/
function nplay() {
	$cover.removeClass('cover-play');
	music.pause();
	isPlay = false;
	clearInterval(x);
//	console.log(123);
	$pauseMusic.hide();
	$playMusic.show();
};

function arrive_timer_format(s) {
	var t = "";
	if(s > -1){
	    hour = Math.floor(s/3600);
	    min = Math.floor(s/60) % 60;
	    sec = s % 60;
	    day = parseInt(hour / 24);
	    if (day > 0) {
	        hour = hour - 24 * day;
	        t = day + "day ";
	        }
	    if(hour > 0) t += hour + ":";   
	    if(min < 10){t += "0";}
	        t += min + ":";
	    if(sec < 10){t += "0";}
	        t += sec;
//	        if (day > 0) {
//	        	hour = hour - 24 * day;
//	        	t = day + "day " + hour + ":";
//	        }
//	        else t = hour + ":";   
//	        if(min < 10){t += "0";}
//	        t += min + ":";
//	        if(sec < 10){t += "0";}
//	        t += sec;
	}
	return t;
}

function show(obj){
	$(obj).children("div").show();
}
function hide(obj){
	$(obj).children("div").hide();
}

function titleClickOn(text){
	var alist = $(".atitle");
	for (var i = 0; i < alist.length; i++) {
		var a = alist[i];
		$(a).removeClass("on");
		
		if(text==$(a).text()){
			$(a).addClass("on");
		}
		if(text==$(a).text()){
			$(a).addClass("on");
		}
	}
}