
angular.module('scribe')
	.controller('newStory', function newController($scope, $http){

		$scope.status = "";
		$scope.success = {"visibility": "hidden"}

		$scope.send = function(){

			var story = $.param({ title: $scope.title, story: $scope.story });

			$http({

				method: 'POST',
				url: '/api/new',
				data: story,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

			})
			.success(function(data, status, headers, config){

				$scope.success = {"visibility": "visible"}

				$scope.status = "Your story has now been saved!";

			})
			.error(function(data, status, headers, config){

				$scope.status = "There was an error posting...";

			});

		}


	});
