'use strict';

// Authentication service for admin variables
angular.module('bsadmins').factory('AdminAuthentication', [
    function() {
        var _this = this;

        _this._data = {
            user: window.user
        };

        return _this._data;
    }
]);
