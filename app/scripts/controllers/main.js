'use strict';

/**
 * @ngdoc function
 * @name soMuchToDoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soMuchToDoApp
 */
app.controller('MainCtrl', function ($scope,  $location, $firebaseArray, Task) {
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
});
