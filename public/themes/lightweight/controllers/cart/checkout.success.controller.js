'use strict';
angular.module('lightweight').controller('CheckoutSuccessController', ['$scope', '$location', '$state', 'Global',
	function($scope, $location, $state, Global) {

		$scope.orderId = $state.params.orderId;
	}
]);
