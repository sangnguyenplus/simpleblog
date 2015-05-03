var Post = require('../models/post');

module.exports = function(app){
	app.get('/api/post/list', function(req, res){
		Post.find({}).populate('userId').sort({creationDate: -1}).exec(function(err, posts) {
			if (err)
				res.send(err)
			res.json(posts);
		});
	});
	app.post('/api/post/create', function(req, res){
		var newPost = new Post();
		newPost.title = req.body.title;
		newPost.description = req.body.description;
		newPost.content = req.body.content;
		newPost.userId = req.user._id;
		newPost.creationDate = new Date();
		newPost.save(function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	});
	app.get('/api/post/detail/:post_id', function(req, res){
		Post.findById(req.params.post_id).populate('userId').exec(function(err, post){
        	if (err)
				res.send(err)
			res.json(post);
        });
	});
	app.delete('/api/post/delete/:post_id', function(req, res) {
		Post.remove({_id : req.params.post_id}, function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	});
	app.post('/api/post/edit', function(req, res){
		Post.findById(req.body._id, function(err, data){
			if(err)
				res.send(err);
			data.title = req.body.title;
			data.description = req.body.description;
			data.content = req.body.content;
			data.save(function(err, post) {
				if (err)
					res.send(err);
				res.json(post);
			});
		});
	});
	app.get('/api/post/findComments/:post_id', function(req, res) {
		Post.findComments(req.params.post_id).populate('userId').sort({creationDate: -1}).exec(function(err,comment){
			res.json(comment);
		});
     });
}