angular.module('PostCtrl',[])


.controller('ListPostController',['$scope', '$state','flash','Post', function($scope, $state,flash, Post) {
	Post.get().success(function(data){
		$scope.post=data;
	});
}])
.controller('CreatePostController',['$scope', '$state','flash','Post', function($scope, $state,flash, Post) {

 	$scope.formData = {};

    $scope.createPost= function() {
            $scope.Proccess=true;
            if (!$.isEmptyObject($scope.formData)) {
                    Post.create($scope.formData)
                            .success(function(data) {
                                    $scope.formData = {};
                                    $scope.form.$setPristine();
                                    $scope.Proccess=false;
                                    flash.success= "Thêm bài viết mới thành công!";
                                    $state.go('post_detail', {id: data._id});
                            })
                            .error(function() {
                                flash.error="Có lỗi trong quá trình thêm bài viết.";
                            });
            }
            else{
                flash.error="Bạn cần điền đầy đủ các mục.";
                $scope.Proccess=false;
            }
    };
}])
.controller('DetailPostController',['$scope', '$state', '$http', '$stateParams','flash','$modal','appAlert','Post', 'Comment',
    function($scope, $state, $http,$stateParams,flash,$modal,appAlert, Post, Comment) {
	$scope.loading=true;
    Post.detail($stateParams.id)
        .success(function(data){
            if(data.title!=null){
                $scope.post=data;
                $scope.loading=false;
            }
            else
                $state.go("404");
        })
        .error(function(){
            console.log("error");
        });
    Post.getComment($stateParams.id)
        .success(function(data){
          $scope.comments=data;
        })
        .error(function(){
            console.log("error");
        });
    $scope.deletePost = function(post_id){
        appAlert.confirm({title:"Xác nhận xóa",message:"Bạn chắc chắn muốn xóa bài viết này ?"},function(isOk){
            if(isOk){
                Post.delete(post_id).success(function(){
                    flash.success = 'Xóa bài viết thành công';
                    $state.go('home');
                })
                .error(function() {
                    flash.error = 'Có lỗi trong quá trình xóa bài viết';
                });
            }
        });
    };
    $scope.editPost = function(){
        $scope.Proccess=true;
        if (!$.isEmptyObject($scope.post)) {
            Post.edit($scope.post)
                .success(function(data) {
                        $scope.Proccess=false;
                        flash.success= "Sửa bài viết thành công!";
                })
                .error(function() {
                    flash.error="Có lỗi trong quá trình sửa bài viết.";
                });
        }
        else{
            flash.error="Bạn cần điền đầy đủ các mục.";
            $scope.Proccess=false;
        }
    };
    $scope.addComment = function(){
        $scope.Proccess=true;
        if (!$.isEmptyObject($scope.comment)) {
            Comment.create({content: $scope.comment.content, postId: $scope.post._id})
                .success(function(data) {
                        $scope.comments = data;
                        $scope.Proccess=false;
                        flash.success= "Gửi bình luận thành công!";
                })
                .error(function() {
                    flash.error="Có lỗi trong quá trình gửi bình luận.";
                });
        }
        else{
            flash.error="Bạn cần điền đầy đủ các mục.";
            $scope.Proccess=false;
        }
    }
}]);