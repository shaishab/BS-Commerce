(function(_){
    'use strict';

    angular.module('lightweight').factory('CartService', ['$rootScope','Global', '$resource',
        function($rootScope, Global, $resource) {
            return {
                getCart: function(){
                    var getCart = $resource('api/cart', {}, {
                        'get': {method: 'GET'}
                    });
                    return getCart.get();
                },
                addToCart: function(product){
                    var addToCart = $resource('/api/cart', {}, {
                        'add': {method: 'POST'}
                    });
                    return addToCart.add(product);
                },
                deleteCartItem: function(product){

                },
                updateCartItem: function(product){

                },
                deleteCartById: function(cartId) {

                }
            };
        }
    ]);
})(_);


