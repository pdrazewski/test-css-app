(function(){
	"use strict";
	
	var items;
	var loadExternalContent;

	items = [].slice.call(document.querySelectorAll('[data-request-url]'));
	loadExternalContent = function(item) {

		var data;
		var loaded;
		var placeholder;
		var xhr;
		var res;

		data = JSON.parse(item.dataset.requestUrl)
		loaded = item.dataset.loaded;
		placeholder = item.parentNode.querySelector(data.placeholder);

		if (!loaded) {
			placeholder.innerHTML = 'Please wait. Loading content...';
			xhr = new XMLHttpRequest();
			xhr.open('GET', data.url);
			xhr.onload = function() {
				if (xhr.status === 200) {
					res = JSON.parse(xhr.responseText);
					placeholder.innerHTML = res[data.map];
					item.dataset.loaded = true;
				} else {
					placeholder.innerHTML = 'Request failed. ' + xhr.status; 
				}
			}
			xhr.send();
		}
	}

	items.map(function(item){
		if (item.checked) {
			loadExternalContent(item)
		}
		item.addEventListener('change', function(){
			loadExternalContent(item)
		})
	})

}())