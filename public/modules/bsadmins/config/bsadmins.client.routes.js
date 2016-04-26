'use strict';

//Setting up route
angular.module('bsadmins').config(['$stateProvider',
	function($stateProvider) {
		// Bsadmins state routing
		$stateProvider.
		state('admin', {
			url: '/',
			templateUrl: 'modules/bsadmins/views/dashboard.html',
			controller: 'DashboardController'
		});
	}
]);
