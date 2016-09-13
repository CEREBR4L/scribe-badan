
angular.module('scribe')
	.controller('storyById', function storyByIdController($scope,  $routeParams, $http){

		var id = $routeParams.storyId;

		$scope.title = id;

		$http.get('/api/get/story/' + id)
			.success(function(data){
	            $scope.story = data;
	        });


	});
    
