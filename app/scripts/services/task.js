'use strict';

app.factory('Task', function(FIREBASE_URL, $firebaseArray) {
	var ref = new Firebase(FIREBASE_URL);
	var tasksRef = ref.child('tasks');
	var tasks = $firebaseArray(tasksRef.orderByChild('done'));

	var Task = {
		all: tasks,
		create: function (task){
			return tasks.$add(task);
		},
		get: function (taskId){
			return tasks.$getRecord(taskId);
		},
		delete: function (task){
			return tasks.$remove(task);
		},
		save: function (taskId){
			tasks.$save(taskId);
		}
	};

	return Task;
});

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