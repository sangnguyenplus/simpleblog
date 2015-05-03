var Comment = require('../models/comment');

module.exports = function(app){
	app.post('/api/comment/create', function(req, res){
		var newComment = new Comment();
		newComment.content = req.body.content;
		newComment.postId = req.body.postId;
		newComment.userId = req.user._id;
		newComment.creationDate = new Date();
		newComment.save(function(err, comment) {
			if (err)
				res.send(err);
			Comment.find({postId: comment.postId}).populate('userId').sort({creationDate: -1}).exec(function(err, comments) {
				if (err)
					res.send(err)
				res.json(comments);
			});
		});
	});
}