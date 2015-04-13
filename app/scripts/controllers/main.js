'use strict';

/**
 * @ngdoc function
 * @name soMuchToDoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soMuchToDoApp
 */
app.controller('MainCtrl', function ($scope, $location, Notebook, Auth) {
    $scope.notebook = {title: '', editing: false};
    $scope.notebooks = Notebook.all();

    $scope.submitNotebook = function(){
        var currentDate = new Date();
        $scope.notebook.created = currentDate.toLocaleString();
        Notebook.create($scope.notebook).then(function(){
            $scope.notebook = {title: '', editing: false};
        });
    };

    $scope.deleteNotebook = function(notebook){
        Notebook.delete(notebook);
    };

    $scope.editNotebook = function($event, notebook){
        notebook.editing = true;
    };

    $scope.doneEditNotebook = function(index, notebook){
        notebook.editing = false;
        Notebook.save(index);
    };

    $scope.readNotebook = function(notebookid){
        $location.path('/notebook/' + notebookid);
    };

    $scope.isAuthenticated = function(){
        return Auth.resolveUser();
    };
});