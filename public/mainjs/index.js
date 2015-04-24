
$(document).ready(function(){
	
	$("#email").focusout(function(){
		
		if($("#email").val() == ""){
			$("#email").css('border','1px red solid');
		}else{
			$("#email").css('border-color','');
		}
	});
	$("#password").focusout(function(){
		if($("#password").val() == ""){
			$("#password").css('border','1px red solid');
		}else{
			$("#password").css('border-color','');
		}
	});
	
	$("#email").focus(function(){
		if($("#email").css('border-color') != "rgb(204, 204, 204)"){
			$("#email").css('border-color','#68A4C4');
		};
	});
	
	$("#password").focus(function(){
		if($("#password").css('border-color') != "rgb(204, 204, 204)"){
			$("#password").css('border-color','#68A4C4');
		};
	});
	
});


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

function fn_submit(){
 	if($("#email").val() != "" && $("#password").val() != ""){
 	$("#loginform").submit();
 	}else{
 	alert("값을 입력하여주세요");
 	}
 };
 function fn_cancel(){
 	$('.contact').css('display','none');
	/*$(location).attr('href','/');*/
 };
 
 function fn_cancelx(){
 	$('.contact').css('display','none');
	/*$(location).attr('href','/');*/
 };
 
 function fn_cancelJoin(){
	 $(location).attr('href','/');
 };
 
 function fn_cancelJoinX(){
	 $(location).attr('href','/'); 
 };
 
 function fn_submitJoin(){
	 var year = $("#year").val();
	 var month = $("#month").val();
	 var day = $("#day").val();
	 var birthday = year+'-' + month+'-' + day;
	 $("#birthday").val(birthday);
	 
	 if($("#email").val() != "" && $("#password").val() != "" && $("#name").val() != ""){
		 	$("#joinForm").submit();
	 }else{
		 	alert("값을 입력하여주세요");
	 }
 };