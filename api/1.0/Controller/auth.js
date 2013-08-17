var http = require('http'),
	googleapis = require('googleapis'),
	OAuth2Client = googleapis.OAuth2Client;


var CLIENT_ID = '588821883529.apps.googleusercontent.com',
	CLIENT_SECRET = 'XaPmS-Q58PHk6fzLWsJF0d0B',
	REDIRECT_URL = 'http://www.custobr.com/oauth2/google';

Tags = {

		index: function(req, res, app, alien){

			res.send('Welcome to Index');

		},
		
		getStatus: function(req, res, app, alien){
			
			res.writeHead(200, { 
		        'Content-Type': 'text/plain',
		        'Access-Control-Allow-Origin': '*'
		    });
		    res.end('{"authenticated": "true", "exists": "true"}');
			
		},

		google: function(req, res, app, alien){

			googleapis.discover('identitytoolkit', 'v3').execute(function(err, client) {

				var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
				var url = oauth2Client.generateAuthUrl({
					access_type: 'offline',
					scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
				});

				res.redirect(url);

			});

		}
		
}

module.exports = Tags;
