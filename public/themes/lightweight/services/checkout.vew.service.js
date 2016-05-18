(function (_) {
    'use strict';

    angular.module('lightweight').factory('CheckoutService', ['$rootScope', 'Global', '$resource',
        function ($rootScope, Global, $resource) {
            return {
                createOrder: function (order) {
                    var addOrder = $resource('/api/auth/order', {}, {
                        'create': {method: 'POST'}
                    });
                    return addOrder.create(order);
                }
            };
        }
    ]);
})(_);


