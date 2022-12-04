
jQuery(function($){
	$.datepicker.regional['en'] = {
		closeText: 'Close',
		prevText: '&#x3c;Prev',
		nextText: 'Next&#x3e;',
		currentText: 'Today',
		monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun',
			'Jul','Aug','Sep','Oct','Nov','Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Mercoled&#236', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en']);

});

window.DTDoneText = "Done";