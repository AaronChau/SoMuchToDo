'use strict';

app.controller('NavCtrl', function($scope, $location, Auth){
	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;
	
});