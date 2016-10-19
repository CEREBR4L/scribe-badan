
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
				.then(function(resp){

					console.log("Got story: " + resp.data.title);
                    $scope.story = resp.data;

                    if(!resp.data.author){
                    	$scope.auth = {"display": "none"};
                    }	

                    viewPlus(id);

                })
                .catch(function(e){
                	console.log("There was an error getting story: " + e);
                })
                
        }

	    $scope.getStory(id);

	    $scope.update = function(){

	    	console.log($scope.complete);

			var story = $.param({ story: $scope.paragraph, complete: $scope.complete });

			putStory.putData(story, id)
				.then(function(data, status, headers, config){

					$scope.success = {"display": "block"}

					$scope.status = "Your story has now been updated!";

					$scope.paragraph = "";

					$scope.getStory(id);

				})
				.catch(function(e){
					
					console.log("Error updating: " + e);

					$scope.status = "There was an error posting...";

				});

		}


	});
    
