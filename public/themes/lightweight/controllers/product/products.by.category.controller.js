'use strict';

angular.module('lightweight').controller('ProductByCategoryController',
    ['$scope', '$timeout', '$state', 'Global', 'CatalogService', 'ProductService',
    function($scope, $timeout, $state, Global, ShopCatalog, ProductService) {
        var slug = $state.params.slug;
        $scope.global = Global;

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
    }
]);
