'use strict';

angular.module('bsadmins').directive('shopAdminSideMenu', [
    function() {
        return{
            restrict: 'AE',
            replace: true,
            templateUrl: 'modules/bsadmins/views/layout/side-menu.html',
            link: function(scope, element, attrs){
                element.find('#side-menu').metisMenu();
            }
        };
    }
]);
