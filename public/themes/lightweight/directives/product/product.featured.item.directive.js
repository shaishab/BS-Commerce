'use strict';

angular.module('lightweight').directive('productFeaturedItem', ['$rootScope','$timeout', 'Global', 'ProductService','UserService','CartService',
    function($rootScope, $timeout, Global, ProductService, UserService, CartService) {
        return{
            restrict: 'AE',
            replace: true,
            templateUrl: 'themes/lightweight/views/product/product-featured-item.html',
            link: function(scope, element, attrs){

                scope.isBusy = false;

                scope.getFeaturedProducts = function() {
                    var query = {
                        isFeatured: true,
                        numberOfDisplay: 20
                    };
                    ProductService.getFeaturedProducts(query)
                        .$promise
                        .then(function(promise) {
                            scope.products = promise.products;
                        });
                };
                scope.getFeaturedProducts();

                scope.addToCart = function(product, event){

                    var item = {product:product._id, quantity: 1};

                    if(!Global.authenticated) {
                        scope.isBusy = true;

                        UserService.createGuestUser().$promise.then(function(data) {
                            CartService.addToCart({item: item}).$promise.then(function(cartResponse) {
                                scope.isBusy = false;
                                $rootScope.$emit('cart:updated');
                            });
                        });
                    } else {
                        scope.isBusy = true;
                        CartService.addToCart({item: item}).$promise.then(function(data) {
                            scope.isBusy = false;
                            $rootScope.$emit('cart:updated');
                        });
                    }
                    event.preventDefault();

                };

            }
        };
    }
]);
