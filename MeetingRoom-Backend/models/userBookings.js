const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userBookSchema = new Schema ({
    employeeId: {
        type:String,
        required:true,
    },
    roomName: {
        type:String,
        required:true,
    },
    date: {
        type:Date,
        required:true,
    },
    startTime: {
        type:Date,
        required:true
    },
    endTime: {
    type:Date,
    required:true
    }
})

module.exports = mongoose.model('UserBookings', userBookSchema)