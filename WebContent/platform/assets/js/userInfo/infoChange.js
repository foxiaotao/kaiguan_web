jQuery(document).ready(function(){
	$('#change').click(function(){
		$('.input').hide();
		$('#tab1 input').show();
		$('#tab1 .button #save,#tab1 .button #cancel').show();
		$('#tab1 .button #change').hide();
	});
	$('#cancel').click(function(){
		$('.input').show();
		$('#tab1 input').hide();
		$('#tab1 .button #save,#tab1 .button #cancel').hide();
		$('#tab1 .button #change').show();
	})
})