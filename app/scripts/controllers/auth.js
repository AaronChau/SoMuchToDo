'use strict';

app.controller('AuthCtrl', function($scope, $location, Auth, user){
	if (user){
		$location.path('/');
	}

	$scope.register = function() {
		Auth.register($scope.user).then(function(){
			$scope.login();
		}, function(error){
			$scope.error = error.toString();
		});
	};

	$scope.login = function() {
		Auth.login($scope.user).then(function(){
			$location.path('/');
		}, function(error){
			$scope.error = error.toString();
		});
	};
});