angular.module('UserCtrl',[])


.controller('UserController',['$scope', '$state', '$rootScope','$cookieStore','$window', '$http','$location','$stateParams','flash', 'User','AuthenticationService',
          function($scope, $state, $rootScope,$cookieStore,$window, $http,$location,$stateParams,flash, User,AuthenticationService) {

  $scope.userData = {};
   $scope.login = function() {
    $scope.Proccess=true;
    if (!$.isEmptyObject($scope.userData)) {
            $rootScope.successMsg='';

            User.getUserbyEmail($scope.userData)
            .success(function(u){
              if(u.length>0){
                  User.login($scope.userData)
                  .success(function(data){
                           $cookieStore.put('currentUser',data);
                           $rootScope.currentUser=$cookieStore.get('currentUser');
                           AuthenticationService.isLogged = true;
                           $window.sessionStorage.token = data.token;
                           flash.success="Chào mừng "+$cookieStore.get('currentUser').displayName+" quay lại!";
                          if($rootScope.oldState!==''&& $rootScope.oldState!=='active_account'){
                            if($rootScope.oldParam.id!==null)
                              $state.go($rootScope.oldState,{id: $rootScope.oldParam.id });
                            else
                              $state.go($rootScope.oldState);
                          }
                          else
                            $state.go("home");
                  })
                   .error(function(){
                        flash.error = 'Email hoặc mật khẩu không chính xác.';
                        $scope.Proccess = false;
                        $state.go("login");
                      });
              }
              else
              {
                 flash.error = 'Email hoặc mật khẩu không chính xác.';
                  $scope.Proccess = false;
                  $state.go("login");
              }

            });
    }
  };
  $scope.signup = function() {
    $scope.Proccess=true;
    if (!$.isEmptyObject($scope.userData)) {
      User.signup($scope.userData)
      .success(function(data){
         flash.success="Đăng ký thành công.";
            $state.go("home");
      })
     .error(function(){
          flash.error = 'Email này đã được sử dụng, hãy chọn email khác.';
          $scope.Proccess = false;
          $state.go("register");
        });
    }
  };
  $scope.logout = function(){
    User.logout()
      .success(function(){
          $rootScope.currentUser=null;
          $cookieStore.remove('currentUser');
          if (AuthenticationService.isLogged) {
              AuthenticationService.isLogged = false;
              delete $window.sessionStorage.token;
            }
          flash.success="Đăng xuất thành công!";
      });
  };
}]);