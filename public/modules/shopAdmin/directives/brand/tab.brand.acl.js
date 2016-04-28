'use strict';

angular.module('shopAdmin').directive('tabBrandAcl', ['Global', '$http',
    function (Global, $http) {
        return {
            replace: true,
            templateUrl: 'modules/shopAdmin/views/brand/template/tab-brand-acl.html',
            link: function (scope, element, attrs) {


            }

        };
    }
]);
