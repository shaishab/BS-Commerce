'use strict';

angular.module('bsadmins').directive('registeredUsersStatistics', ['userService',
    function(userService) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'modules/bsadmins/views/dashboard/registered-users-statistics.html',
            link: function(scope, element, attrs) {
                scope.getUserStatistics = function() {
                    userService.getUserStatistics()
                        .$promise
                        .then(function(userStatistics) {
                            scope.userStatistics = userStatistics;
                        });
                };
                scope.getUserStatistics();
            }
        };
    }
]);
