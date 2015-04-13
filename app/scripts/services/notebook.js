'use strict';

app.factory('Notebook', function(Auth) {
	var _notebooks = Auth.user.notebooks;

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