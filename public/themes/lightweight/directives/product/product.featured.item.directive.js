'use strict';

angular.module('lightweight').directive('productFeaturedItem',
    ['$rootScope','$timeout', '$window', 'Global', 'ProductService','UserService','CartService', 'WishlistService',
    function($rootScope, $timeout, $window, Global, ProductService, UserService, CartService, WishlistService) {
        return{
            restrict: 'AE',
            replace: true,
            templateUrl: 'themes/lightweight/views/product/product-featured-item.html',
            link: function(scope, element, attrs){

                scope.global = Global;

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

                    if(!scope.global.authenticated) {
                        UserService.createGuestUser().$promise.then(function(user) {
                            CartService.addToCart({item: item}).$promise.then(function(cartResponse) {
                                scope.global.user = user;
                                $window.location.reload();
                                $rootScope.$emit('cart:updated');
                            });
                        });
                    } else {
                        CartService.addToCart({item: item}).$promise.then(function(data) {
                            $rootScope.$emit('cart:updated');
                        });
                    }
                    event.preventDefault();

                };

                scope.addToWishlist = function(product, event){
                    event.preventDefault();
                    var item = {product:product._id, quantity: 1};

                    if(!scope.global.authenticated) {

                        UserService.createGuestUser().$promise.then(function(user) {
                            WishlistService.addToWishlist({item: item}).$promise.then(function(wishlistResponse) {
                                scope.global.user = user;
                                $window.location.reload();
                                $rootScope.$emit('wishlist:updated');
                            });
                        });
                    } else {
                        WishlistService.addToWishlist({item: item}).$promise.then(function(data) {
                            //console.log(data);
                            $rootScope.$emit('wishlist:updated');
                        });
                    }
                };

            }
        };
    }
]);
