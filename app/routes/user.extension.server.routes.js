'use strict';

var extensionUserController = require('../controllers/user.extension.server.controller');


module.exports = function(app) {
   //Setting up the users api
  //app.route('/auth/register')
  //  .post(extensionUserController.create);
  //
  //app.route('/auth/login')
  //  .post(
  //    function(req,res,next){
  //      req.body.email = req.body.email.toLowerCase();
  //      next();
  //    },
  //    passport.authenticate('local', {
  //      failureFlash: true
  //    }),
  //    extensionUserController.login);
  //
  //app.route('/auth/logout')
  //  .get(extensionUserController.logout);
  //
  //app.route('/auth/password')
  //  .put(extensionUserController.changePassword);
  //
  //app.route('/auth/resetForgotPassword')
  //    .put(extensionUserController.resetForgotPassword);

  app.route('/auth/profile')
    .put(extensionUserController.updateProfile);

  app.route('/auth/user/:userId')
      .get(extensionUserController.getUserById);

  app.route('/auth/search/user')
      .get(extensionUserController.searchUser);

  app.route('/auth/user/changePassword')
      .put(extensionUserController.changeUserPassword);

  app.route('/auth/user/update')
      .put(extensionUserController.updateUserInfo);

  app.route('/auth/user/delete')
      .delete(extensionUserController.removeUserById);

  app.route('/auth/user/create')
      .post(extensionUserController.createUser);

  app.route('/auth/users/statistics')
      .get(extensionUserController.getUserStatistics);

  app.route('/auth/user/guest')
      .post(extensionUserController.createGuestUser);
  
  app.route('/auth/guest/to/user/signin')
      .post(extensionUserController.signInUserWithGuestUserItems);

};
