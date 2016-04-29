'use strict';

angular.module('shopAdmin').controller('themeEditController', ['$scope', '$stateParams', '$state', 'themeService',
    function ($scope, $stateParams, $state, themeService) {

        $scope.theme = {};

        $scope.getThemeById = function(){
            themeService.getThemeById($stateParams.themeId)
                .$promise
                .then(function(theme) {
                    $scope.theme = theme;
                });
        };
        $scope.getThemeById();

        $scope.update = function () {
            themeService.updateTheme($scope.theme)
                .$promise
                .then(function(response) {
                    $state.go('Theme.List');
                });
        };

        $scope.delete = function () {
            if(confirm('Are you sure want to delete this theme ?')) {
                themeService.deleteTheme($stateParams.themeId)
                    .$promise
                    .then(function (response) {
                        $state.go('Theme.List');
                    });
            }
        };
    }
]);
