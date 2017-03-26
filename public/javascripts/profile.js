document.getElementById("myform").addEventListener('submit', savedata);

//saving site and password
function savedata(e) {
	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteURL").value;
	var sitePassword = document.getElementById("sitePassword").value;

		if(!validiateForm(siteName,siteUrl,sitePassword))
		{
				return false
		}
		var data = {
			name : siteName,
			url : siteUrl,
			password : sitePassword
		}
		if(localStorage.getItem('datas')=== null)
		{
			var datas = [];
			datas.push(data)
			localStorage.setItem('datas', JSON.stringify(datas));	
		}
		else
		{
			var datas= JSON.parse(localStorage.getItem('datas'));
			datas.push(data);
			localStorage.setItem('datas', JSON.stringify(datas));
		}
		document.getElementById("myform").reset();

	fetchData();

	e.preventDefault();
	
}	


function removeData(url){
	
	var datas= JSON.parse(localStorage.getItem('datas'))
	for(i=0;i<datas.length;i++)
	{
		if(datas[i].url==url)
		{
			datas.splice(i ,1);

		}
	}
	localStorage.setItem('datas', JSON.stringify(datas));

	// Re-fetching data
	fetchData();
}




//fetching data from local storage

function fetchData(){
	var datas= JSON.parse(localStorage.getItem('datas'));
	var dataResults = document.getElementById("dataResults")

	dataResults.innerHTML= '';
	for(i=0; i<datas.length; i++)
	{
		var name=datas[i].name;
		var url=datas[i].url;
		var password=datas[i].password;
		
	
	dataResults.innerHTML += '<div class="table">'+
										'<thead>'+
										'<tr>'+
										'<th>'+name+ 
										'<th>'+password+
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
										' <a onclick="removeData(\''+url+'\')" class="btn btn-danger" href="#">Remove</a> '+
										'</th>'+
										'</th>'+
										'</tr>'+
										'<thead'
										'</div>'
	}
}

function validiateForm(siteName,siteUrl, sitePassword){
	if(!siteName || !siteUrl || !sitePassword){
		alert('Please fill in the details')
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteUrl.match(regex)){
		alert("Invalid URL");
		return false;
	}
	 return true;
}
