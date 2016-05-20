'use strict';

angular.module('lightweight').factory('OrderService', ['$resource',
    function($resource) {
        return {
            getOrderById: function(orderId) {
                var orderById = $resource('/api/auth/order/:orderId', {orderId:'@orderId'});
                return orderById.get({orderId: orderId});
            }
        };
    }
]);


