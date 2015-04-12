'use strict';

app.factory('Notebook', function(FIREBASE_URL, $firebaseArray, Auth) {
	var _ref = new Firebase(FIREBASE_URL);
	var _notebookRef = _ref.child('profile/' + Auth.resolveUser().uid + '/notebooks');
	var _notebooks = $firebaseArray(_notebookRef);

	var Notebook = {
		all: function(){
			return _notebooks;
		},
		create: function (notebook){
			return _notebooks.$add(notebook);
		},
		get: function (notebookId){
			return _notebooks.$getRecord(notebookId);
		},
		delete: function (notebook){
			return _notebooks.$remove(notebook);
		},
		save: function (notebookId){
			_notebooks.$save(notebookId);
		}
	};

	return Notebook;
});