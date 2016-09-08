
angular.module('scribe')
	.controller('home', function homeController($scope, getStories, getRandom){

		$scope.getNew = function(){
			getRandom.getData().then(function(resp){
            	$scope.story = resp.data;
        	})
        }

		$scope.getNew();

	});
