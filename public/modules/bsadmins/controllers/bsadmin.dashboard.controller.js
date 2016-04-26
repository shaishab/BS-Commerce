'use strict';

// Bsadmins controller
angular.module('bsadmins').controller('DashboardController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bsadmins',
    function($scope, $stateParams, $location, Authentication, Bsadmins) {
        $scope.authentication = Authentication;
        console.log('load dashboard controller');
        // Create new Bsadmin

        //Bsadmins.adminHomePage();

    }
]);
