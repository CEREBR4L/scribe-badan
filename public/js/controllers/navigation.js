
angular.module('scribe')
	.controller('navigation', function newController($scope, $rootScope, $location, checkLogin, logout){

		checkLogin.getLoginStatus()
            .then(function(data, status, headers, config){

                $rootScope.loggedIn = data.data.authenticated;

            });

        $rootScope.logout = function(){

            logout.getLoggedOut()
                .then(function(data, status, headers, config){

                    $rootScope.loggedIn = false;

                    $location.path('/');

                });

        }

	});
