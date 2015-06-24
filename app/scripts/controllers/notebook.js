'use strict';

app.controller('NotebookCtrl', function ($scope,  $location, $routeParams, $firebaseObject, Task, User) {
    $scope.notebookId = $routeParams.notebookid;
    Task.setNotebookId($scope.notebookId);
    $scope.tasks = Task.tasks();

    $scope.filterOptions = {
        filters: [
            {id : 0, name : 'All'},
            {id : 1, name : 'Todo'},
            {id : 2, name : 'Finished'}
        ]
    };

    $scope.filterItem = {
        filter: $scope.filterOptions.filters[0]
    };

    $scope.changeFilter = function(id) {
        $scope.filterItem.filter = $scope.filterOptions.filters[id];
    };

    $scope.customFilter = function(task){
        var filterID = $scope.filterItem.filter.id;
        if(filterID === 0){
            return true;
        } else if (filterID === 1 && !task.done){
            return true;
        } else if (filterID === 2 && task.done){
            return true;
        } else {
            return false;
        }
    };


    User.Notebook.all().$loaded().then(function(notebooks){
        $scope.notebook = notebooks.$getRecord($scope.notebookId);
    }).catch(function(error){
        console.log('Error:', error);
    });
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

    $scope.editNotebook = function(){
        $scope.notebook.editing = true;
    };

    $scope.doneEditNotebook = function(){
        $scope.notebook.editing = false;
        User.Notebook.save($scope.notebook);
    };

    $scope.taskDetail = function(taskId){
        $location.path('notebook/' + $scope.notebookId + '/' + taskId);
    };

    $scope.getChildrenLength = function(task){
        if(task.subtasks){
            return Object.keys(task.subtasks).length;
        }
        return '';
    };
});
