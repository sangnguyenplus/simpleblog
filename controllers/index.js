'use strict';

var user = require('./user');
var auth = require('./auth');
var post = require('./post');
var comment = require('./comment');

module.exports = function (app) {

	auth(app);
	user(app);
	post(app);
	comment(app);
	app.get('*', function(req, res){
    	res.sendfile('public/index.html');
	});
};
