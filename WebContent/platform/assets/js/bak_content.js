var poolurl = "language/module/";

$(function () {

    /********** Page Init **********/
    if ($.cookie('token') == null) {
        $('.contentFrame').attr('src', '../relogin.html');
    }

    $('.menuLeft > ul').html('');
    $('.menuMiddle > ul').html('');

    var poolid = getRequestString("poolid");
    
    jQuery.support.cors = true;
//    menuajax = $.ajax({ url: "./menujson/"+poolid+".json", async: false });
    menuajax = $.ajax({ url: baseUrl + "/file/getMenujson?poolid="+poolid, async: false });
    var menuObj = jQuery.parseJSON(menuajax.responseText);

    var menuLeft = menuObj.menuLeft;
    for (var i = 0; i < menuLeft.length; i++) {
        var item = menuLeft[i];
        $li = $('<li></li>');
        $head = $('<div class="header"><span class="arrow ' + (i == 0 ? 'down' : 'up') + '"></span><span class="label">' + item.header + '</span></div>');
        $ul = $('<ul class="menu"' + (i == 0 ? '' : ' style="display:none"') + '></ul>');
        for (var j = 0; j < item.nodes.length; j++) {
			
			var itemText;
			if(item.nodes[j].text.length>18){
				itemText=item.nodes[j].text.substr(0,18)+"...";
			} else{
				itemText = item.nodes[j].text;
			}
			
            $ul.append('<li><span class="arrow two"></span><a href="#" data-nav="' + item.nodes[j].code + '"><span>' + itemText + '</span></a></li>');
        }
        $li.append($head).append($ul);
        $('.menuLeft > ul').append($li);
    }

    var menuMiddle = menuObj.menuMiddle;
    for (var i = 0; i < menuMiddle.length; i++) {
        var item = menuMiddle[i];
        $li = $('<li></li>');
        $head = $('<div class="header"><span class="arrow down"></span><span class="label">' + item.header + '</span></div>');
        $ul = $('<ul class="menu"></ul>');
        for (var j = 0; j < item.nodes.length; j++) {
			
			var itemText;
//			if(item.nodes[j].text.length>18){
//				itemText=item.nodes[j].text.substr(0,18)+"...";
//			} else{
				itemText = item.nodes[j].text;
//			}
			
            $ul.append('<li><a href="#" data-nav="' + item.nodes[j].code + '"><span>' + itemText + '</span></a></li>');
        }
        $li.append($head).append($ul);
        $('.menuMiddle > ul').append($li);
    }
    
    
    /********  CSS Init  ********/
    $('.menuLeft').height(document.body.clientHeight - 104);
    $('.menuMiddleWrapper').height(document.body.clientHeight - 104);
    $('.mainContent').width(document.body.clientWidth - 420);
    $('.mainContent').height(document.body.clientHeight - 104);
    $('.nav').width(document.body.clientWidth - 580);
    $('.contentFrame').width(document.body.clientWidth - 425);
    $('.contentFrame').height(document.body.clientHeight - 240);


    /********  Event Bind  ********/
    $('li> div.header').click(function () {
        var arrow = $(this).find("span.arrow");

        if (arrow.hasClass("up")) {
            arrow.removeClass("up");
            arrow.addClass("down");
        }
        else if (arrow.hasClass("down")) {
            arrow.removeClass("down");
            arrow.addClass("up");
        }

        $(this).parent().find("ul.menu").slideToggle();
    });

    $('.menuLeft .menu li').click(function () {
        $('.menuLeft .menu li').removeClass('selected')
        $(this).addClass('selected');
        $('.menuMiddle > ul > li').hide();

        var code = $(this).find('a').attr('data-nav');
        $('.menuMiddle li a[data-nav^="' + code + '"]').parent().parent().parent().show();
        $('.menuMiddle li a[data-nav^="' + code + '"]').parent().parent().parent().first().find('.menu li:first').trigger('click');
    });

    $('.menuMiddle .menu li').click(function () {
        $('.menuMiddle .menu li').removeClass('selected')
        $(this).addClass('selected');
        $('.navItem[data-nav-index="4"]').find('img').trigger('click');
    });
	
	$('.menuMiddle span').click(function () {
		$(".bannerInfo_Title").text(this.firstChild.data);
    });

    $('.navItem').children().click(function () {
        if ($.cookie('token') == null) {
            $('.contentFrame').attr('src', '../relogin.html');
            return;
        }
        var index = $(this).parent().attr('data-nav-index');
        $('.navItem').find('a').css({ 'color': 'black' });
        $(this).parent().find('a').css({ 'color': 'red' });
        var dataNav = $('.menuMiddle .menu li.selected a').attr('data-nav');
        var strs = dataNav.split('_');
        switch (index) {
            case '1':
                $('.contentFrame').attr('src', staticResUrl + poolurl + strs[0] + '/10/'+$('.menuMiddle .menu li.selected a').attr('data-nav') + '_10.html');
                break;
            case '2':
                $('.contentFrame').attr('src', staticResUrl + poolurl + strs[0] + '/20/'+$('.menuMiddle .menu li.selected a').attr('data-nav') + '_20.html');
                break;
            case '3':
                $('.contentFrame').attr('src', staticResUrl + poolurl + strs[0] + '/21/'+$('.menuMiddle .menu li.selected a').attr('data-nav') + '_21.html');
                break;
            case '4':
                $('.contentFrame').attr('src', 'player.html?poolid=' + strs[0] + '&itemid=' + strs[1]);
                break;
            case '5':
                $('.contentFrame').attr('src', 'note.html?poolid=' + strs[0] + '&itemid=' + strs[1]);
                break;
        }
    });

    /********  PageLoad Trigger  ********/
    var itemidUrl = getRequestString("itemid");
    //menuLeft's first childmenu li clicked by default
    if(itemidUrl==null || itemidUrl == undefined || itemidUrl == ""){
    	$('.menuLeft .menu:first > :first-child').trigger('click');
    }else{
    	//定位到item  ======================
        var aListLeft = $('.menuLeft .menu li a');
        for (var ai = 0; ai < aListLeft.length; ai++) {
        	var a = aListLeft[ai];
        	var chat = $(a).attr("data-nav").split("_")[1];
        	if(itemidUrl!=null && itemidUrl != undefined){
        		var itemidLeft = itemidUrl.substring(0,2);
        		if(itemidLeft == chat){
        			if("selected" != $(a).parent().attr("class")){
        				$(a).trigger("click");
        			}
        		}
        	}
        }
        var aList = $('.menuMiddle .menu li a');
        for (var aj = 0; aj < aList.length; aj++) {
    		var a = aList[aj];
    		var itemid_nav = $(a).attr("data-nav").split("_")[1];
    		if(itemidUrl == itemid_nav){
    			$(a).trigger("click");
    		}
    	}
      //定位到item  ======================
    }
    
    
    
    //note edit
	$('#popupbox_save').click(function(){
		var text = $('#popupbox_note').val();
		var dataNav = $('.menuMiddle .menu li.selected a').attr('data-nav');
		var strs = dataNav.split('_');
        var poolid = strs[0];
        var itemid = strs[1];
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
	                    
	                    contentFrame.window.updateNoteContentByParent(text); 
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
	$('#popupbox_cancel').click(function(){
		
		showDiag('确定要离开编辑页面吗？');
        $('.ok').click(function () {
            deleteDiag();
            $('#popupbox_note').val("");
            $('.wrapblack').hide();
            $('#popupbox').hide();
        });
		
		
//		if(confirm('确定要离开编辑页面吗？')){ 
//			$('#popupbox_note').val("");
//	        $('.wrapblack').hide();
//	        $('#popupbox').hide();
//		}else{ 
//			 
//		}
        
	});
    
});
function showDivEditNote(text){
	$('#popupbox_note').val(text);
	$('.wrapblack').show();
	$('#popupbox').show();
	
}
function getTimestamp() {
    return new Date().getTime();
}