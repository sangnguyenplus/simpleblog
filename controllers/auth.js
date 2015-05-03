var User = require('../models/user');
var passport = require('passport');
require('../library/passport')(passport);

module.exports = function (app) {
	//Quản lý thành viên
    app.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });
     // xử lý trang đăng nhập
	app.post('/login', passport.authenticate('login'), function(req, res) {
	  res.send(req.user);
	});

    // xử lý trang đăng ký
    app.post('/signup', passport.authenticate('signup'), function(req, res) {
	    res.send(req.user);
	});
    // Đăng xuất
    app.get('/logout', function(req, res) {
            req.logout();
            req.session.destroy();
            res.send(200);
    });
	//Xử lý đăng nhập facebook -------------------------------

    // gửi thông tin đến facebook để yêu cầu xác thực
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // xử lý callback sau khi facebook đã xác thực user
    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                    successRedirect : '/',
                    failureRedirect : '/login'
            }));


    // Xử lý đăng nhập qua tài khoản google ---------------------------------

    // gửi thông tin đến facebook để yêu cầu xác thực
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // xử lý callback sau khi goog đã xác thực user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/login'
            }));
}