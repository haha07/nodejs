

function fn_login(){
	 $.get('/login', function (data) {
		 /*var div = "<div class='contact'></div>"
		$('.container').append(div);*/
         var html = data;
         $('.contact').html(html);
	 });
	 if($('.contact').css("display") == 'none'){
	 $('.contact').show();
	 };
};
function fn_join(){
	$.get('/join', function(data){
		var html = data;
		$("#joinContent").html(html);
	});
	if($("#joinContent").css("display") == 'none'){
		$("#joinContent").show();
	};
};
function fn_submit(){
 	if($("#email").val() != "" && $("#password").val() != ""){
 	$("#loginform").submit();
 	}else{
 	alert("값을 입력하여주세요");
 	}
 };
 function fn_cancel(){
 	$('.contact').css('display','none');
 	/*$('#joinContent').css('display','none');*/
	$(location).attr('href','/');
 };
 
 function fn_cancelx(){
 	$('.contact').css('display','none');
 	/*$('#joinContent').css('display','none');*/
	/*$(location).attr('href','/');*/
 };