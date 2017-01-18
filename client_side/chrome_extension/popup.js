$(document).ready(function() {

	function sendRequest() {
		var nbWindows = document.getElementById("max_windows").value;
		var ids = new Array();
		var urls = new Array();
		var listIdsUrls = new Array(ids,urls);
		
		var queryInfo = {
			currentWindow: true
		};
		chrome.tabs.query(queryInfo, function(tabs) {
			tabs.forEach(function(tab) {
				listIdsUrls.push(tab.id,tab.url);
			});
		});
		console.log(listIdsUrls);
		var sent_data = { nbWindows: nbWindows};

		$.ajax({
			url: 'http://192.168.0.139:5000/user/kim',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
	    		nbWindows: nbWindows,
	    		aa: listIdsUrls
			}),
			dataType: 'json',
			success: function (response) {
				alert(response);
			},
			error: function (messsage) {
				alert(messsage);
			}
		})
	}

	document.getElementById("split_button").addEventListener("click", function(){
		sendRequest();
	});

});