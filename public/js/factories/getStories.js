angular.module('scribe')
    .factory('getStories', function ($http) {

        return {

            getData: function() {

                return $http.get('/api/get/stories').success(function(data){
                    return data;
                });
            }

        };
        
});

