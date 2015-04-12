'use strict';

app.directive('focusInput', function(){
	return {
		restrict: 'A',
		link: function($scope, element){
			angular.element(element).dblclick(function(){
				angular.element(this).parent().find('input').focus();
			});
		}
	};
});