'use strict';

/* global app:true */
/* exported app */

/**
 * @ngdoc overview
 * @name soMuchToDoApp
 * @description
 * # soMuchToDoApp
 *
 * Main module of the application.
 */
var app = angular
  .module('soMuchToDoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://somuchtodo.firebaseio.com/')
  .run(function ($rootScope, $location, Auth){
    var routesThatDontRequireAuth = ['/', '/login', '/register', '/about'];

    // check current location matches route
    var routeClean = function(route){
      var clean = false;
      angular.forEach(routesThatDontRequireAuth, function(value){
        if(route === value){
          clean = true;
        }
      });
      return clean;
    };

    $rootScope.$on('$routeChangeStart', function(){
      if(!routeClean($location.url()) && !Auth.resolveUser()){
        $location.path('/login');
      }
    });

  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/notebook/:notebookid', {
        templateUrl: 'views/notebook.html',
        controller: 'NotebookCtrl'
      })
      .when('/notebook/:notebookid/:taskid', {
        templateUrl: 'views/task-detail.html',
        controller: 'TaskDetailCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth){
            return Auth.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth){
            return Auth.resolveUser();
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });