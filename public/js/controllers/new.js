
angular.module('scribe')
	.controller('newStory', function newController($scope, createStory){

		$scope.status = "";
		$scope.success = {"display": "none"}
		$scope.link = {"display": "none"}

		$scope.send = function(){

			var story = $.param({ title: $scope.title, story: $scope.story });

			createStory.postStory(story)
				.then(function(data, status, headers, config){

					$scope.status = "Your story has now been saved!";

					$scope.success = {"display": "block"}
					$scope.link = {"display": "block"}

					$scope.title = "";
					$scope.story = "";

					$scope.link = "/stories/" + data.data._id;

				})
				.catch(function(e){

					console.log("There was an error creating the story: " + e);

					$scope.status = "There was an error posting...";

				});

		}


	});
