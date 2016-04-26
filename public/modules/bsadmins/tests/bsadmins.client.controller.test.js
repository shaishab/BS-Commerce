'use strict';

(function() {
	// Bsadmins Controller Spec
	describe('Bsadmins Controller Tests', function() {
		// Initialize global variables
		var BsadminsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Bsadmins controller.
			BsadminsController = $controller('BsadminsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bsadmin object fetched from XHR', inject(function(Bsadmins) {
			// Create sample Bsadmin using the Bsadmins service
			var sampleBsadmin = new Bsadmins({
				name: 'New Bsadmin'
			});

			// Create a sample Bsadmins array that includes the new Bsadmin
			var sampleBsadmins = [sampleBsadmin];

			// Set GET response
			$httpBackend.expectGET('bsadmins').respond(sampleBsadmins);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bsadmins).toEqualData(sampleBsadmins);
		}));

		it('$scope.findOne() should create an array with one Bsadmin object fetched from XHR using a bsadminId URL parameter', inject(function(Bsadmins) {
			// Define a sample Bsadmin object
			var sampleBsadmin = new Bsadmins({
				name: 'New Bsadmin'
			});

			// Set the URL parameter
			$stateParams.bsadminId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bsadmins\/([0-9a-fA-F]{24})$/).respond(sampleBsadmin);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bsadmin).toEqualData(sampleBsadmin);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bsadmins) {
			// Create a sample Bsadmin object
			var sampleBsadminPostData = new Bsadmins({
				name: 'New Bsadmin'
			});

			// Create a sample Bsadmin response
			var sampleBsadminResponse = new Bsadmins({
				_id: '525cf20451979dea2c000001',
				name: 'New Bsadmin'
			});

			// Fixture mock form input values
			scope.name = 'New Bsadmin';

			// Set POST response
			$httpBackend.expectPOST('bsadmins', sampleBsadminPostData).respond(sampleBsadminResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bsadmin was created
			expect($location.path()).toBe('/bsadmins/' + sampleBsadminResponse._id);
		}));

		it('$scope.update() should update a valid Bsadmin', inject(function(Bsadmins) {
			// Define a sample Bsadmin put data
			var sampleBsadminPutData = new Bsadmins({
				_id: '525cf20451979dea2c000001',
				name: 'New Bsadmin'
			});

			// Mock Bsadmin in scope
			scope.bsadmin = sampleBsadminPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bsadmins\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bsadmins/' + sampleBsadminPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bsadminId and remove the Bsadmin from the scope', inject(function(Bsadmins) {
			// Create new Bsadmin object
			var sampleBsadmin = new Bsadmins({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bsadmins array and include the Bsadmin
			scope.bsadmins = [sampleBsadmin];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bsadmins\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBsadmin);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bsadmins.length).toBe(0);
		}));
	});
}());