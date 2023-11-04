const mongoose=require('mongoose');
const response = require('./../lib/responseLib');
const mongoosePage = require('mongoose-paginate-v2')

//models

const emplyepath = require('./../models/employee');
const employeeDetails = mongoose.model('employeeDetails');
const roompath = require('./../models/rooms.js');
const rooms = mongoose.model('rooms');
const ubookpath = require('./../models/userBookings');
const userBookings = mongoose.model('UserBookings')



//get all employees code

 
let getallemplyes=(req,res)=>{
    employeeDetails.find({},)
    .exec((err,result)=>{
        console.log(result)
        if(err){
            let apiResponse=response.generate(true,'Failed To Get All Users',500,null);
            res.send(apiResponse);
        }
        else {
         let apiResponse=response.response(false,'Users Are Found',200,result);
        res.send(apiResponse)
        }
    })
}


let getEmpAndRooms = async (req, res) => {
    let employee = await employeeDetails.find({})
    let room = await rooms.find({})
    console.log(employee)
    let formvalues = {
        employees: employee.map(employee => ({ name: employee.employeeName, id: employee._id,employeeId:employee.employeeId })),
        rooms: room.map(room => ({ name: room.roomName, id: room._id }))
    }
    res.send(formvalues)
}



let getbooking = async (req, res) => {
    let employee = await employeeDetails.find({})
    let room = await rooms.find({})
    let formvalues = {
        employees: employee.map(employee => ({ name: employee.employeeName, id: employee._id,employeeId:employee.employeeId })),
        rooms: room.map(room => ({ name: room.roomName, id: room._id }))
    }
    res.render('bookings', {
        title1: 'Maximize Office Productivity!',
        title: 'Book with Confidence!',
        formvalues:formvalues
    })
}



function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
        const now = new Date(); 
        now.setHours(hours);
        now.setMinutes(minutes);
        now.setSeconds(0); 
console.log(now)
        return now;
    } else {
        return null; // Parsing failed
    }
}



const originalDate = "Tue Oct 17 2023 05:30:00 GMT+0530 (India Standard Time)";

// Now, `yyyyMMddValue` contains the date in the "YYYY-MM-DD" format.


//create event code start
let validateBooking=async (req)=>{
    
    const specificDate = req.body.date; 

    // Calculate the start and end times for the specific date
    const specificDateStartTime = new Date(specificDate);
    specificDateStartTime.setHours(0, 0, 0, 0); 
    
    const specificDateEndTime = new Date(specificDate);
    specificDateEndTime.setHours(23, 59, 59, 999); // End of the day
    
    // Define the start and end times for the new booking on the specific date
    const newBookingStartTime = parseTime(req.body.startTime); 
    const newBookingEndTime = parseTime(req.body.endTime); 
    console.log(newBookingStartTime)
    console.log(newBookingEndTime)
    console.log(specificDate)
    // Query for overlapping bookings on the specific date
    const overlappingBookings = await userBookings.find({
        date: {
            $gte: new Date(specificDate),
            $lte: new Date(specificDate)
        },
        $or: [
            {
                $and: [
                    { startTime: { $lt: newBookingEndTime } },
                    { endTime: { $gt: newBookingStartTime } }
                ]
            }
        ]
    });
    console.log(overlappingBookings,'overlaping')
    return overlappingBookings;
}

function validateStartTimeBeforeEndTime(startTime, endTime) {
    const startDateTime =parseTime(startTime);;
    const endDateTime = parseTime(endTime);
    if (startDateTime < endDateTime) {
        return true; // Start time is before end time
    } else {
        return false; // Start time is not before end time
    }
}



let newbooking=async(req,res)=>{
    const validateSlot=await validateBooking(req);
    if(validateSlot.length){
        let apiResponse = response.response(true,'Already booked', 500, null)
        res.send(apiResponse)
    }
    else if(!validateStartTimeBeforeEndTime(req.body.startTime,req.body.endTime)){
        let apiResponse = response.response(true,'starttime should be less than endtime', 500, null)
        res.send(apiResponse)
    }
    else{
        console.log(req.nody)
    let newbooking=new userBookings({
        employeeId: req.body.employeeId,
        roomName: req.body.roomName,
        date: req.body.date,
        startTime: parseTime(req.body.startTime),
        endTime: parseTime(req.body.endTime),
    })
    newbooking.save((err,result)=>{
        console.log(err,'errr')
        if (err) {
            let apiResponse = response.response(true,'Failed to register Event', 500, null)
            res.send(apiResponse)
            throw err
        }  else {
            let apiResponse = response.response(false, 'Event created', 200, result)
            res.send(apiResponse)
        }
    })
}
}


const editBooking = async (req, res) => {
    try {
        // Retrieve the booking ID from the request parameters
        const bookingId = req.params.bookingId;

        // Validate the input and check if the booking exists
        const existingBooking = await userBookings.findById(bookingId);
        if (!existingBooking) {
            let apiResponse = response.response(true, 'Booking not found', 404, null);
            return res.send(apiResponse);
        }

        // Check if the slot is already booked
        const validateSlot = await validateBooking(req);
        if (validateSlot.length) {
            let apiResponse = response.response(true, 'Slot is already booked', 500, null);
            return res.send(apiResponse);
        }

        // Check if the start time is before the end time
        if (!validateStartTimeBeforeEndTime(req.body.startTime, req.body.endTime)) {
            let apiResponse = response.response(true, 'Start time should be less than end time', 500, null);
            return res.send(apiResponse);
        }

        // Update the booking data
        existingBooking.employeeId = req.body.employeeId;
        existingBooking.roomName = req.body.roomName;
        existingBooking.date = req.body.date;
        existingBooking.startTime = parseTime(req.body.startTime);
        existingBooking.endTime = parseTime(req.body.endTime);

        // Save the updated booking
        existingBooking.save((err, result) => {
            if (err) {
                let apiResponse = response.response(true, 'Failed to update booking', 500, null);
                return res.send(apiResponse);
            } else {
                let apiResponse = response.response(false, 'Booking updated', 200, result);
                return res.send(apiResponse);
            }
        });
    } catch (err) {
        console.error(err);
        let apiResponse = response.response(true, 'Internal Server Error', 500, null);
        res.send(apiResponse);
    }
};


let createUser = async(req,res) =>{
    let newbooking=new employeeDetails({
        employeeId:req.body.employeeId,
        employeeName: req.body.employeeName,
        
        
    })

    newbooking.save((err,result)=>{ 
        try{
        res.send(result)
        }
        catch(e){
            res.send(err)
        }
    })
}


//create rooms code
let createRooms = async (req, res) => {
    console.log(req.body)
    let newbooking = new rooms ({
        roomId: req.body.roomId,
        roomName: req.body.roomName
    })
    newbooking.save((err,result)=>{ 
        try{
        console.log(result)
        res.send(result)
        }
        catch(e){
            console.log(e)
            console.log(err)
            res.send(err)
        }
    })
}
//create room code end
function convertToYYYYMMDDFormat(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const yyyyMMddFormat = `${year}-${month}-${day}`;
    
    return yyyyMMddFormat;
    }

//get all bookings code strat
let getallbookings=async (req,res)=>{    
    let details = await userBookings.aggregate([
        {
            $lookup: {
                from: "employeedetails",
                localField: "employeeId",
                foreignField: "employeeId",
                as: "employee"
              },
        },
    ]);
    try {
        

    
    details.forEach((booking)=>{
        booking.date = convertToYYYYMMDDFormat(booking.date);
        booking.employeeName = booking.employee[0].employeeName;
    });
    
             res.render('landing', { title: 'Meeting Dashboard', bookings:details });
        }
        catch 
            (error) {
                console.error(error);
                res.status(500).send('Error retrieving bookings');
            
        }
    }

  //delete booking code start
// let deletebooking=(req,res)=>{
//     userBookings.deleteOne({_id:req.body._id},(err,result)=>{
//         if(err){
//         let apiResponse=response.response(true,'some error occured',500,null)
//         res.send(apiResponse)
//         }
//         else {
//             let apiResponse=response.response(false,"Events Is Deleted Successfully",200,result);
            
//         }
//     })
// }

let deletebooking = async (req, res) => {
    try {
        const meetingId = req.body._id;
        const meetingToDelete = await userBookings.findOne({ _id: meetingId });
 
        if (!meetingToDelete) {
           return res.status(404).json({ message: "Booking not found" });
        }
  
        await meetingToDelete.deleteOne({ _id: meetingId });
 
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
       res.status(500).json({ message: "Internal Server Error" });  
    } 
  };
//delete booking code end

//edit booking code start
let updatebooking=(req,res)=>{
    let options=req.body;
    userBookings.updateOne({_id:req.body._id},options,{multi:true}).exec((err,result)=>{
        if(err){
            logger.captureError('some error occured','update event',6)
        let apiResponse=response.response(true,'some error occured',403,null)
        res.send(apiResponse)
        }
        else {
            let apiResponse=response.response(false,"Events Is Updated Successfully",200,result);
            res.render('update')
        }
    })
}
//edit booking code end

module.exports = {
    getbooking:getbooking,
    getallemplyes: getallemplyes,
    newbooking: newbooking,
    getallbookings:getallbookings,
    deletebooking:deletebooking,
    updatebooking:updatebooking,
    createUser:createUser,
    createRooms:createRooms,
    getEmpAndRooms:getEmpAndRooms,
    editBooking:editBooking
}

