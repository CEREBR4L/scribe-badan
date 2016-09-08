angular.module('scribe')
    .factory('getRandom', function ($http){

        return {

            getData: function() {

                return $http.get('/api/get/random').success(function(data){
                    return data;
                });
            }

        };
        
});

