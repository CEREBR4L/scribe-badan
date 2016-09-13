
angular.module('scribe')
	.controller('home', function homeController($scope, $http, getStories, getRandom){

		$scope.success = {"display": "none"}
		var id;

		function refreshStory(){

			$http.get('/api/get/story/' + id)
				.success(function(data){
                    $scope.story = data;
                });
                
        }

		$scope.getNew = function(){
			getRandom.getData().then(function(resp){

            	$scope.story = resp.data;

            	id = resp.data._id

            	$scope.success = {"display": "none"}

            	$scope.paragraph = '';

        	})
        }

		$scope.getNew();

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

				refreshStory();

			})
			.error(function(data, status, headers, config){

				$scope.status = "There was an error posting...";

			});

		}

	});
