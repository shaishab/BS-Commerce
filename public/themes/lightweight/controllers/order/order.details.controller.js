(function() {
    'use strict';
    angular.module('lightweight').controller('OrderDetailsController',['$scope', '$location', '$stateParams', 'OrderService',
    function($scope, $location, $stateParams, OrderService) {

        var orderId = $stateParams.orderId;

        $scope.getOrderById = function(orderId) {
            OrderService.getOrderById(orderId)
                .$promise
                .then(function(order) {
                    $scope.order = order;
                },
                function(error) {
                    $scope.order = '';
                });
        };

        $scope.getOrderById(orderId);
    }]);
})();
