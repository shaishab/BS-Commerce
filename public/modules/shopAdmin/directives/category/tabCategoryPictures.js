'use strict';

angular.module('shopAdmin').directive('tabCategoryPictures', ['Global', '$http',
    function (Global, $http) {
        return {
            restrict:'AE',
            replace: true,
            templateUrl: 'modules/shopAdmin/views/category/template/tab-category-pictures.html',
            link: function (scope, element, attrs) {


            }

        };
    }
]);
