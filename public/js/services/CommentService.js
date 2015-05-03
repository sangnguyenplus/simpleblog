angular.module('CommentService', [])
.factory('Comment',['$http', function($http) {
    return {
        create : function(formData){
            return $http.post('/api/comment/create', formData);
        }
    };
}]);