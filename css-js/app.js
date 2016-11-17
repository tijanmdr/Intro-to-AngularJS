var newApp = angular.module('newApp', ['ngRoute']);

newApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: "views/home.html",
			controller: "FirstController"
		})
		.when('/directory', {
			templateUrl: "views/directory.html",
			controller: 'FirstController'
		})
		.otherwise({
			redirectTo: '/home'
		});
}]);

newApp.directive('randomFruit', [function() {
	return {
		restrict: 'E',
		scope: {
			fruits: "=",
			title: "="
		},
		templateUrl: 'views/random.html',
		transclude: true,
		controller: function ($scope) {
			$scope.random = Math.floor(Math.random() * 4);
		}
	};
}]);

newApp.controller('FirstController', ['$scope', '$http', function($scope, $http) {
    $scope.removeFruit = function(fruit) {
        var removeFruit = $scope.fruits.indexOf(fruit);
        $scope.fruits.splice(removeFruit, 1);
    }
    $scope.addFruit = function() {
    	var available = $scope.newFruit.available;
    	var boolAv;
    	if (available == 'true') {
    		boolAv = true;
    	} else {
    		boolAv = false;
    	}

    	$scope.fruits.push({
    		name: $scope.newFruit.name,
    		color: $scope.newFruit.color,
    		rate: parseInt($scope.newFruit.rate),
    		available: boolAv,
    	});

    	$scope.newFruit.name = '';
    	$scope.newFruit.rate = '';
    	$scope.newFruit.color = '';
    	$scope.newFruit.available = '';
    }

	$http.get('data/fruits.json').success(function(data) {
		$scope.fruits = data;
	});
}]);
