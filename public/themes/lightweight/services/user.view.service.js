'use strict';

angular.module('lightweight').factory('UserService', ['$resource',
    function($resource) {
        return {
            createGuestUser: function() {
                var createUser = $resource('/api/user/guest', {}, {
                    'create': {method: 'POST'}
                });
                return createUser.create();
            }
        };
    }
]);
