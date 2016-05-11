'use strict';

angular.module('lightweight').controller('ProductDetailsController', ['$scope', '$timeout', '$state', 'Global', 'ProductService',
    function($scope, $timeout, $state, Global, ProductService) {
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
                //$scope.slides[0].active = true;
                //cartService.getCart()
                //    .$promise
                //    .then(function(cart){
                //        var indexInCart = _.findIndex(cart.items, function(item){
                //            return item.product._id === product._id;
                //        });
                //
                //        product.addedToCart = indexInCart >= 0;
                //    });

            });

        $scope.toggleCartStatus = function(product, event){

            if(!Global.authenticated) {
                product.notAuthenticate = true;
                $timeout(function() {
                    product.notAuthenticate = false;
                },1000);
                return;
            }
            event.preventDefault();
            //product.addedToCart = !(product.addedToCart);
            //
            //if(product.addedToCart) {
            //    cartService.addToCart(product, $scope.quantity);
            //}else{
            //    cartService.removeFromCart(product);
            //}

        };
    }
]);
