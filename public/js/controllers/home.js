
angular.module('scribe')
	.controller('home', function homeController($scope, getStories){

		getStories.getData().then(function(resp){
            $scope.story = resp.data[0];
        })

	});
