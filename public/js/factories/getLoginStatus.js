angular.module('scribe')
    .factory('checkLogin', function ($http){

        return {

            getLoginStatus: function() {

                return $http.get('/api/auth/checkLogin')
                    .success(function(data){
                        return data;
                    });
                
            }

        };
        
});

