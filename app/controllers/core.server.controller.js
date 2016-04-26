'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		themeName: 'lightweight',//lightweight//themeGreen
		request: req
	});
};
