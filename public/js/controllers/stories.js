
angular.module('scribe')
	.controller('stories', function storiesController($scope, getStories, putUpvote, putDownvote){

		$scope.orders = [
			{ 
				value:"-rating", 
				text:"Top Rated" 
			},
			{ 
				value:"-_id", 
				text:"Newest First" 
			},
			{ 
				value:"_id", 
				text:"Oldest First" 
			},
			{ 
				value:"updated", 
				text:"Recently Updated"
			}
		];

		$scope.sortBy = $scope.orders[0];

		$scope.fetchStories = function(){

			getStories.getData()
				.then(function(resp){
		            
		            $scope.stories = resp.data;

		        })

	    }

	    $scope.addUpvote = function(id){

			putUpvote.add(id)
				.then(function(resp){
					console.log("Upvote added!");
					$scope.fetchStories();
				})
				.catch(function(e){
					console.log("There was an error: " + e);
				});

		}

		$scope.addDownvote = function(id){

			putDownvote.add(id)
				.then(function(resp){
					console.log("Downvote added!");
					$scope.fetchStories()
				})
				.catch(function(e){
					console.log("There was an error: " + e);
				});

		}

		$scope.fetchStories();

	});
    
