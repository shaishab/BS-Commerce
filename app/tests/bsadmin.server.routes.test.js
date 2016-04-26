'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bsadmin = mongoose.model('Bsadmin'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, bsadmin;

/**
 * Bsadmin routes tests
 */
describe('Bsadmin CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Bsadmin
		user.save(function() {
			bsadmin = {
				name: 'Bsadmin Name'
			};

			done();
		});
	});

	it('should be able to save Bsadmin instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bsadmin
				agent.post('/bsadmins')
					.send(bsadmin)
					.expect(200)
					.end(function(bsadminSaveErr, bsadminSaveRes) {
						// Handle Bsadmin save error
						if (bsadminSaveErr) done(bsadminSaveErr);

						// Get a list of Bsadmins
						agent.get('/bsadmins')
							.end(function(bsadminsGetErr, bsadminsGetRes) {
								// Handle Bsadmin save error
								if (bsadminsGetErr) done(bsadminsGetErr);

								// Get Bsadmins list
								var bsadmins = bsadminsGetRes.body;

								// Set assertions
								(bsadmins[0].user._id).should.equal(userId);
								(bsadmins[0].name).should.match('Bsadmin Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bsadmin instance if not logged in', function(done) {
		agent.post('/bsadmins')
			.send(bsadmin)
			.expect(401)
			.end(function(bsadminSaveErr, bsadminSaveRes) {
				// Call the assertion callback
				done(bsadminSaveErr);
			});
	});

	it('should not be able to save Bsadmin instance if no name is provided', function(done) {
		// Invalidate name field
		bsadmin.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bsadmin
				agent.post('/bsadmins')
					.send(bsadmin)
					.expect(400)
					.end(function(bsadminSaveErr, bsadminSaveRes) {
						// Set message assertion
						(bsadminSaveRes.body.message).should.match('Please fill Bsadmin name');
						
						// Handle Bsadmin save error
						done(bsadminSaveErr);
					});
			});
	});

	it('should be able to update Bsadmin instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bsadmin
				agent.post('/bsadmins')
					.send(bsadmin)
					.expect(200)
					.end(function(bsadminSaveErr, bsadminSaveRes) {
						// Handle Bsadmin save error
						if (bsadminSaveErr) done(bsadminSaveErr);

						// Update Bsadmin name
						bsadmin.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Bsadmin
						agent.put('/bsadmins/' + bsadminSaveRes.body._id)
							.send(bsadmin)
							.expect(200)
							.end(function(bsadminUpdateErr, bsadminUpdateRes) {
								// Handle Bsadmin update error
								if (bsadminUpdateErr) done(bsadminUpdateErr);

								// Set assertions
								(bsadminUpdateRes.body._id).should.equal(bsadminSaveRes.body._id);
								(bsadminUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Bsadmins if not signed in', function(done) {
		// Create new Bsadmin model instance
		var bsadminObj = new Bsadmin(bsadmin);

		// Save the Bsadmin
		bsadminObj.save(function() {
			// Request Bsadmins
			request(app).get('/bsadmins')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bsadmin if not signed in', function(done) {
		// Create new Bsadmin model instance
		var bsadminObj = new Bsadmin(bsadmin);

		// Save the Bsadmin
		bsadminObj.save(function() {
			request(app).get('/bsadmins/' + bsadminObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', bsadmin.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bsadmin instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bsadmin
				agent.post('/bsadmins')
					.send(bsadmin)
					.expect(200)
					.end(function(bsadminSaveErr, bsadminSaveRes) {
						// Handle Bsadmin save error
						if (bsadminSaveErr) done(bsadminSaveErr);

						// Delete existing Bsadmin
						agent.delete('/bsadmins/' + bsadminSaveRes.body._id)
							.send(bsadmin)
							.expect(200)
							.end(function(bsadminDeleteErr, bsadminDeleteRes) {
								// Handle Bsadmin error error
								if (bsadminDeleteErr) done(bsadminDeleteErr);

								// Set assertions
								(bsadminDeleteRes.body._id).should.equal(bsadminSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bsadmin instance if not signed in', function(done) {
		// Set Bsadmin user 
		bsadmin.user = user;

		// Create new Bsadmin model instance
		var bsadminObj = new Bsadmin(bsadmin);

		// Save the Bsadmin
		bsadminObj.save(function() {
			// Try deleting Bsadmin
			request(app).delete('/bsadmins/' + bsadminObj._id)
			.expect(401)
			.end(function(bsadminDeleteErr, bsadminDeleteRes) {
				// Set message assertion
				(bsadminDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bsadmin error error
				done(bsadminDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Bsadmin.remove().exec();
		done();
	});
});