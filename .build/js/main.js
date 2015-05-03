var app=angular.module('SimpleBlog', [
  'ui.router',
  'ngCookies',
  'ngSanitize',
  'angular-flash.service',
  'angular-flash.flash-alert-directive',
  'ui.bootstrap',
  'ngAnimate',
  'ngMaterial',
  'ngMessages',
  'appRoutes',
  'appDirectives',
  'appFilters',
  'appServices',
  'appModal',
  'MainCtrl',
  'UserService',
  'UserCtrl',
  'PostCtrl',
  'PostService',
  'CommentCtrl',
  'CommentService'
]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);
/*Cấu hình thông báo lỗi*/
app.config(['flashProvider', function (flashProvider) {

  flashProvider.errorClassnames.push('alert-danger');
  flashProvider.warnClassnames.push('alert-warning');
  flashProvider.infoClassnames.push('alert-info');
  flashProvider.successClassnames.push('alert-success');

}]);
/*Cập nhật tiêu đề trang*/
app.run([
    '$log', '$rootScope','$timeout', '$window', '$state', '$location','AuthenticationService','flash',
    function($log, $rootScope,$timeout, $window, $state, $location,AuthenticationService, flash) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.currentState=toState.name;
      $rootScope.currentParam=toParams;
      $rootScope.oldState=fromState.name;
      $rootScope.oldParam = fromParams;
        if (toState.title) {
            $rootScope.pageTitle = toState.title + ' | Simple Blog';
        }
        else{
            $rootScope.pageTitle="Simple Blog";
        }
        /*Xác thực quyền thành viên khi truy cập vào trang cần đăng nhập*/
        if (toState.access.requiredLogin && !AuthenticationService.isLogged){
          /*Nếu người dùng chưa đăng nhập*/
          flash.error="Bạn cần đăng nhập để truy cập vào khu vực này!";
          $state.transitionTo("login");
          event.preventDefault();
        }
    });
}]);
