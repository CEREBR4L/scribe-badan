angular.module('scribe')
    .factory('putUpvote', function ($http) {

        return {

            add: function(id) {

                return $http.put('/api/addPos/' + id)
                			.then(function(data){
                				return data;
                			});

			}            
                
        }

    });
    

