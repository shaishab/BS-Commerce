'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bsadmin = mongoose.model('Bsadmin'),
	_ = require('lodash');


/**
 *
 */
exports.adminHomePageRender = function(req, res) {
	console.log('call for admin');
	res.render('admin', {
		user: req.user || null,
		request: req
	});
};

/**
 * Bsadmin authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bsadmin.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
