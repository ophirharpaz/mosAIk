$(document).ready(function() {

	function sendRequest() {
		var nbWindows = document.getElementById("max_windows").value;
		var data = {
			"nbWindows" : nbWindows,
			"tabsInfo" : []
		}
		
		var queryInfo = {
			currentWindow: true
		};

		chrome.tabs.query(queryInfo, function(tabs) {
			tabs.forEach(function(tab) {
				var obj = {
					"tabID" : tab.id,
					"tabURL" : tab.url
				}
				data["tabsInfo"].push(obj);
			});

			$.ajax({
			url: 'http://192.168.0.139:5000/user/kim',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			dataType: 'json',
			success: function (response) {
				alert(response);
			},
			error: function (messsage) {
				alert(messsage);
			}
		})

		});
		
	}

	document.getElementById("split_button").addEventListener("click", function(){
		sendRequest();
	});

});