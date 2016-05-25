'use strict';

angular.module('lightweight').controller('WishlistController',
	['$scope', '$rootScope', '$timeout', '$location', '$state', 'Global', '$window', '_', 'WishlistService',
	function($scope, $rootScope, $timeout, $location, $state, Global, $window, _, WishlistService) {
		$scope.global = Global;
		$scope.items = [];
		$scope.wishlistId = '';
		$scope.rootUrl = '';
		$rootScope.totalWishlistItems = 0;

		$timeout(function() {
			$scope.rootUrl = $window.location.href;
		});

		$scope.getUpdateWishlist = function() {
			WishlistService.getWishlist()
				.$promise
				.then(function(wishlist){
					$scope.wishlistId = wishlist._id;
					$scope.items = wishlist.items;

					_.forEach($scope.items, function (item) {
						$rootScope.totalWishlistItems += item.quantity;
					});
				});
		};
		$scope.getUpdateWishlist();

		$rootScope.$on('wishlist:updated', function () {
			$scope.getUpdateWishlist();
		});

		$scope.editWishlistItem = function(item) {
			item.activeForEdit = true;
			item.editQuantity = angular.copy(item.quantity);
		};

		$scope.cancelEditWishlistItem = function(item) {
			item.activeForEdit = false;
			item.editQuantity = undefined;
		};

		$scope.updateWishlistItem = function(item) {
			var product = { item: {product: item.product._id, quantity: item.editQuantity}};
			WishlistService.updateWishlistItem(product)
				.$promise
				.then(function(updatedWishlist) {
					$scope.items = updatedWishlist.items;
				});
		};

		$scope.deleteWishlistItem = function(item) {
			if(confirm('Are you sure you want to delete this item ?')) {
				var product = { item: {product: item.product._id}};
				WishlistService.deleteWishlistItem(product)
					.$promise
					.then(function(updatedWishlist) {
						$scope.items = updatedWishlist.items;
					});
			}
		};

		$scope.addWishlistToCart = function() {
			var itemsForCart = [];

			_.forEach($scope.items, function(item) {
				if(item.addToCart) {
					itemsForCart.push({product: item.product._id, quantity: item.quantity});
				}
			});

			if(itemsForCart.length) {
				WishlistService.addWishlistItemsToCart(itemsForCart)
					.$promise
					.then(function(updatedWishlist) {
						$scope.items = updatedWishlist.items;
						$rootScope.$emit('cart:updated');
					}, function(error) {
					});
			}
		};
	}
]);
