'use strict';

angular.module('lightweight').controller('CheckoutAsGuestController',
    ['$scope', '$rootScope', '$location', '$state', '$timeout', '$stateParams', '$window', 'Global', 'UserService','CartService',
    function($scope, $rootScope, $location, $state, $timeout, $stateParams, $window, Global, UserService, CartService) {
        $scope.global = Global;
        var returnState = $stateParams.returnUrl;
        $scope.userCredential = {};
        $scope.items = [];

        CartService.getItemsWithoutPopulate()
            .$promise
            .then(function (items) {
                $scope.items = items;
            });

        $scope.loginFromCheckout = function() {
            if($scope.items && $scope.items.length) {
                $scope.user.items = $scope.items;
                UserService.signInUserWithGuestUserItems($scope.user)
                    .$promise
                    .then(function(user) {
                        $scope.global.user = user;

                        //$window.location.reload();
                        $rootScope.$emit('cart:updated');

                        $timeout(function() {
                            $state.go(returnState, {}, { reload: true });
                        });
                        
                    }, function(error) {
                        console.log('error== ',error);
                        $scope.errorLogin = error.data.message;
                    });
            }

        };

        $scope.checkoutAsGuest = function() {
            $state.go(returnState);
        };
    }
]);
