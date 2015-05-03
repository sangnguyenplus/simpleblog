angular.module('appServices', [])
.service('appAlert',['$modal','$http', function($modal,$http) {
    this.alert=function(data,callback) {
        var modalInstance = $modal.open({
            templateUrl: '/templates/modal/alert.html',
            controller: 'modal.alert',
            backdrop:'static',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
        modalInstance.result.then(function () {
        }, function () {
        });
    };

    this.confirm=function(data,callback) {
        var modalInstance = $modal.open({
            templateUrl: '/templates/modal/confirm.html',
            controller: 'modal.confirm',
            backdrop:'static',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
        modalInstance.result.then(function () {
            return callback(true);
        }, function () {
            return callback(false);
        });
    };
}]);