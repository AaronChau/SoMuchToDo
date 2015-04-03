'use strict';

app.factory('Subtask', function(FIREBASE_URL, $firebaseArray, $firebaseObject) {
	var ref = new Firebase(FIREBASE_URL);
	var _taskid = '';
	var _subtasks = null;
	var _parent = null;
	var _taskref = null;


	var Subtask = {
		setTaskId: function (taskid) {
			_taskid = taskid;
			_taskref = ref.child('tasks').child(taskid);
			_subtasks = $firebaseArray(_taskref.child('subtasks'));
			_parent = $firebaseObject(_taskref);
		},
		parent: function() {
			return _parent;
		},
		all: function() {
			return _subtasks;
		},
		create: function (subtask) {
			return _subtasks.$add(subtask);
		},
		get: function (subtaskId){
			return _subtasks.$getRecord(subtaskId);
		},
		delete: function (subtask){
			return _subtasks.$remove(subtask);
		},
		save: function (subtaskId) {
			_subtasks.$save(subtaskId);
		}
	};

	return Subtask;
});