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
                updateCartItem: function(product){
                    var updateCartItem = $resource('/api/cart/item', {}, {
                        'update': {method: 'PUT'}
                    });
                    return updateCartItem.update(product);
                },
                deleteCartItem: function(product){
                    var deleteCartItem = $resource('/api/cart/item', {}, {
                        'delete': {method: 'DELETE'}
                    });
                    return deleteCartItem.delete(product.item);
                }
            };
        }
    ]);
})(_);


