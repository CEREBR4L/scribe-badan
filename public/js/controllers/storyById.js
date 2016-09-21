
angular.module('scribe')
	.controller('storyById', function storyByIdController($scope,  $routeParams, getStoryById, putStory){

		var id = $routeParams.storyId;

		$scope.title = id;
		$scope.success = {"display": "none"}

		$scope.getStory = function(id){

			getStoryById.getStory(id)
				.then(function(data){
					console.log("Got story: " + data.data.title);
                    $scope.story = data.data;
                });
                
        }

	    $scope.getStory(id);

	    $scope.update = function(){

			var story = $.param({ story: $scope.paragraph });

			putStory.putData(story, id)
				.then(function(data, status, headers, config){

					$scope.success = {"display": "block"}

					$scope.status = "Your story has now been saved!";

					$scope.paragraph = "";

					$scope.getStory(id);

				})
				.catch(function(e){
					
					console.log("Error updating: " + e);

					$scope.status = "There was an error posting...";

				});

		}


	});
    
