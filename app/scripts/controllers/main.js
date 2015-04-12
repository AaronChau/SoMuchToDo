'use strict';

/**
 * @ngdoc function
 * @name soMuchToDoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soMuchToDoApp
 */
app.controller('MainCtrl', function ($scope, $location, Notebook) {
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
});


/*
$scope.tasks = Task.all;
    $scope.task = {done: false, note: '', editing: false};

    $scope.submitTask = function () {
        var currentDate = new Date();
        $scope.task.created = currentDate.toLocaleString();
        Task.create($scope.task).then(function() {
            $scope.task = {done: false, note: ''};
        });
    };

    $scope.deleteTask = function (task) {
        Task.delete(task);
    };

    $scope.saveTask = function (index, task){
        var finishedDate = new Date();

        // Set the value
        task.finished = finishedDate.toLocaleString();

        // Save the task
        Task.save(index);
    };

    $scope.editTask = function (task) {
        task.editing = true;
    };

    $scope.doneEditTask = function(index, task) {
        task.editing = false;
        Task.save(index);
    };

    $scope.taskDetail = function(taskId){
        $location.path('/task/' + taskId);
    };

    $scope.getChildrenLength = function(task){
        if(task.subtasks){
            return Object.keys(task.subtasks).length;
        }
        return '';
    };
*/