$(document).ready(function() {

	function splitTabs(response,nbWindows) {
		console.log(response.results);
		for (i = 0; i < nbWindows; i++) { 
			var ids = []
			var createData = {
				url: ids
			};
			for (j=0; j<response.length; j++) {
				if (response[j].tabID == i) {
					ids.push(response[j].tabCat)
				}
			}
			chrome.windows.create(createData);	
		}	
	}

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
				url: 'http://192.168.0.139:5000/',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function (response) {
					splitTabs(response,nbWindows);
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