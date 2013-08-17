var vMap = require('../../api/versions'),
	fs = require('fs'),
	path = require('path'),
	googleapis = require('googleapis'),
	OAuth2Client = googleapis.OAuth2Client;

var CLIENT_ID = '588821883529.apps.googleusercontent.com',
	CLIENT_SECRET = 'XaPmS-Q58PHk6fzLWsJF0d0B',
	REDIRECT_URL = 'http://www.custobr.com/oauth2/google';

function ALIEN_APP_getRootPath(){

	return path.dirname(module.parent.filename); 
	
}

function ALIEN_APP_loadModule(version, route){

	var rootPath = ALIEN_APP_getRootPath(),
	apiPath = rootPath + '/api/' + version.path,
	controllerPath = apiPath + 'Controller/' + route.controller;
	console.log(apiPath);
	if(!ALIEN_FS_directoryExists(apiPath)){
		
		return -1;
		
	}
	
	if(!ALIEN_FS_fileExists(controllerPath + '.js')){

		return -2;

	}
	
	return require(controllerPath);

}

function ALIEN_ROUTE_getParams(req){

	var pathPeaces = req.path.split('/'),
	subdomain = ALIEN_NETWORK_getSubdomain(req),
	domain = ALIEN_NETWORK_getDomain(req),
	isApi = subdomain === 'api',
	apiVersion = '',
	controller = 'home',
	action = 'index',
	params = [];
	
	pathPeaces.shift();
	
	if(isApi){
		
		apiVersion = pathPeaces.shift();
		
	}
	
	controller = pathPeaces.shift();
	action = pathPeaces.shift();
	params = pathPeaces;
	
	var route = {subdomain: subdomain, domain: domain, controller: controller, action: action, params: params, isApi: isApi, apiVersion: apiVersion};

	return route;
	
}

function ALIEN_NETWORK_getSubdomain(req){

	return req.subdomains[0];
	
}

function ALIEN_NETWORK_getDomain(req){

	var hostPeaces = req.host.split('.'),
	subdomainsLen = req.subdomains.length;
	
	while(subdomainsLen--){
		
		hostPeaces.shift();
		
	}
	
	return hostPeaces.join('.');
	
}

function ALIEN_API_getVersionObject(route){

	var version = (route.apiVersion && route.apiVersion.length) ? route.apiVersion : 'latest',
			vObj,
			isLatest = false;
	
	if(version === 'latest'){
		
		version = vMap.latest;
		isLatest = true;
		
	}
	
	if(!vMap.versions[version]){
		
		return isLatest ? false :  ALIEN_API_getVersionObject({apiVersion: 'latest'});
		
	}else{
		
		return vMap.versions[version];
		
	}
	
}

function ALIEN_FS_directoryExists(dir){

	try {

	    stats = fs.lstatSync(dir);

	    if (stats.isDirectory()) {

	    	return true;
	    	
	    }else{
	    	
	    	return false;
	    	
	    }
	}
	catch (e) {
		
		return false;
		
	}
	
}

function ALIEN_FS_fileExists(file){

	try {

	    stats = fs.lstatSync(file);

	    if (stats.isFile()) {

	    	return true;
	    	
	    }else{
	    	
	    	return false;
	    	
	    }
	}
	catch (e) {
		
		return false;
		
	}
	
}

function ALIEN_AUTH_google(req, res){
	
	try{

		googleapis.discover('oauth2', 'v2').execute(function(err, client) {

			if(err){

				console.log('An error occurred: ', err);

			}else if(client){

				var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

				oauth2Client.getToken(req.query.code, function(err, tokens) {

					if(err){

						console.log('An error occurred: ', err);
						
					}else{

						oauth2Client.credentials = tokens;
						client.oauth2.userinfo.get({ userId: 'me' }).withAuthClient(oauth2Client).execute(function(err, profile){

							if (err) {
								console.log('An error occurred: ', err);
							} else {
								console.log(profile);
							}

						});

					}

				});

			}

		});
		
		res.render('authentication.html', { title: 'CustoBr' });

	}catch(e){

		console.log('Error');
		res.render('authentication.html', { title: 'CustoBr' });

	}	
	    
}

Alien = {
		app:{
			getRootPath:		ALIEN_APP_getRootPath,
			loadModule:		ALIEN_APP_loadModule
		},
		route: {
			getParams:		ALIEN_ROUTE_getParams
		},
		network: {
			getSubdomain:		ALIEN_NETWORK_getSubdomain,
			getDomain:		ALIEN_NETWORK_getDomain
		},
		api: {
			getVersionObject:	ALIEN_API_getVersionObject
		},
		fs: {
			directoryExists:	ALIEN_FS_directoryExists,
			fileExists:		ALIEN_FS_fileExists
		},
		auth: {
			google:	ALIEN_AUTH_google
		}
};

module.exports = Alien;