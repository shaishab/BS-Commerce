'use strict';

var cartController = require('../controllers/cart.server.controller');

module.exports = function(app) {
    app.route('/api/cart')
        .get(cartController.getCart)
        .put(cartController.update)
        .delete(cartController.deleteCartById);
};
