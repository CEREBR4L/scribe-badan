angular.module('scribe')
    .factory('putDownvote', function ($http) {

        return {

            add: function(id) {

                return $http.put('/api/addNeg/' + id)
                			.then(function(data){
                				return data;
                			});

			}            
                
        }

    });
    

