$(document).ready(function() {

	function sendRequest() {
		var nbWindows = document.getElementById("max_windows").value;
		var sent_data = { nbWindows: nbWindows};

		$.ajax({
			url: 'http://192.168.0.139:5000/user/kim',
			type: 'GET',
			data: sent_data,
			contentType: 'application/json; charset=utf-8',
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
// $(document).ready(function() {
//     // Lorsque je soumets le formulaire
//     $('#save_settings').on('submit', function(e) {
//         e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire

//         var $this = $(this); // L'objet jQuery du formulaire

//         // Je récupère les valeurs
//         var max_tabs_per_window = $('#max_tabs_per_window').val();
//         var max_windows = $('#max_windows').val();
//  		console.log(max_tabs_per_window);
//         // Je vérifie une première fois pour ne pas lancer la requête HTTP
//         // si je sais que mon PHP renverra une erreur
//         if(max_tabs_per_window === '' || max_windows === '') {
//             alert('Les champs doivent êtres remplis');
//         } else {
//             // Envoi de la requête HTTP en mode asynchrone
//             $.ajax({
//                 url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
//                 type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
//                 data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
//                 success: function(html) { // Je récupère la réponse du fichier PHP
//                     alert(html); // J'affiche cette réponse
//                 }
//             });
//         }
//     });
// });

// function getAllTabsUrls() {

//   var queryInfo = {
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, function(tabs) {
//     tabs.forEach(function(tab) {
//         console.log('Tab URL: ', tab.url);
//         console.log('Tab Title: ', tab.title);
// 		console.log('Tab ID: ', tab.id);
// 		chrome.tabs.executeScript(tab.id, { "code": "document.documentElement.outerHTML;" }, function (result) {
// 			console.log(result);
// 		});
//     });
//   });

// };

// function getAllTabsHtmls() {
// 	var queryInfo = {
// 		active: true
// 	};

// 	chrome.tabs.query(queryInfo, function(tabs) {
// 		var tab = tabs[0];
// 		var tabId = tab.id;
// 		chrome.tabs.executeScript(tabId, { "code": "document.documentElement.outerHTML;" }, function (result) {
// 			console.log(result);
// 		});
// 	});
// };

// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// };


// document.addEventListener('DOMContentLoaded', function() {
// 	console.log("Hello");
// 	getAllTabsUrls();
// 	// getAllTabsHtmls();
// });
