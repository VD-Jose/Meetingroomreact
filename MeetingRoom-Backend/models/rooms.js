const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let roomSchema = new Schema ({
    roomId :{
        type:Number,
        default:'',
    },
    roomName: {
        type:String,
        default:'',
    }
})

module.exports = mongoose.model('rooms', roomSchema)
