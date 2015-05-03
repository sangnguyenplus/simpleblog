angular.module('MainCtrl',[])

.controller('MainController',['$scope','$cookieStore', '$window', '$http','$rootScope','AuthenticationService',
    function($scope,$cookieStore,$window, $http,$rootScope,AuthenticationService) {
		$scope.$on('$viewContentLoaded', function (){
	         moment.locale('vi', {});
	    });
		if($rootScope.currentUser==null){
            $http.get('/loggedin').success(function(data){
                 if(data!=="0"){
                    $cookieStore.put('currentUser',data);
                    $rootScope.currentUser=$cookieStore.get('currentUser');
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                 }
                 else{
                    $rootScope.currentUser=null;
                 }
            });
        }
}]);