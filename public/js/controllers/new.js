
angular.module('scribe')
	.controller('newStory', function newController($scope, createStory, userInfo){

		var currentGenre, username;
		$scope.status = "";
		$scope.success = {"display": "none"}
		$scope.link = {"display": "none"}

		userInfo.getUser()
			.then(function(data, status, headers, config){
				username = data.data.username;
			})
			.catch(function(e){

				console.log("There was an error getting user info: " + e);

			});

		$scope.genres = [
		   { id: 1, type: "" },
		   { id: 2, type: "Comedy" }, 
		   { id: 3, type: "Mystery" }, 
		   { id: 4, type: "Horror" }, 
		   { id: 5, type: "Thriller" }
		];

		$scope.genreSelected = $scope.genres[0].id;

		$scope.getGenre = function(id){
			currentGenre = id.type;
		}

		$scope.send = function(){

			console.log(currentGenre);

			var story = $.param({ 
				title: $scope.title, 
			  	story: $scope.story, 
			  	author: username, 
			 	genre: currentGenre 
			});

			createStory.postStory(story)
				.then(function(data, status, headers, config){

					$scope.status = "Your story has now been saved!";

					$scope.success = {"display": "block"}
					$scope.link = {"display": "block"}

					$scope.title = "";
					$scope.story = "";
					$scope.genreSelected = $scope.genres[0].id;

					$scope.newStoryForm.$setPristine();

					$scope.link = "/stories/" + data.data._id;

				})
				.catch(function(e){

					console.log("There was an error creating the story: " + e);

					$scope.status = "There was an error posting...";

				});

		}


	});
