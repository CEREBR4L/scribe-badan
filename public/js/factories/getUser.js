angular.module('scribe')
    .factory('userInfo', function ($http) {

        return {

            getUser: function() {

                return $http.get('/api/auth/user')
			                .success(function(data){

			                    return data;
			                    
			                });
                
            }

        };
        
});

