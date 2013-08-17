/*
 * jQuery File Upload Plugin JS Example 8.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */
$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
    	autoUpload: true,
        url: '../javascript/jQuery-File-Upload/server/php/'
    }).bind('fileuploadadd', function(e, data){
    
    	var deleteButton = $('.upload-form button.delete');
    	
    	if(!deleteButton.is(':visible')){
    		deleteButton.fadeIn('slow').next().fadeIn('slow');
    	}
    	
    }).bind('fileuploaddestroyed', function (e, data) {
    	
    	if(!$('.upload-form table tr').size()){

    		$('.upload-form button.delete').fadeOut('fast').next().fadeOut('fast');

    	}
    	
    }).bind('fileuploadfailed', function (e, data) {

    	if(!$('.upload-form table tr').size()){
    		
    		$('.upload-form button.delete').fadeOut('fast').next().fadeOut('fast');
    		
    	}
    	
    }).bind('fileuploadcompleted', function (e, data) {

    	var json = jQuery.parseJSON(data.jqXHR.responseText);
    	var files = json.files;
    	
    	for(var i = 0; i < files.length; i++){
    		
    		addFileHiddenInput(files[i].id, data.context[0].cells[0]);
    		
    	}
    	
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    if (window.location.hostname === 'blueimp.github.com' ||
            window.location.hostname === 'blueimp.github.io') {
        // Demo settings:
        $('#fileupload').fileupload('option', {
            url: '//jquery-file-upload.appspot.com/',
            disableImageResize: false,
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: '//jquery-file-upload.appspot.com/',
                type: 'HEAD'
            }).fail(function () {
                $('<span class="alert alert-error"/>')
                    .text('Upload server currently unavailable - ' +
                            new Date())
                    .appendTo('#fileupload');
            });
        }
    } else {
        // Load existing files:
        $('#fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('#fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('#fileupload')[0]
        }).always(function (result) {
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
//            $(this).fileupload('option', 'done')
//                .call(this, null, {result: result});
        });
    }

});

function addFileHiddenInput(id, container){
	
	var input = $('<input type=hidden />').addClass('uploaded-file').attr('id', id);
	
	$(container).append(input);
	
}