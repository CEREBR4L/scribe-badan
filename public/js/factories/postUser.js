angular.module('scribe')
    .factory('createUser', function ($http) {

        return {

            postUser: function(user) {

                return $http({

					method: 'POST',
					url: '/api/auth/new',
					data: user,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

				});

			} 

        }

    });
    

