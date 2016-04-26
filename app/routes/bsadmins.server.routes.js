'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var adminController = require('../../app/controllers/bsadmins.server.controller');

	// Bsadmins Routes
	app.route('/admin')
		.get(adminController.adminHomePageRender);

	//app.route('/bsadmins/:bsadminId')
	//	.get(adminController.read)
	//	.put(users.requiresLogin, adminController.hasAuthorization, adminController.update)
	//	.delete(users.requiresLogin, adminController.hasAuthorization, adminController.delete);
    //
	//// Finish by binding the Bsadmin middleware
	//app.param('bsadminId', adminController.bsadminByID);
};
