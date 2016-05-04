'use strict';

// Config HTTP Error Handling
angular.module('shopAdmin').config(['$httpProvider',
    function($httpProvider) {
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$location', 'Global',
            function($q, $location, Global) {
                //console.log('Global data = ',Global.isAdmin);
                if(!Global.user || !Global.isAdmin) {
                    $location.path('signin');
                }
                return {
                    responseError: function(rejection) {
                        switch (rejection.status) {
                            case 401:
                                // Deauthenticate the global user
                                Global.user = null;

                                // Redirect to signin page
                                $location.path('signin');
                                break;
                            case 403:
                                // Add unauthorized behaviour
                                break;
                        }

                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
]).run(['$rootScope', '$state', 'Global', function ($rootScope, $state, Global) {
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if (!Global.isAdmin && toState.name !== 'signin' && toState.name !== 'signup' && toState.name !== 'logout') {
                event.preventDefault();
                $state.go('signin');
            }
        });

    $rootScope.$on('signin', function (event, user) {
        Global.user = user;
        if (Global.user && Global.user.roles) {
            Global.authenticated = Global.user.roles.length;
            Global.isAdmin = Global.user.roles.indexOf('admin') !== -1;
        }
    });
}]);
