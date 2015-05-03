'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// tạo cấu trúc db
var schema = mongoose.Schema({
    displayName:   {type: 'String', required: true},
    email:         {type: 'String', required: true},
    password:      {type: 'String', default: null},
    avatar:        {type: 'String', default: null},
    role:          {type: 'String',required:true},
});

// tạo ra mã hash
schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// kiểm tra mật khẩu hợp lệ
schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// tạo model cho user và export vào app
module.exports = mongoose.model('User', schema);
