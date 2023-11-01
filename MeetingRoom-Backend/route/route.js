const controller=require('./../controller/controller.js');

const express = require('express');
const app = express.Router();

    app.post(`/bookroom`,controller.newbooking);

app.get('/bookings',controller.getallbookings)


app.get('/bookform', controller.getbooking)


app.post('/deletebooking',controller.deletebooking)

app.post('/createUser',controller.createUser)

app.get('/getupdate', controller.updatebooking)

app.post('/createRooms', controller.createRooms)


app.get('/getEmpAndRoom', controller.getEmpAndRooms)

app.put('/editbooking/:bookingId', controller.editBooking);


module.exports={
    setRouter:app
}