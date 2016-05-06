'use strict';

angular.module('lightweight').directive('productFeaturedItem', ['$timeout', 'Global', 'ProductService',
    function($timeout, Global, ProductService) {
        return{
            restrict: 'AE',
            replace: true,
            templateUrl: 'themes/lightweight/views/product/product-featured-item.html',
            link: function(scope, element, attrs){

                //var updateCartStatus = function(){
                //    cartService.getCart()
                //        .$promise
                //        .then(function(cart){
                //            _.forEach(scope.products, function(product){
                //                var indexInCart = _.findIndex(cart.items, function(item){
                //                    return item.product._id === product._id;
                //                });
                //
                //                product.addedToCart = indexInCart >= 0;
                //            });
                //        });
                //
                //};

                scope.getFeaturedProducts = function() {
                    var query = {
                        isFeatured: true,
                        numberOfDisplay: 20
                    };
                    ProductService.getFeaturedProducts(query)
                        .$promise
                        .then(function(promise) {
                            scope.products = promise.products;
                            //console.log(scope.products[0].photos[0]);
                            //updateCartStatus();
                        });
                };
                scope.getFeaturedProducts();

                //scope.toggleCartStatus = function(product, event){
                //    if(!Global.authenticated) {
                //        product.notAuthenticate = true;
                //        $timeout(function() {
                //            product.notAuthenticate = false;
                //        },1000);
                //        return;
                //    }
                //    event.preventDefault();
                //    product.addedToCart = !(product.addedToCart);
                //
                //    if(product.addedToCart) {
                //        cartService.addToCart(product, 1);
                //    }else{
                //        cartService.removeFromCart(product);
                //    }
                //
                //};
            }
        };
    }
]);
