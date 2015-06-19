'use strict';

app.factory('Auth', function(FIREBASE_URL, $firebaseArray, $firebaseObject, $firebaseAuth){
	var _ref = new Firebase(FIREBASE_URL);
	var _auth = $firebaseAuth(_ref);

	var Auth = {
		register: function (user){
			return _auth.$createUser(user);
		},
		login: function (user) {
			return _auth.$authWithPassword(user);
		},
		logout: function() {
			_auth.$unauth();
		},
		resolveUser: function() {
			return _auth.$getAuth();
		},
		signedIn: function() {
			return !!Auth.user.provider;
		},
		createProfile: function(user){
			var profileRef = $firebaseObject(_ref.child('profile').child(user.uid));
			profileRef.username = user.username;

			profileRef.$save().then(function(){
				var notebooksRef = $firebaseArray(_ref.child('profile').child(user.uid).child('notebooks'));
				var currentDate = new Date();
				var firstNotebook = {
					title: 'First Notebook!',
					tasks: {
						0: {
							created: currentDate.toLocaleString(),
							done: false,
							editing: false,
							note: 'Welcome to your first notebook!'
						},
						1: {
							created: currentDate.toLocaleString(),
							done: false,
							editing: false,
							note: 'Try to add, delete, edit (double click) or even add a subtask.'
						}
					}
				};
				notebooksRef.$add(firstNotebook);
			});


		},
		user: {}
	};

	_auth.$onAuth(function(authData){
		if (authData) {
			console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
			angular.copy(authData, Auth.user);
		} else {
			console.log('User is logged out');
			angular.copy({}, Auth.user);
		}
	});

	return Auth;
});