
angular.module('scribe')
	.controller('storyById', function storyByIdController($scope,  $routeParams, $http){

		var id = $routeParams.storyId;

		$scope.title = id;
		$scope.success = {"display": "none"}

		$scope.getStory = function(){

			$http.get('/api/get/story/' + id)
			.success(function(data){
	            $scope.story = data;
	        });

	    }

	    $scope.getStory();

	    $scope.update = function(){

			var story = $.param({ story: $scope.paragraph });

			$http({

				method: 'PUT',
				url: '/api/update/' + id,
				data: story,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

			})
			.success(function(data, status, headers, config){

				$scope.success = {"display": "block"}

				$scope.status = "Your story has now been saved!";

				$scope.getStory();

			})
			.error(function(data, status, headers, config){

				$scope.status = "There was an error posting...";

			});

		}


	});
    
