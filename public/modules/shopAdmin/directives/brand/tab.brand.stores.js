'use strict';

angular.module('shopAdmin').directive('tabBrandStores', ['Global', '$http',
    function (Global, $http) {
        return {
            replace: true,
            templateUrl: 'modules/shopAdmin/views/brand/template/tab-brand-stores.html',
            link: function (scope, element, attrs) {


            }

        };
    }
]);
