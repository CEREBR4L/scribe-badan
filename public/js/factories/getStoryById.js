angular.module('scribe')
    .factory('getStoryById', function ($http) {

        return {

            getStory: function(id) {

                return $http.get('/api/get/story/' + id)
			                .success(function(data){

			                    return data;
			                    
			                });
                
            }

        };
        
});

