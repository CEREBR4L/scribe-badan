
angular.module('scribe')
	.controller('storyById', function storyByIdController($scope,  $routeParams, getStoryById, putStory, putUpvote, putDownvote, putView){

		var id = $routeParams.storyId;

		$scope.title = id;
		$scope.success = {"display": "none"}

		function viewPlus(id){

        	putView.add(id)
				.then(function(data){
					console.log("View added to story: " + data.data.title);
                    $scope.story = data.data;
                })
                .catch(function(e){
                	console.log("Error adding view: " + e);
                });

        }

		$scope.addUpvote = function(){

			putUpvote.add(id)
				.then(function(data){
					console.log("Upvote added!");
					$scope.story = data.data;
				})
				.catch(function(e){
					console.log("There was an error: " + e);
				});

		}

		$scope.addDownvote = function(){

			putDownvote.add(id)
				.then(function(data){
					console.log("Downvote added!");
					$scope.story = data.data;
				})
				.catch(function(e){
					console.log("There was an error: " + e);
				});

		}

		$scope.getStory = function(id){

			getStoryById.getStory(id)
				.then(function(data){
					console.log("Got story: " + data.data.title);
                    $scope.story = data.data;
                    viewPlus(id);
                })
                .catch(function(e){
                	console.log("There was an error getting story: " + e);
                })
                
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
    
