'use strict';

angular.module('lightweight').factory('UserService', ['$resource',
    function($resource) {
        return {
            createGuestUser: function() {
                var createUser = $resource('/api/user/guest', {}, {
                    'create': {method: 'POST'}
                });
                return createUser.create();
            },
            getUserById: function (userId) {
                var userById = $resource('/auth/user/:userId', {userId: '@userId'});
                return userById.get({userId: userId});
            }
        };
    }
]);
