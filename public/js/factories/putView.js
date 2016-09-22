angular.module('scribe')
    .factory('putView', function ($http) {

        return {

            add: function(id) {

                return $http.put('/api/addView/' + id)
                			.then(function(data){
                				return data;
                			});

			}            
                
        }

    });
    

