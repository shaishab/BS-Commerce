'use strict';

// ShopAdmins controller
angular.module('shopAdmin').controller('DashboardController', ['$scope', '$stateParams', '$location', 'Authentication', 'ShopAdmins',
    function($scope, $stateParams, $location, Authentication, ShopAdmins) {
        $scope.authentication = Authentication;
        console.log('load dashboard controller');
        // Create new ShopAdmin

        //ShopAdmins.adminHomePage();

    }
]);
