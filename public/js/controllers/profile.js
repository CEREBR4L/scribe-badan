
angular.module('scribe')
	.controller('profile', function newController($scope, userInfo, userStories){

        $scope.user; 

		userInfo.getUser()
			.then(function(data, status, headers, config){
				$scope.user = data.data;
			})
			.catch(function(e){

				console.log("There was an error getting user info: " + e);

			});

		userStories.getStories()
			.then(function(data, status, headers, config){
				$scope.stories = data.data;
			})
			.catch(function(e){

				console.log("There was an error getting user info: " + e);

			});


	});
