/* Italian initialisation for the jQuery UI date picker plugin. */
/* Written by Antonello Pasella (antonello.pasella@gmail.com). */
jQuery(function($){
	$.datepicker.regional['sv'] = {
	    closeText: 'Stäng',
	    prevText: '&#x3c;För',
	    nextText: 'Eft&#x3e;',
	    currentText: 'i dag',
	    monthNames: ['Januari', 'februari', 'mars', 'april', 'maj', 'juni','Juli', 'augusti', 'september', 'oktober', 'november', 'December'],
	    monthNamesShort: ['Jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'Jul', 'aug', 'sep', 'okt', 'nov', 'Dec'],
	    dayNames: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag​​', 'Lördag'],
	    dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
	    dayNamesMin: ['Sö', 'Må', 'Ti', 'On', 'To','Fr​​','Lö'],
		weekHeader: 'vc',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sv']);
});
window.DTDoneText = "klar";
