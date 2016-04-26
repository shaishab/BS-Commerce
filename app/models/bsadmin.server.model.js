'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bsadmin Schema
 */
var BsadminSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Bsadmin name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Bsadmin', BsadminSchema);