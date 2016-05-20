'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('lightweight', ['ngAnimate', 'ui.bootstrap']);

angular.module('lightweight')
    .constant('_', window._)
    .run(function ($rootScope) {
        $rootScope._ = window._;
    });
