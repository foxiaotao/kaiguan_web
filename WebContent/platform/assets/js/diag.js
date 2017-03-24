function showDiag(str) {
    $mask = $('<div class="diagMask"></div>').appendTo('body');
    $diag = $('<div class="diag"><a id="cancel" href="javascript:deleteDiag();">取消</a><div class="text">' + str + '</div><div class="ok">确定</div></div>').appendTo('body');
}
function showSureDiag(str) {
	$mask = $('<div class="diagMask"></div>').appendTo('body');
	$diag = $('<div class="diag"><div class="text">' + str + '</div><div class="ok_singel">确定</div></div>').appendTo('body');
}
function deleteDiag() {
    $('.diagMask,.diag').remove();
}