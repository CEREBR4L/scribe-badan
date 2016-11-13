angular.module('scribe')
    .factory('logout', function ($http){

        return {

            getLoggedOut: function() {

                return $http.get('/api/auth/logout')
                    .success(function(data){
                        return data;
                    });
                
            }

        };
        
});

