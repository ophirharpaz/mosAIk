
function getAllTabsUrls() {
  
  var queryInfo = {
    currentWindow: true
  };
  
  chrome.tabs.query(queryInfo, function(tabs) {
    tabs.forEach(function(tab) {
        console.log('Tab URL: ', tab.url);
        console.log('Tab Title: ', tab.title);
		console.log('Tab ID: ', tab.id);
		chrome.tabs.executeScript(tab.id, { "code": "document.documentElement.innerText;" }, function (result) {
			console.log(result);
		});
    });
  });

};

function getAllTabsHtmls() {
	var queryInfo = {
		active: true
	};
	
	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0];
		var tabId = tab.id;
		chrome.tabs.executeScript(tabId, { "code": "document.documentElement.outerHTML;" }, function (result) {
			console.log(result);
		});
	});
};

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
};

document.addEventListener('DOMContentLoaded', function() {
	console.log("Hello");
	getAllTabsUrls();
	// getAllTabsHtmls();
});
