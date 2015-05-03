angular.module('appRoutes',[]).config(['$stateProvider', '$urlRouterProvider','$locationProvider',
 function($stateProvider, $urlRouterProvider,$locationProvider){
  $urlRouterProvider.otherwise("/404.html");
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/home.html",
      controller: 'ListPostController',
      access: { requiredLogin: false },
    })
  .state('register', {
    url: "/register",
    templateUrl : 'templates/register.html',
    controller :'UserController',
        title: 'Đăng ký thành viên',
        access: { requiredLogin: false }
  })
  .state('login', {
    url: "/login",
    templateUrl : 'templates/login.html',
    controller :'UserController',
        title: 'Đăng nhập hệ thống',
        access: { requiredLogin: false }
  })
  .state('create_post', {
    url: "/post/create",
    templateUrl : 'templates/post/create.html',
    controller :'CreatePostController',
        title: 'Thêm bài viết mới',
        access: { requiredLogin: true }
  })
  .state('post_detail', {
    url: "/post/detail/:id",
    templateUrl : 'templates/post/detail.html',
    controller :'DetailPostController',
        title: 'Chi tiết bài viết',
        access: { requiredLogin: false }
  })
  .state('edit_post', {
    url: "/post/edit/:id",
    templateUrl : 'templates/post/edit.html',
    controller :'DetailPostController',
        title: 'Sửa bài viết',
        access: { requiredLogin: false }
  })
  	.state('404', {
  		url: "/404.html",
  		templateUrl : 'templates/404.html',
        	title: '404 - Không tìm thấy trang yêu cầu',
        	access: { requiredLogin: false }
  	});
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);