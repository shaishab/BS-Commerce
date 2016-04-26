'use strict';

// Bsadmins controller
angular.module('bsadmins').controller('BsadminsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bsadmins',
	function($scope, $stateParams, $location, Authentication, Bsadmins) {
		$scope.authentication = Authentication;

		// Create new Bsadmin
		$scope.create = function() {
			// Create new Bsadmin object
			var bsadmin = new Bsadmins ({
				name: this.name
			});

			// Redirect after save
			bsadmin.$save(function(response) {
				$location.path('bsadmins/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Bsadmin
		$scope.remove = function(bsadmin) {
			if ( bsadmin ) { 
				bsadmin.$remove();

				for (var i in $scope.bsadmins) {
					if ($scope.bsadmins [i] === bsadmin) {
						$scope.bsadmins.splice(i, 1);
					}
				}
			} else {
				$scope.bsadmin.$remove(function() {
					$location.path('bsadmins');
				});
			}
		};

		// Update existing Bsadmin
		$scope.update = function() {
			var bsadmin = $scope.bsadmin;

			bsadmin.$update(function() {
				$location.path('bsadmins/' + bsadmin._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Bsadmins
		$scope.find = function() {
			$scope.bsadmins = Bsadmins.query();
		};

		// Find existing Bsadmin
		$scope.findOne = function() {
			$scope.bsadmin = Bsadmins.get({ 
				bsadminId: $stateParams.bsadminId
			});
		};
	}
]);