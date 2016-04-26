'use strict';

//Bsadmins service used to communicate Bsadmins REST endpoints
angular.module('bsadmins').factory('Bsadmins', ['$resource',
	function($resource) {
		return {
			adminHomePage: function() {
				console.log('get call');
				var loadIndex = $resource('/admin', {}, {
					get: {
						method: 'GET'
					}
				});
				return 'name';
			}
		};
	}
]);
