angular.module('scribe')
    .factory('userStories', function ($http) {

        return {

            getStories: function() {

                return $http.get('/api/auth/userStories')
			                .success(function(data){

			                    return data;
			                    
			                });
                
            }

        };
        
});

