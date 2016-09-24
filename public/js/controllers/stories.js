
angular.module('scribe')
	.controller('stories', function storiesController($scope, getStories){

		getStories.getData()
			.then(function(resp){
	            
	            $scope.stories = resp.data;

	        })

	});
    
