'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var BrandSchema = new Schema({
    info:{
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: null
        },
        allowToSelectPageSize:{
            type: Boolean,
            default: false
        },
        published:{
            type: Boolean,
            default: false
        },
        displayOrder:{
            type: Number,
            default: 0
        },
        pageSizeOptions: [ {type: Number} ]
    },
    meta: {
        keywords: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        SEFN: {
            type: String,
            default: ''
        }
    }
});

mongoose.model('Brand', BrandSchema);
