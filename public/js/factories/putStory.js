angular.module('scribe')
    .factory('putStory', function ($http) {

        return {

            putData: function(story, id) {

                return $http({

					method: 'PUT',
					url: '/api/update/' + id,
					data: story,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

				});
			}            
                
        }

    });
    

