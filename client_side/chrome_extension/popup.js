function drawConfiguration() {

    chrome.windows.getAll({"populate": true}, function(window_list) {
    var dashboard = $("#dashboard");
    document.getElementById("dashboard").innerHTML = "";    // reset the dashboard before drawing

        for (var i = 0; i < window_list.length; i++) {
            var winBox = $("<ul/>").addClass("window-box window-type"+i);

            tab_list = window_list[i].tabs
            for (var j = 0; j < tab_list.length; j++) {

                var tabBox = $("<li/>").addClass("tab-box");
                tabBox.attr("data-tab-id",tab_list[j].id)
                tabBox.attr("data-tab-window-id",tab_list[j].windowId)
                var innerSpan = $("<span/>").addClass("tab-name").text(tab_list[j].title);
                tabBox.append(innerSpan);
                tabBox.unbind("click").bind("click",function(){
                    //console.log($(this).attr("data-tab-id"));
                    chrome.windows.update(parseInt($(this).attr("data-tab-window-id")), {"focused":true})
                    chrome.tabs.update(parseInt($(this).attr("data-tab-id")), {"active":true});
                });
                winBox.append(tabBox);

            }
            dashboard.append(winBox);
        }
    });
};

$(document).ready(function() {
	var idCurrentWindow;

	function splitTabs(response, nbWindows) {
		// Get active tab
		var activeTab;
		chrome.tabs.query({active:true}, function(tabs) {
				activeTab = tabs[0];
				console.log(activeTab);
		});

		// Get cluster of active tab
		var activeCluster;
		for (var i = 0; i < response.length; i++) {
			if (response[i].tabURL == activeTab.url) {
                activeCluster = response[i].winID;
            	break;
			}
		}

		for (i = 0; i < nbWindows; i++) {
			var ids = [];
			for (var j = 0; j < response.length; j++) {
				if (response[j].winID == i) {
					chrome.tabs.move(384,{windowId:activeTab.windowId,index:-1},function(tab){})
					ids.push(response[j].tabURL)
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
				idCurrentWindow = tab.windowId;
				var obj = {
					"tabID" : tab.id,
					"tabURL" : tab.url
				}
				data["tabsInfo"].push(obj);
			});

			$.ajax({
				//url: 'http://192.168.0.139:5000/',
				url: 'http://127.0.0.1:5000/',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function (response) {
					splitTabs(response,nbWindows);
				},
				error: function (message) {
					alert(message);
				}
			})
	});
		
	}

	document.getElementById("split_button").addEventListener("click", function(){
		sendRequest();
	});

	document.getElementById("show_map").addEventListener("click", function(){
		drawConfiguration();
	});

});