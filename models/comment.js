'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
   content:       {type: 'String', required: true},
   postId:        {type: ObjectId, ref: 'Post' },
   userId:        {type: ObjectId, ref: 'User' },
   creationDate:  {type: 'Date', required: true}

});

module.exports = mongoose.model('Comment', schema);