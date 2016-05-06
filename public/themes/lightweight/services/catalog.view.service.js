'use strict';

angular.module('lightweight').factory('CatalogService', ['$resource',
    function ($resource) {
        return $resource('api/categories/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
