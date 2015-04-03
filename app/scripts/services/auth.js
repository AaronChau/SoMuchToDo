'use strict';

app.factory('Auth', function(FIREBASE_URL, $firebase, $firebaseAuth){
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
			var profile = {
				username: user.username,
				md5hash: user.md5hash
			};

			var profileRef = $firebase(_ref.child('profile'));
			return profileRef.$set(user.uid, profile);
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