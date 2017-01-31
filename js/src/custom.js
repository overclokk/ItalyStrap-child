/**
 * This is the falback file that will be loaded in case no specific file are founded.
 */

jQuery.noConflict()(function($){
	"use strict";
	$(document).ready(function() {
		$('#cat').addClass('form-control');
		$('select').addClass('form-control');
		$('#wp-calendar').addClass('table table-hover');
		$('td a').addClass('badge').css('margin-right', '-10px');
	});
});