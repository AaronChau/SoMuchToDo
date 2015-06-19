'use strict';

/**
 * @ngdoc function
 * @name soMuchToDoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soMuchToDoApp
 */
app.controller('MainCtrl', function ($scope, $location, User, Auth) {
    $scope.notebook = {title: '', editing: false};
    $scope.notebooks = User.Notebook.all();

    $scope.submitNotebook = function(){
        var currentDate = new Date();
        $scope.notebook.created = currentDate.toLocaleString();
        User.Notebook.create($scope.notebook).then(function(){
            $scope.notebook = {title: '', editing: false};
        });
    };

    $scope.deleteNotebook = function(notebook){
        User.Notebook.delete(notebook);
    };

    $scope.editNotebook = function($event, notebook){
        notebook.editing = true;
    };

    $scope.doneEditNotebook = function(index, notebook){
        notebook.editing = false;
        User.Notebook.save(index);
    };

    $scope.readNotebook = function(notebookid){
        $location.path('/notebook/' + notebookid);
    };

    $scope.isAuthenticated = function(){
        return Auth.resolveUser();
    };
});