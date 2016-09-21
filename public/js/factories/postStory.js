angular.module('scribe')
    .factory('createStory', function ($http) {

        return {

            postStory: function(story) {

                return $http({

					method: 'POST',
					url: '/api/new',
					data: story,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

				});

			} 

        }

    });
    

