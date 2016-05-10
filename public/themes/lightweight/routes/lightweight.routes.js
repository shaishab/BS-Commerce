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
                url: '/:slug',
                parent: 'master',
                controller: 'ProductByCategoryController',
                templateUrl: 'themes/lightweight/views/product/product-list-by-category.html'
            });
    }
]);
