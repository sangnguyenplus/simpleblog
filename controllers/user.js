var User = require('../models/user');

module.exports = function(app){
	app.post('/api/user/getUserbyEmail', function(req, res){
		User.find({email: req.body.email}, function(err, user){
			if(err)
				res.send(err);
			res.send(user);
		});
	});
}