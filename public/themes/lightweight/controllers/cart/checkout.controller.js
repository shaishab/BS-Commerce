(function(){
	'use strict';
	angular.module('lightweight').controller('CheckoutController', ['$scope', '$rootScope', '$location', '$state', 'Global', '$timeout', 'CartService','CheckoutService', 'UserService',
		function($scope, $rootScope, $location, $state, Global, $timeout, CartService, CheckoutService, UserService) {

			$scope.cartEmpty = true;
			$scope.oneAtATime = true;
			$scope.user = {'_id':''};
			$scope.user= Global.user || {};
			$scope.order = {};
			$scope.addresses =[];
			$scope.order.shippingCost = 0;

			$scope.items = [];

			CartService.getCart()
				.$promise
				.then(function (cart) {
					if (cart.items && cart.items.length > 0) {
						$scope.cartEmpty = false;
						$scope.items = cart.items;
						var subTotal = 0;

						_.forEach($scope.items, function(item){
							subTotal+= (item.product.info.price * item.quantity);
						});
						$scope.subTotal = subTotal;
					}
					else {
						$state.go('emptyCart');
					}

				},
				function (error) {
					$state.go('emptyCart');
				});

			$scope.initializeAddress = function() {
				UserService.getUserById($scope.user._id)
					.$promise
					.then(function(user) {
						$scope.user = user;
						$scope.order.user = user._id;
						if(user.addresses.length > 0) {
							angular.forEach(user.addresses, function(address) {
								$scope.addresses.push(user.firstName +' ' +user.lastName +', '+ user.email +', '+ address.addressLine1 +', '+ address.city +', '+ address.country +', '+ user.phoneNumber);
							});
						}
					});
			};

			$scope.initializeAddress();

			$scope.selectBillingAddress = function(indx) {
				if(indx === '') {
					$scope.order.billingAddress ={};
					return;
				}
				$scope.order.billingAddress = {
					firstName: $scope.user.firstName,
					lastName: $scope.user.lastName,
					email: $scope.user.email,
					addressLine1: $scope.user.addresses[indx].addressLine1,
					addressLine2: $scope.user.addresses[indx].addressLine2,
					city: $scope.user.addresses[indx].city,
					country: $scope.user.addresses[indx].country,
					postCode: $scope.user.addresses[indx].postCode,
					phoneNumber: $scope.user.phoneNumber
				};
			};

			$scope.selectShippingAddress = function(indx) {
				if(indx === '') {
					$scope.order.shippingAddress ={};
					return;
				}
				$scope.order.shippingAddress = {
					firstName: $scope.user.firstName,
					lastName: $scope.user.lastName,
					email: $scope.user.email,
					addressLine1: $scope.user.addresses[indx].addressLine1,
					addressLine2: $scope.user.addresses[indx].addressLine2,
					city: $scope.user.addresses[indx].city,
					country: $scope.user.addresses[indx].country,
					postCode: $scope.user.addresses[indx].postCode,
					phoneNumber: $scope.user.phoneNumber
				};
			};

			var addProductInfo = function(callback) {
				var productCount = 0;
				$scope.order.productCost = 0;
				$scope.order.products = [];
				angular.forEach($scope.items, function(item) {
					var newProduct = {
						productId: item.product._id,
						name: item.product.info.name,
						price:item.product.info.price,
						tax: $scope.tax,
						quantity: item.quantity,
						sku: item.product.info.sku
					};
					$scope.order.productCost += (newProduct.price * newProduct.quantity);
					$scope.order.products.push(newProduct);
					productCount +=1;
				});
				if(productCount === $scope.items.length) {
					$scope.order.totalCost = $scope.order.productCost + $scope.order.shippingCost;
					callback();
				}
			};

			$scope.confirmOrder = function() {
				addProductInfo(function() {
					CheckoutService.createOrder($scope.order)
						.$promise
						.then(function(response) {
							$scope.orderSuccess = true;
							$scope.orderId = response.orderId;
							CartService.deleteAllCartItems()
								.$promise
								.then(function(deleteResponse) {
									$rootScope.$emit('cart:updated');
									$state.go('CheckoutSuccess',{orderId: response.orderId});
								},
								function(error) {
									$rootScope.$emit('cart:updated');
									$state.go('CheckoutSuccess',{orderId: response.orderId});

								});
						},
						function(error) {
							$scope.orderSuccess = false;
						});
				});

			};

			$scope.isDisablePanel = function(stepNo) {
				var activeStep = 0, index =0;
				angular.forEach($scope.open, function(val, key) {
					index++;
					if($scope.open[key]) {
						activeStep = index;
					}
				});
				if(stepNo > activeStep && activeStep!==0) {
					return true;
				}  if(activeStep === 0) {
					$scope.open.tab1 = true;
					return false;
				}
				return false;
			};

			$scope.setActiveStep = function(stepNo) {
				$scope.open['tab'+stepNo] = true;
			};

			$scope.open = {
				tab1: true,
				tab2: false,
				tab3: false,
				tab4: false,
				tab5: false,
				tab6: false
			};
		}
	]);
})();
