
angular.module('scribe')
	.controller('collaborate', function homeController($scope, getStories, getRandom, putStory, getStoryById, putUpvote, putDownvote, putView){

		$scope.success = {"display": "none"}
		var id;

		function refreshStory(id){

			getStoryById.getStory(id)
				.then(function(data){
					console.log("Got story: " + data.data.title);
                    $scope.story = data.data;
                });
                
        }

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

		$scope.getNew = function(){

			getRandom.getData()
				.then(function(resp){

	            	$scope.story = resp.data;

	            	id = resp.data._id;

	            	viewPlus(id);

	            	$scope.success = {"display": "none"}

	            	if(!resp.data.author){
                    	$scope.auth = {"display": "none"};
                    }	

	            	$scope.paragraph = "";

	        	})
	        	.catch(function(e){

	        		console.log("Error: " + e);

	        	});

        }

		$scope.getNew();

		$scope.update = function(){

			var story = $.param({ story: $scope.paragraph, complete: $scope.complete });

			putStory.putData(story, id)
				.then(function(data, status, headers, config){

					$scope.success = {"display": "block"}

					$scope.status = "Your story has now been saved!";

					$scope.paragraph = "";

					refreshStory(id);

				})
				.catch(function(data, status, headers, config){

					console.log("Error" + data);

					$scope.status = "There was an error posting...";

				});

		}

	});
