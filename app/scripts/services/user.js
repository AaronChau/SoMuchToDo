'use strict';
app.factory('User', function(FIREBASE_URL, $firebaseArray, $firebaseObject, Auth) {
	var _ref = new Firebase(FIREBASE_URL);
	var _user = Auth.resolveUser();
	if(_user){
		var _notebooks = $firebaseArray(_ref.child('profile').child(_user.uid).child('notebooks'));
		var _profile = $firebaseObject(_ref.child('profile').child(_user.uid));
	}

	var User = {
		profile: function(){
			return _profile;
		},
		Notebook: {
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
		}
	};

	return User;
});

/*

'use strict';
app.factory('Notebook', function(User) {
	console.log('Notebook Services');
	var _notebooks = User.notebooks();

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

*/