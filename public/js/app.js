
var app = angular.module('scribe', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'templates/stories.html',
			controller: 'stories'
		})
		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'login'
		})
		.when('/collaborate', {
			templateUrl: 'templates/collaborate.html',
			controller: 'collaborate'
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

