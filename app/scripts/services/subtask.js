'use strict';

app.factory('Subtask', function(FIREBASE_URL, $firebaseArray, $firebaseObject, Auth) {
	var _ref = new Firebase(FIREBASE_URL);
	var _taskid = '';
	var _notebookid = '';
	var _subtasks = null;
	var _parent = null;
	var _taskref = null;


	var Subtask = {
		setTaskId: function (notebookid, taskid) {
			_notebookid = notebookid;
			_taskid = taskid;
			var user = Auth.resolveUser();
			_taskref = _ref.child('profile').child(user.uid).child('notebooks').child(_notebookid).child('tasks').child(_taskid);
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