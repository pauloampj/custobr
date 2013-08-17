Articles = {
		
		index: function(req, res, app, alien){
		
			res.send('Welcome to Index');
			
		},
		
		add: function(req, res, app, alien){
			
			res.send('Adding new article');
			
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
			
		    res.end('[{"name": "White Elephant", "state": "RS"},{"name": "Darth Vader", "state": "SW"},{"name": "Zezinho", "state": "PR"},{"name": "Norman Bates", "state": "PS"}]'); // removed the 'callback' stuff
		    
		},

		getRelations: function(req, res, app, alien){

			res.writeHead(200, {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*' // implementation of CORS
			});

			res.end('[{"name": "White Elephant", "state": "RS"},{"name": "Darth Vader", "state": "SW"},{"name": "Zezinho", "state": "PR"},{"name": "Norman Bates", "state": "PS"}]'); // removed the 'callback' stuff

		}
}

module.exports = Articles;
