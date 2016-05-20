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
			$scope.global = Global;

			$scope.items = [];

			var stripePublishableKey = '';
			$scope.creditCardInfo = {};
			$scope.months = [];
			$scope.years = [];
			var currentYear = new Date().getFullYear();

			for (var month=1; month<=12; month++) {
				$scope.months.push(month);
			}

			for(var year = 0; year<15; year++) {
				$scope.years.push(currentYear + year);
			}

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

			CartService.getStripePublishableKey()
				.$promise
				.then(function(response) {
					stripePublishableKey = response.publishableKey;

					console.log(response);
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

			$scope.checkCreditCardValidation = function() {

				Stripe.setPublishableKey(stripePublishableKey);

				//var valid = $.payment.validateCardNumber($scope.creditCardInfo.cardNumber);
                //
				//if (!valid) {
				//	$scope.cardError = 'Your card is not valid!';
				//	return false;
				//}

				//https://github.com/mjhea0/node-stripe-example/blob/master/src/server/routes/index.js

				console.log($scope.creditCardInfo);
				$rootScope.isBusy = true;

				Stripe.card.createToken({
					number: $scope.creditCardInfo.cardNumber,
					cvc: $scope.creditCardInfo.cardCVC,
					exp_month: $scope.creditCardInfo.cardExpireMonth,
					exp_year: $scope.creditCardInfo.cardExpireYear
				}, function(status, stripeResponse){

					if(stripeResponse.error){
						console.log('stripe error',stripeResponse.error);
						$rootScope.isBusy = false;
						$scope.cardError = stripeResponse.error.message;
					}else{
						console.log('stripe success');
						$rootScope.isBusy = false;
						var stripeToken = stripeResponse.id;
						console.log('stripe id= ',stripeToken);
						$scope.order.stripeToken = stripeToken;
						$scope.setActiveStep(6);

						//if(stripeToken){
						//	$scope.order.stripeToken = stripeToken;
						//	$scope.setActiveStep(6);
						//}else{
						//	//$scope.busy = false;
						//	$scope.cardError ='Token not found from stripe.';
						//}
					}
				});

				//$scope.setActiveStep(6)

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
				console.log('call to change tab');
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
