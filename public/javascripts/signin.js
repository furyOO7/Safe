$(document).ready(function () {
	$('#signin').on('submit', onSignIn)
	console.log('0')
	
	function onSignIn(e){
		console.log('1')
		e.preventDefault();
		var err
		var email = $('#login__username').val()
		if(!email || email==='' || !validateEmail(email))
		{
			// Display an error toast, with a title
		toastr.error('email is required.', 'error!')
		err=true
		}
		var password = $('#login__password').val()
		if(!password || password==='')
		{
			// Display an error toast, with a title
		toastr.error('password is required.', 'error!')
		err=true
		}

		if(err)
		{
			return
		}
		
	  var request = $.ajax({
	  url: "/",
	  type: "POST",
	  data: {email : email, password : password},
	  dataType: "json"
});

request.done(function(msg) {
	alert('Logged in')
  window.location.href='/profile'
});

request.fail(function( jqXHR, textStatus ) {
	//toastr.error(jqXHR.responseJSON.message, 'error!')
  alert(jqXHR.responseJSON.message, 'Error');
});

	}
	function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

})
