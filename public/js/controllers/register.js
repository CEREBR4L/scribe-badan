
angular.module('scribe')
	.controller('register', function newController($scope, $location, createUser, authenticate){

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

					if(data.data.authenticated){

						console.log('logging in...');

						var login = $.param({
							username: $scope.username,
							password: $scope.password
						});

						
						authenticate.login(login)
							.then(function(data, status, headers, config){

								if(data.data.loggedIn){
									$location.path('/profile');
								}
								else{
									$scope.status = "Failed to log you in";
								}

							})
							.catch(function(e){

								console.log("There was an error logging user in: " + e);

								$scope.status = "Error logging user in.";

							});

					}

				})
				.catch(function(e){

					console.log("There was an error creating your account: " + e);

					$scope.status = "Error creating user.";

				});

        }

	});
