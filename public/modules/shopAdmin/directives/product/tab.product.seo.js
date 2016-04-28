'use strict';

angular.module('shopAdmin').directive('tabProductSeo', ['Global', '$http',
    function (Global, $http) {
        return {
            replace: true,
            templateUrl: 'modules/shopAdmin/views/product/template/tab-product-seo.html',
            link: function (scope, element, attrs) {


            }

        };
    }
]);
