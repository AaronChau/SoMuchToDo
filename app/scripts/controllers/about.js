'use strict';

/**
 * @ngdoc function
 * @name soMuchToDoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the soMuchToDoApp
 */
angular.module('soMuchToDoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
