exports.index = function(req, res, app, alien){

	var route = alien.route.getParams(req),
	version = alien.api.getVersionObject(route),
	module = alien.app.loadModule(version, route);

	if(module === -1){

		res.send('A versão informada [' + version.name + '], da API, não foi encontrada.');

	}

	if(module === -2){

		res.send('O controlador informado [' + route.controller + '], da API, não foi encontrado.');

	}

	if(!module[route.action]){

		res.send('A ação informada [' + route.action + '] não foi encontrada.');

	}

	module[route.action](req, res, app, alien);

};