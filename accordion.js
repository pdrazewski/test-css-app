var accordion = (function() {

	var init;
	init = function() {
		var items = document.querySelectorAll('.js-accordion_item')
		console.log(items)
	}
	return {
		init: init
	};

}());
accordion.init();