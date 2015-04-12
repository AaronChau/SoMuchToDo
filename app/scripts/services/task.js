'use strict';

app.factory('Task', function(FIREBASE_URL, $firebaseArray, $firebaseObject, Auth) {
	var _ref = new Firebase(FIREBASE_URL);
	var _notebookId = '';
	var _notebookRef = null;
	var _tasks = {};
	var _notebook = {};

	var Task = {
		setNotebookId: function(notebookId){
			_notebookId = notebookId;
			_notebookRef = _ref.child('profile').child(Auth.resolveUser().uid).
							child('notebooks').child(_notebookId);
			_notebook = $firebaseObject(_notebookRef);
			_tasks = $firebaseArray(_notebookRef.child('tasks').orderByChild('done'));
		},
		object: function(){
			return _notebook;
		},
		tasks: function(){
			return _tasks;
		},
		create: function (task){
			return _tasks.$add(task);
		},
		get: function (taskId){
			return _tasks.$getRecord(taskId);
		},
		delete: function (task){
			return _tasks.$remove(task);
		},
		save: function (taskId){
			_tasks.$save(taskId);
		}
	};

	return Task;
});


// app.factory('Task', function(FIREBASE_URL, $firebaseArray) {
// 	var _ref = new Firebase(FIREBASE_URL);
// 	var tasksRef = _ref.child('tasks');
// 	var tasks = $firebaseArray(tasksRef.orderByChild('done'));

// 	var Task = {
// 		all: tasks,
// 		create: function (task){
// 			return tasks.$add(task);
// 		},
// 		get: function (taskId){
// 			return tasks.$getRecord(taskId);
// 		},
// 		delete: function (task){
// 			return tasks.$remove(task);
// 		},
// 		save: function (taskId){
// 			tasks.$save(taskId);
// 		}
// 	};

// 	return Task;
// });

// app.service('Task', function(FIREBASE_URL, $firebaseArray){
// 	var ref = new Firebase(FIREBASE_URL);
// 	var tasksRef = ref.child('tasks');
// 	var tasks = $firebaseArray(tasksRef.orderByChild('done'));

// 	this.all = function() {
// 		return tasks;
// 	};

// 	this.create = function(task){
// 		return tasks.$add(task);
// 	};

// 	this.get = function (taskId){
// 		return tasks.$getRecord(taskId);
// 	};
	
// 	this.delete = function (task){
// 		return tasks.$remove(task);
// 	};

// 	this.save = function (taskId){
// 		tasks.$save(taskId);
// 	};
// });