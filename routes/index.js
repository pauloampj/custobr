exports.index = function(req, res, app, alien){
	
	var route = alien.route.getParams(req),
	appPath = alien.app.getRootPath();

	/**
	 * Conteúdo estático (por subdominio), como css, js e imagens.
	 */
	if(route.subdomain === 'static'){
		
		res.sendfile(appPath + '/public' + req.path);
		
	}
	
	/**
	 * Conteúdo de outro subdominio...
	 */
	else{

		/**
		 * Conteúdo estático (por outro subdominio, mas com /static), como css, js e imagens.
		 */
		if(route.controller === 'static'){

			res.sendfile(appPath + req.path.replace('static', 'public'));

		}

		/**
		 * Requisição de autenticação
		 */
		else if(route.controller === 'oauth2'){

			var resp = '';

			if(alien.auth[route.action]){
				
				alien.auth[route.action](req, res);
				
			}else{
				
				resp = 'Ooops! O método de autenticação para ' + route.action + ' não existe!';
				
			}
			
			res.send(resp);

		}
		
		/**
		 * Conteúdo dinâmico, como templates
		 */
		else{

			res.render('index.html', { title: 'CustoBr' });

		}

	}
  
};
