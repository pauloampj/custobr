// The Template Loader. Used to asynchronously load templates located in separate .html files
__template_path = '/static/tpl/';
__api_url = 'http://api.custobr.com/1.0/';
__authVerification = {pending: false, handler: null, userLogged: false, interval: 1000, timeout: 5000, expiresAt: 0};
__authContexts = {discuss: 1};
__loginResources = [{name: 'Google', method: 'google'}, {name: 'Twitter', method: 'twitter'}];

window.templateLoader = {

    load: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get(__template_path + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                    window[view + '_Tpl'] = data;
                }, 'html'));
            } else {
                console.log(view + " não encontrada");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

function setMenuHighlight(target){
	
	if(!target){
		
		target = 'home';
		
	}
	
	$('.main-menu > li[_target="' + target + '"]').addClass('active').siblings().removeClass('active');
	
	return true;
	
}

//////////Function for gallery rollovers //////////
function galleryHover() {

	$('.gallery-item').hover(function(){		
			$(this).find('.gallery-hover-3col, .gallery-hover-4col, .gallery-hover-6col').stop('true','true').fadeTo("normal",1);
	},
		function(){
			$(this).find('.gallery-hover-3col, .gallery-hover-4col, .gallery-hover-6col').stop('true','true').fadeTo("normal",0);
	});
}

//////////Function for blog post rollovers //////////
function postHover() {		
	$('.blog-post-item').hover(function(){		
			$(this).find('.blog-post-hover').stop('true','true').fadeTo("normal",1);
	},
		function(){
			$(this).find('.blog-post-hover').stop('true','true').fadeTo("normal",0);
	});
}

//////////Function for footer image feed rollovers //////////
function imgfeedHover() {		
	$('.img-feed a').hover(function(){		
			$(this).stop('true','true').fadeTo("normal",.6);
	},
		function(){
			$(this).stop('true','true').fadeTo("normal",1);
	});
}

//////////prettyPhoto  //////////
function callprettyPhoto() {
	// Work around for PrettyPhoto HTML Validation //
	$('.gallery-icons a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});

	$("a[rel^='prettyPhoto']").prettyPhoto({social_tools:false, deeplinking: false });
}

////////// Back To Top  //////////
function backToTopCtrl() {
	
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});
 
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},800);
	});
	
}

//////////Bootstrap Tooltip anf Pop Over //////////
function tooltipAndPopOver(){

	$("[rel=tooltip]").tooltip();
	$("[rel=popover]").hover(function(){
		$(this).popover('toggle');
	});

}

//////////Gallery Sorting //////////
function gallerySorting(){
	
	var $filterType = $('#filterOptions li.active a').attr('class');
	var $holder = $('ul.holder');
	var $data = $holder.clone();

	$('#filterOptions li a').click(function(e) {

		$('#filterOptions li').removeClass('active');

		var $filterType = $(this).attr('class');
		$(this).parent().addClass('active');

		if ($filterType == 'all') {
			var $filteredData = $data.find('li');
		} 
		else {
			var $filteredData = $data.find('li[data-type~=' + $filterType + ']');
		}

		// call quicksand
		$holder.quicksand($filteredData, {
			duration: 800,
			easing: 'easeInOutQuad'
		},
		function() {
			callprettyPhoto();
			galleryHover();
		});
		
		return false;
		
	});

}

//////////CSS Fix //////////
function cssFix(){

	$(".post-list li:first-child").css("padding-top", "0px");
	$(".page-sidebar h5:first, .page-left-sidebar h5:first, .page-right-sidebar h5:first").css("margin-top", "0px");
	$('h5.title-bg').has('button').css("padding-bottom", "12px");

}

////////// Blog Slide //////////
function blogSlide(){

	$("#btn-blog-next").click(function () {
		$('#blogCarousel').carousel('next')
	});
	$("#btn-blog-prev").click(function () {
		$('#blogCarousel').carousel('prev')
	});

	$("#btn-client-next").click(function () {
		$('#clientCarousel').carousel('next')
	});
	$("#btn-client-prev").click(function () {
		$('#clientCarousel').carousel('prev')
	});

	$('.flexslider').flexslider({
		animation: "slide",
		slideshow: true,
		start: function(slider){
			$('body').removeClass('loading');
		}
	});

}

function addScript(src, container){
	
	var fileref = document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", src);
	
	container = (container && container.length) ? container : 'head';
	
	document.getElementsByTagName(container)[0].appendChild(fileref);
	
}

function addCSS(src, container){
	
	var fileref = document.createElement('link');
	fileref.setAttribute("rel","stylesheet");
	fileref.setAttribute("href", src);
	
	container = (container && container.length) ? container : 'head';
	
	document.getElementsByTagName(container)[0].appendChild(fileref);
	
}

function addMeta(name, content){
	
	$('head', document).append('<meta name="' + name + '" content="' + content + '" />');
	
}

function centralizeMapOnMyPosition(mapSelector){
	
	if (navigator.geolocation){
		
		navigator.geolocation.getCurrentPosition(function(location){
			
			var myLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
			discussMap.setCenter(myLocation);
			discussMap.setZoom(10);
			
		});
		
	}else{

		$.gritter.add({
			title: '<i class="icon-minus-sign"></i> Ooops!',
			text: 'Não foi possível pegar a sua localização, pois o seu browser não suporta GeoLocalização!',
			class_name: 'error'
		});
		
	}
	
}

function initGritterParams(){

	$.extend($.gritter.options, {
		sticky: false,
		fade_in_speed: 500, // how fast notifications fade in (string or int)
		fade_out_speed: 500, // how fast the notices fade out
		time: 2000 // hang on the screen for...
	});

}

function initLoadingPanel(){
	
	$('.loading-panel').hide();
	
	var opts = {
			lines: 13, // The number of lines to draw
			length: 15, // The length of each line
			width: 4, // The line thickness
			radius: 25, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#FFF', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: true, // Whether to render a shadow
			hwaccel: true, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: '100%', // Top position relative to parent in px
			left: '100%' // Left position relative to parent in px
	};
	
	var spinner = new Spinner(opts).spin();
	$('.loading-panel .loading-image').append(spinner.el);
	
}

function showLoadingPanel(opts){
	
	var load = $('.loading-panel');
	var small = $('<h2>').attr('_id', opts.id);
	
	if(load.is(':visible')){
		
		small.html(', ' + opts.message);
		load.find('.loading-message').append(small);
		
	}else{
		
		small.html(opts.message);
		load.find('.loading-message').empty().append(small);
		load.fadeIn('slow');
		
	}
	
	return true;
	
}

function hideLoadingPanel(id){

	var load = $('.loading-panel');
	
	if(load.is(':visible')){
		
		if(load.find('.loading-message').children().size() > 1){
		
			load.find('small[_id="'+id+'"]').remove();
			
		}else{
		
			load.fadeOut('fast', function(){$(this).find('small[_id="'+id+'"]').remove();});
			
		}
		
	}
	
	return true;
	
}

function openAuthenticationPopup(authMethod, context){
	
	if(!authMethod){
		
		$.gritter.add({
			title: '<i class="icon-minus-sign"></i> Ooops!',
			text: 'Ocorreu um erro ao identificar o mecanismo de autenticação!',
			class_name: 'error'
		});
		
		return false;
		
	}

	var authWindow = window.open(__api_url + 'auth/' + authMethod, "authScreen_" + Math.random());
	
	authWindow.onbeforeunload = function(){
		
		if(window.__authenticated){
			
			processSuccessfulAuthentication(context);
			
		}else{
			
			$.gritter.add({
				title: '<i class="icon-minus-sign"></i> Ooops!',
				text: 'Não conseguimos autenticá-lo! Por favor, tente novamente.',
				class_name: 'error'
			});
			
		}
		
	};
	
}

function processSuccessfulAuthentication(context){

	if(!context) return false;

	switch(context){
	case __authContexts.discuss: processSuccessfulAuthentication_discuss(); break;
	default: return false;
	}

}

function processSuccessfulAuthentication_discuss(){
	
	var div = $('[data-cardname="you"]');
	
	div.find('.wizard-input-section').remove();
	div.append('<label><i class="icon-thumbs-up"></i>Você está logado! Agora é só partir para o próximo passo!</label>');
	
	return true;
	
}

function appendLogginResources(context){

	if(!context) return false;

	switch(context){
	case __authContexts.discuss: appendLogginResources_discuss(); break;
	default: return false;
	}
	
}

function appendLogginResources_discuss(){

	if(!__loginResources) return false;
	
	var div = $('[data-cardname="you"]');
	var section = $('<div>').addClass('wizard-input-section');
	var control = $('<div>').addClass('control-group');
	var resourcesLen = __loginResources.length;
	
	section.append('<p>Quase lá! Faça o seu login e pronto!</p>').append(control);
	
	while(resourcesLen--){
	
		var button = $('<button>').addClass('btn btn-large').html(__loginResources[resourcesLen].name).attr('data-auth-control', __loginResources[resourcesLen].method).click(function(){
			
			openAuthenticationPopup($(this).attr('data-auth-control'), __authContexts.discuss);
			
		});
		
		control.append(button);
		
	}
	
	div.find('.wizard-input-section').remove();
	div.append(section);
	
	return true;
	
}

function startUserAuthVerification(){
	
	if(!__authVerification) return false;
	
	var d = new Date().getTime();
	__authVerification.expiresAt = d + __authVerification.timeout;
	
	__authVerification.handler = window.setInterval(function(){
		
		var now = new Date().getTime();
		
		if(now > __authVerification.expiresAt){
			
			opener.__authenticated = false;
			self.close();
			
		}else{
		
			verifyUserAuth();
			
		}
		
	}, __authVerification.interval);
	
}

function verifyUserAuth(){

	$.ajax({
		type: "GET",
		url: __api_url + "auth/getStatus/",
		dataType: 'json',
		async: false,
		success: function(response){

			if(response && response.authenticated){
				
				if(response.authenticated === 'true'){
					
					if(opener){
					
						opener.__authenticated = true;
						self.close();
						
					}else{
						
						window.__authenticated = true;
						
					}
					
				}else{
					
					if(!opener){
						
						window.__authenticated = false;
						
					}
					
				}
				
			}

		}
	});
	
}

function bindPoliticianSearchEvent(input, resultContainer){

	var keyCode = $.ui.keyCode;
	
	input.bind('keyup', function(event){
		
		switch( event.keyCode ) {
		case keyCode.ENTER:	doPoliticianSearch($(this).val(), resultContainer); break;
		default: break;
		}
		
	});

}

function doPoliticianSearch(query, resultContainer){

	var politicianCollection = new PoliticianCollection();
	politicianCollection.fetch({
		url: 'http://api.custobr.com/1.0/politicians/getList?query=' + encodeURIComponent(query),
		success: function (data) {

			resultContainer.html(new PoliticianSearchResultListView({model: data}).render().el);
			
		}
	});
	
}

function verifyIfPoliticianSelected(card){
	
	var selectedPoliticians = card.el.find('li[_selected="true"]');
	
	if(selectedPoliticians.size() < 1){
		
		$.gritter.add({
			title: '<i class="icon-minus-sign"></i> Ainda não... ;-)',
			text: 'Você tem que escolher um político para poder manifestar!',
			class_name: 'error'
		});
		
		return false;
		
	}else{

		selectedPoliticians.each(function(){
			
			__discuss.politicians.push($(this).attr('_politician'));
			
		});
		
		return true;
		
	}
	
}

function verifyIfUserAuthenticated(card){
	
	if(__discuss && __discuss.authenticated && __discuss.authenticated === true){
		
		return true;
		
	}else{
		
		$.gritter.add({
			title: '<i class="icon-minus-sign"></i> Ainda não... ;-)',
			text: 'Você tem que se logar para poder manifestar!',
			class_name: 'error'
		});
		
		return false;
		
	}
	
}

function placeMarker(map, location){
	
	var marker = new google.maps.Marker({
        position: location,
        draggable: true,
        map: map
    });

	if(__discuss && __discuss.locations){
		
		__discuss.locations.push(location);
		
	}
	
	google.maps.event.addListener(marker, "dblclick", function() {

		marker.setMap(null);
		var len = __discuss.locations.length;
		
		while(len--){
			
			if(__discuss.locations[len] === marker.position){

				__discuss.locations.splice(len,1);
				
			}
			
		}
		
	});
	
}

function addFileUploadDependencies(){
	
	var jQFUPath = '/static/lib/jQuery-File-Upload';
	
	addCSS(jQFUPath + '/css/style.css');
	addCSS(jQFUPath + '/css/jquery.fileupload-ui.css');
	addCSS('http://blueimp.github.com/Bootstrap-Image-Gallery/css/bootstrap-image-gallery.min.css');
	addCSS(jQFUPath + '/css/jquery.fileupload-ui.css');
	/*
	addScript(jQFUPath + '/js/vendor/jquery.ui.widget.js', 'body');
	addScript(jQFUPath + '/js/JavaScript-Templates/tmpl.min.js', 'body');
	addScript(jQFUPath + '/js/JavaScript-Load-Image/load-image.min.js', 'body');
	addScript(jQFUPath + '/js/JavaScript-Canvas-to-Blob/canvas-to-blob.min.js', 'body');
	addScript(jQFUPath + '/js/bootstrap-image-gallery.min.js', 'body');
	addScript(jQFUPath + '/js/jquery.iframe-transport.js', 'body');
	addScript(jQFUPath + '/js/jquery.fileupload.js', 'body');
	addScript(jQFUPath + '/js/jquery.fileupload-process.js', 'body');
	addScript(jQFUPath + '/js/jquery.fileupload-resize.js', 'body');
	addScript(jQFUPath + '/js/jquery.fileupload-validate.js', 'body');
	addScript(jQFUPath + '/js/jquery.fileupload-ui.js', 'body');
	addScript(jQFUPath + '/js/main-upload.js', 'body');
	addScript(jQFUPath + '/js/cors/jquery.xdr-transport.js', 'body');
	*/
}

function bindUploadHandler(){

	'use strict';

	// Initialize the jQuery File Upload widget:
	$('#fileupload').fileupload({
		autoUpload: true,
		url: 'http://www.custobr.com:8888/'
	}).bind('fileuploadadd', function(e, data){

		var deleteButton = $('.upload-form button.delete');

		if(!deleteButton.is(':visible')){
			deleteButton.fadeIn('slow').next().fadeIn('slow');
		}

	}).bind('fileuploaddestroyed', function (e, data) {

		if(!$('.upload-form table tr').size()){

			$('.upload-form button.delete').fadeOut('fast').next().fadeOut('fast');

		}

	}).bind('fileuploaddestroy', function (e, data) {

		//Aqui eu consigo pegar o elemento.
		// Tenho que achar uma forma de conseguir pegar o elemento quando envio o arquivo, pra salvar o id arquivo.
		console.log(e);

	}).bind('fileuploadfailed', function (e, data) {

		if(!$('.upload-form table tr').size()){

			$('.upload-form button.delete').fadeOut('fast').next().fadeOut('fast');

		}

	}).bind('fileuploadcompleted', function (e, data) {

		var json = jQuery.parseJSON(data.jqXHR.responseText);
		var files = json.files;

		for(var i = 0; i < files.length; i++){

			data.filesContainer.find('[title="'+files[i].name+'"]').parents('tr').attr('data-id', files[i].id);
			__discuss.files.push(files[i]);

		}

	});

	// Load existing files:
	$('#fileupload').addClass('fileupload-processing');
	$.ajax({
		url: $('#fileupload').fileupload('option', 'url'),
		dataType: 'json',
		context: $('#fileupload')[0]
	}).always(function (result) {
		$(this).removeClass('fileupload-processing');
	}).done(function (result) {

	});

}