$(document).ready(function(){
	
	initLoadingPanel();
	
	var loadId = Math.random();
	showLoadingPanel({id: loadId, message: 'Obtendo informações do usuário...'});
	
	startUserAuthVerification();
	
});