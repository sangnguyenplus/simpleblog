'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
   title:         {type: 'String', required: true,index:true},
   description:       {type: 'String', required: true},
   content:       {type: 'String', required: true},
   userId:        {type: ObjectId, ref: 'User' },
   creationDate:  {type: 'Date', required: true}

});

schema.statics.findComments = function (id, callback) {
  return this.model('Comment').find({ postId: id }, callback);
}

module.exports = mongoose.model('Post', schema);