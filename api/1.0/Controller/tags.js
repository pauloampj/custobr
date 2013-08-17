Tags = {

		index: function(req, res, app, alien){

			res.send('Welcome to Index');

		},

		add: function(req, res, app, alien){

			res.send('Adding new tag');

		},

		get: function(req, res, app, alien){

			res.writeHead(200, { 
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*' // implementation of CORS
			});
			res.end('{"msg": "OK"}'); // removed the 'callback' stuff

		},

		getList: function(req, res, app, alien){

			res.writeHead(200, { 
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*' // implementation of CORS
			});

			res.end('[{"name": "Politica", "state": "RS"},{"name": "Diversos", "state": "SW"},{"name": "Entretenimento", "state": "PR"},{"name": "Debate", "state": "PS"}]'); // removed the 'callback' stuff

		},

		getRelations: function(req, res, app, alien){

			res.writeHead(200, {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*' // implementation of CORS
			});

			res.end('[{"name": "Politica", "state": "RS"},{"name": "Diversos", "state": "SW"},{"name": "Entretenimento", "state": "PR"},{"name": "Debate", "state": "PS"}]'); // removed the 'callback' stuff

		}
}

module.exports = Tags;
