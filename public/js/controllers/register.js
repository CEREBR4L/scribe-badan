
angular.module('scribe')
	.controller('register', function newController($scope, createUser){

		$scope.status = "";

		$scope.register = function(){

            console.log("You are being registered now!");

			var user = $.param({
				username: $scope.username,
				password: $scope.password,
				email: $scope.email
			});

			createUser.postUser(user)
				.then(function(data, status, headers, config){

					$scope.status = data;

				})
				.catch(function(e){

					console.log("There was an error creating your account: " + e);

					$scope.status = "Error creating user.";

				});

        }

	});
