angular.module('scribe')
    .factory('authenticate', function ($http) {

        return {

            login: function(user) {

                return $http({

					method: 'POST',
					url: '/api/auth/authenticate',
					data: user,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

				});

			} 

        }

    });
    