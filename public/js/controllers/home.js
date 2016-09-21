
angular.module('scribe')
	.controller('home', function homeController($scope, getStories, getRandom, putStory, getStoryById){

		$scope.success = {"display": "none"}
		var id;

		function refreshStory(id){

			getStoryById.getStory(id)
				.then(function(data){
					console.log("Got story: " + data.data.title);
                    $scope.story = data.data;
                });
                
        }

		$scope.getNew = function(){

			getRandom.getData()
				.then(function(resp){

	            	$scope.story = resp.data;

	            	id = resp.data._id

	            	$scope.success = {"display": "none"}

	            	$scope.paragraph = '';

	        	})
	        	.catch(function(e){

	        		console.log("Error: " + e);

	        	});

        }

		$scope.getNew();

		$scope.update = function(){

			var story = $.param({ story: $scope.paragraph });

			putStory.putData(story, id)
				.then(function(data, status, headers, config){

					$scope.success = {"display": "block"}

					$scope.status = "Your story has now been saved!";

					refreshStory(id);

				})
				.catch(function(data, status, headers, config){

					console.log("Error" + data);

					$scope.status = "There was an error posting...";

				});

		}

	});
