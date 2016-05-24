'use strict';

angular.module('lightweight').controller('SettingsController', ['$scope', '$http', '$location', 'UserService', 'Global',
	function($scope, $http, $location, UserService, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		 //Update a user profile

		$scope.updateUerInfo = function() {
			console.log($scope.user);
			return UserService.updateUser($scope.user);
		};

		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				console.log($scope.user);
				$scope.updateUerInfo()
					.$promise
					.then(function(response) {
						console.log(response);
						$scope.success = true;
						Authentication.user = response;
					}, function(error) {
						$scope.error = error.msg;
					});


				//var user =  UserService($scope.user);
                //
				//user.$update(function(response) {
				//	$scope.success = true;
				//	Authentication.user = response;
				//}, function(response) {
				//	$scope.error = response.data.message;
				//});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
