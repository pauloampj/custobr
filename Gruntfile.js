'use_strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function(connect, dir){

	return connect.static(require('path').resolve(dir));

};

module.exports = function(grunt){
	
	grunt.initConfig({
		watch: {
			options: {
				nospawn: true,
				liverreload: true
			}
		}
		
	});


}
