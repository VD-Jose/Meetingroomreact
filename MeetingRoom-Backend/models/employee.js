'use strict'
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let empschema = new Schema ({
    employeeName: {
        type: String,
        default:'',
    },
    employeeId: {
        type: String,
        default:'',

    }
 })
 
 module.exports = mongoose.model('employeeDetails', empschema)