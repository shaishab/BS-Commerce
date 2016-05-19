'use strict';

angular.module('lightweight').controller('ProductByCategoryController',
    ['$scope', '$rootScope', '$timeout', '$state', 'Global', 'ProductService', 'UserService', 'CartService',
    function($scope, $rootScope, $timeout, $state, Global, ProductService, UserService, CartService) {
        var slug = $state.params.slug;

        $scope.pageSizeOptions = ['6','9','12'];
        $scope.orderByOptions = [{name: 'Name', value:'name'},{name: 'Price', value:'price'},{name: 'Date Published', value:'publishDate'}];

        $scope.state={
            totalRecords:0,
            pageSize:6,
            currentPage : 1,
            orderBy:{
                value: 'name',
                text: 'Name'
            }
        };

        $scope.products = [];

        var getProducts = function() {
            ProductService.getProductByCategory().get({
                slug:slug,
                orderBy: $scope.state.orderBy.value,
                pageSize: $scope.state.pageSize,
                currentPage: $scope.state.currentPage
            },function(data, getHeader){
                $scope.products = data.products;
                $scope.state.totalRecords = data.total;
            });
        };
        getProducts();


        $scope.pageChanged = function(){
            getProducts();
        };

        $scope.setPageSize = function(pageSize, event){
            event.preventDefault();

            $scope.state.currentPage = 1;
            $scope.state.pageSize = pageSize;
            getProducts();
        };

        $scope.setOrderBy = function(text, value, event){
            event.preventDefault();

            $scope.state.currentPage = 1;
            $scope.state.orderBy.text = text;
            $scope.state.orderBy.value = value;

            getProducts();
        };

        $scope.addToCart = function(product, event){

            var item = {product:product._id, quantity: 1};

            if(!Global.authenticated) {

                UserService.createGuestUser().$promise.then(function(data) {
                    CartService.addToCart({item: item}).$promise.then(function(cartResponse) {
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
