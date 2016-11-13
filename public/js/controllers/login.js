
angular.module('scribe')
	.controller('login', function newController($scope, $location, $rootScope, authenticate, checkLogin){

		$scope.status;

		$scope.login = function(){

            console.log("Logging you in now..");

			var user = $.param({
				username: $scope.username,
				password: $scope.password
			});

			authenticate.login(user)
				.then(function(data, status, headers, config){

					$scope.status = data;

					if(data.data.loggedIn){

						$rootScope.loggedIn = true;

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

	});
