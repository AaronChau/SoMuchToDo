'use strict';

app.controller('NotebookCtrl', function ($scope,  $location, $routeParams, $firebaseObject, Task, User, $cookies) {
    $scope.notebookId = $routeParams.notebookid;
    var filterKey = 'ftilerOption_' + $scope.notebookId;
    Task.setNotebookId($scope.notebookId);
    $scope.tasks = Task.tasks();

    $scope.filterOptions = {
        filters: [
            {id : 0, name : 'All'},
            {id : 1, name : 'Todo'},
            {id : 2, name : 'Finished'}
        ]
    };

    // Get the filter id
    var filterId = $cookies.get(filterKey);
    if (!filterId) { // if the filter id does not exist
        filterId = 0;         // set it to 0
        $cookies.put(filterKey, filterId);
    }
    $scope.filterItem = {     // set the current filter.
        filter: $scope.filterOptions.filters[filterId]
    };

    $scope.changeFilter = function(id) {
        $scope.filterItem.filter = $scope.filterOptions.filters[id];
        $cookies.put(filterKey, id);
    };


    $scope.changeFilter(filterId);

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
