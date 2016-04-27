'use strict';

//Setting up route
angular.module('bsadmins').config(['$stateProvider',
	function($stateProvider) {
		console.log('from admin route');
		// Bsadmins state routing
		$stateProvider.
		state('admin', {
			url: '/',
			templateUrl: 'modules/bsadmins/views/index.html',
			controller: 'DashboardController'
		});
	}
]);
