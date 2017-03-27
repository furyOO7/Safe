document.getElementById("myform").addEventListener('submit', savedata);

function removeData(dataId) {
	$.ajax({
            url: '/delete',
            method: 'DELETE',
            data: {
                id: dataId
            }
        })
	.done(function(data) {
          $('#' + dataId).remove();
           
        })
        .fail(function(error) {
            //fail();
            console.log(error)
        })
    return false;

    

}
//saving site and password
function savedata(e) {
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteURL").value;
    var sitePassword = document.getElementById("sitePassword").value;
    if (!validiateForm(siteName, siteUrl, sitePassword)) {
        return false
    }
    $.ajax({
            url: '/save',
            method: 'POST',
            data: {
                siteName: siteName,
                siteUrl: siteUrl,
                sitePassword: sitePassword
            }
        })
        .done(function(data) {
        	var row = '';
			row += '<tr id=' + data._id + '>';
			row += '  <td class="name">' + data.siteName + '</td>';
			row += '  <td class="URL">' + data.siteUrl + '</td>';
			row += '  <td class="pass">' + data.sitePassword + '</td>';
			row += '  <td>';
			row += '    <a class="btn btn-default" target="_blank" href=//' + data.siteUrl + '>Visit</a>';
			row += '    <a class="btn btn-danger" href="#" onclick="removeData(\'' + data._id + '\')">Remove</a>';
			row += '  </td>';
			row += '</tr>';
            $("#userdata").append(row);
            console.log(data)
                //success(data);
        })
        .fail(function(error) {
            //fail();
            console.log(error)
        })
    e.preventDefault();
    return false;
}

function validiateForm(siteName, siteUrl, sitePassword) {
    if (!siteName || !siteUrl || !sitePassword) {
        alert('Please fill in the details')
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert("Invalid URL");
        return false;
    }
    return true;
}
