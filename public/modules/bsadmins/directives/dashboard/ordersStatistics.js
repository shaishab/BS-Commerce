'use strict';

angular.module('bsadmins').directive('ordersStatistics', ['orderService',
    function(orderService) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'modules/bsadmins/views/dashboard/orders-statistics.html',
            link: function(scope, element, attrs) {

                scope.getOrdersStatistics = function() {
                    orderService.getOrdersStatistics()
                        .$promise
                        .then(function(ordersInfo) {
                            scope.ordersInfo = ordersInfo;
                        });
                };
                scope.getOrdersStatistics();
            }
        };
    }
]);
