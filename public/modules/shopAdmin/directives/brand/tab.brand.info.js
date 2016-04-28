'use strict';

angular.module('shopAdmin').directive('tabBrandInfo', ['Global', '$http',
    function (Global, $http) {
        return {
            replace: true,
            templateUrl: 'modules/shopAdmin/views/brand/template/tab-brand-info.html',
            link: function (scope, element, attrs) {

            }

        };
    }
]);
