angular.module('appModal', []).
controller('modal.alert',['$scope', '$modalInstance','data', function($scope, $modalInstance,data)
{
    $scope.data=data;
    $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}])
.controller('modal.confirm',['$scope', '$modalInstance','data',function($scope, $modalInstance,data)
{
    $scope.data=data;
    $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);