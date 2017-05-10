(function(){
	"use strict";

	var items;
	var allElements;
	var loadExternalContent;
	var getAndroidVersion;

	getAndroidVersion = function(ua) {
	    ua = (ua || navigator.userAgent).toLowerCase(); 
	    var match = ua.match(/android\s([0-9\.]*)/);
	    return match ? match[1] : false;
	};

	items = [].slice.call(document.querySelectorAll('[data-request-url]'));
	allElements = [].slice.call(document.querySelectorAll('.js-accordion_item'));
	loadExternalContent = function(item) {

		var data;
		var loaded;
		var placeholder;
		var xhr;
		var res;

		data = JSON.parse(item.getAttribute('data-request-url'))
		loaded = item.getAttribute('data-loaded');
		placeholder = item.parentNode.querySelector(data.placeholder);

		if (!loaded) {
			placeholder.innerHTML = 'Please wait. Loading content...';
			xhr = new XMLHttpRequest();
			xhr.open('GET', data.url);
			xhr.onload = function() {
				if (xhr.status === 200) {
					res = JSON.parse(xhr.responseText);
					placeholder.innerHTML = res[data.map];
					item.setAttribute('data-loaded', true);
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

	// fix for android 2.3 lack of :checked pseudo class support
	alert(parseInt(getAndroidVersion(), 10))
	if (parseInt(getAndroidVersion(), 10) < 4) {
		allElements.map(function(item){
			if (item.checked) {
				item.parentNode.classList.add('checked')
			}
			item.addEventListener('change', function(){
				alert(parseInt(getAndroidVersion(), 10))
				allElements.map(function(item){
					item.parentNode.classList.remove('checked');
				})
				item.parentNode.classList.add('checked')
			})
		})
	}

}())