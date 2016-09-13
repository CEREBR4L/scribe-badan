
var app = angular.module('scribe', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'home'
		})
		.when('/stories', {
			templateUrl: 'templates/stories.html',
			controller: 'stories'
		})
		.when('/stories/:storyId', {
			templateUrl: 'templates/story.html',
			controller: 'storyById'
		})
		.when('/newstory', {
			templateUrl: 'templates/new.html',
			controller: 'newStory'
		})
		.otherwise({
			redirectTo: '/'
		});

	 $locationProvider.html5Mode(true);
})

