
angular.module('scribe')
	.controller('newStory', function newController($scope, $http){

		$scope.status = "";
		$scope.success = {"display": "none"}

		$scope.send = function(){

			var story = $.param({ title: $scope.title, story: $scope.story });

			$http({

				method: 'POST',
				url: '/api/new',
				data: story,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

			})
			.success(function(data, status, headers, config){

				$scope.status = "Your story has now been saved!";

				$scope.success = {"display": "block"}

			})
			.error(function(data, status, headers, config){

				$scope.status = "There was an error posting...";

			});

		}


	});
