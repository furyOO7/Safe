$(document).ready(function () {
	$('#logout').on('submit', onLogout)

	function onLogout(){
	var request = $.ajax({
	  url: "/logout",
	  type: "GET",
	  dataType: "json"
});
	}
	