'use strict';

// Config HTTP Error Handling
angular.module('bsadmins').config(['$httpProvider',
    function($httpProvider) {
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$location', 'AdminAuthentication',
            function($q, $location, AdminAuthentication) {
                //console.log(AdminAuthentication.user);
                if(!AdminAuthentication.user || (AdminAuthentication.user && AdminAuthentication.user.roles.indexOf('admin')!==-1)) {
                    $location.path('signin');
                }
                return {
                    responseError: function(rejection) {
                        switch (rejection.status) {
                            case 401:
                                // Deauthenticate the global user
                                AdminAuthentication.user = null;

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
]);
