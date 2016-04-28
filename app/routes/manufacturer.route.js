'use strict';

var controller = require('../controllers/manufacturer.controller');

module.exports = function (app) {
    app.route('/api/manufacturer')
        .get(controller.getManufacturers);
};


