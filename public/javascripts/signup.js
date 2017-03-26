$(document).ready(function(){
	$('#signup').on('submit', onSignUp)

		function onSignUp(e){
			e.preventDefault();
			var err
			var email= $('#login__username').val()
			if(!email || email=='')
			{
				toastr.error('email is required.', 'error!')
				err= true
			}
			else if(!validateEmail(email))
			{
				toastr.error('Incorrect Email-Id.', 'error!')
				err= true
			}
			var password= $('#login__password').val()
			if(!password || password=='')
			{
				toastr.error('password is required.', 'error!')
				err= true
			}
			if(err)
			{
				return
			}
			var request = $.ajax({
  url: "/signup",
  method: "POST",
  data: { email:email, password : password},
  dataType: "json"
});
 
request.done(function( msg ) {
	alert('user added')
	window.location.href='/profile'
});
 
request.fail(function( jqXHR, textStatus ) {
  alert(jqXHR.responseJSON.message, 'Error');
});
		function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);}	
		}

})