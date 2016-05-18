'use strict';

// Setting up route
angular.module('lightweight').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider
            .state('master', {
                abstract: true,
                templateUrl: 'themes/lightweight/views/master.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'themes/lightweight/views/index.html'
            })
            .state('Category', {
                url: '/category/:slug',
                parent: 'master',
                controller: 'ProductByCategoryController',
                templateUrl: 'themes/lightweight/views/product/product-list-by-category.html'
            })
            .state('Product', {
                url: '/product/:sku',
                parent:'master',
                controller: 'ProductDetailsController',
                templateUrl: 'themes/lightweight/views/product/product-details.html'
            })
            .state('Cart', {
                url: '/cart',
                controller: 'CartController',
                templateUrl: 'themes/lightweight/views/cart/cart.html'
            })
            .state('Checkout', {
                url: '/checkout',
                controller: 'CheckoutController',
                templateUrl: 'themes/lightweight/views/cart/checkout.html'
            })
            .state('CheckoutSuccess', {
                url: '/checkout/success/:orderId',
                controller: 'CheckoutSuccessController',
                templateUrl: 'themes/lightweight/views/cart/checkout-success.html'
            })
            .state('emptyCart', {
                url: '/cart/empty',
                templateUrl: 'themes/lightweight/views/cart/empty-cart.html'
            })
            .state('orderDetails/:orderId', {
                url: '/order/:orderId',
                controller: 'OrderDetailsController',
                templateUrl: 'themes/lightweight/views/order/order-details.html'
            });
    }
]);
