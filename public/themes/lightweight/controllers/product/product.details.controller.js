'use strict';

angular.module('lightweight').controller('ProductDetailsController',
    ['$scope', '$rootScope', '$timeout', '$state', '$window', 'Global', 'ProductService','UserService','CartService',
    function($scope, $rootScope, $timeout, $state, $window, Global, ProductService, UserService, CartService) {
        $scope.global = Global;
        var sku = $state.params.sku;

        $scope.product = {};
        $scope.quantity = 1;
        $scope.slides = [];
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var currIndex = 0;

        ProductService.getProductById(sku)
            .$promise
            .then(function(product) {
                $scope.product = product;
                $scope.slides = _.map(product.photos, function(photo){
                    return {
                        image: '/api/products/photos/' + photo.id,
                        id: currIndex++
                    };
                });
            });

        $scope.addToCart = function(product, event){

            var item = {product:product._id,quantity:$scope.quantity};

            if(!$scope.global.authenticated) {
                UserService.createGuestUser().$promise.then(function(user) {
                    CartService.addToCart({item: item}).$promise.then(function(cartResponse) {
                        $scope.global.user = user;
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
    }
]);
