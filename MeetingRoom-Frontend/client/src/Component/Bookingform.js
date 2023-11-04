import React, { useEffect, useState } from 'react';
import "./BookingForm.css"
import Navbar from './Navbar';
import toastr  from 'toastr';
import 'toastr/build/toastr.css';

 
function BookingForm() {
  const [bookingData, setBookingData] = useState(null);
  const [landingData, setLandingData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
 
  const initialFormValues = {
    employeeId: '',
    roomName: '',
    date: '',
    startTime: '',
    endTime: '',
  };
 
  const [formValues, setFormValues] = useState(initialFormValues);
 
 
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
 
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    fetch('http://127.0.0.1:4001/bookroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Submission was not successful');
        }
        return response.json();
      })
      .then((data) => {
        switch (data.message) {
          case 'Event created':
            toastr.success('Booking created successfully', 'Success');

            

            // const newBookingData = formValues;
            // setLandingData((prevData) => {
            //   const updatedBookings = [newBookingData, ...prevData.bookings]; // Add the new booking data at the beginning
            //   return { ...prevData, bookings: updatedBookings };
            // });

            window.location.href = '/';
            break;
          case 'Already booked':
            toastr.info('Already Booked');
            break;
          case 'starttime should be less than endtime':
          toastr.info('starttime should be less than endtime')
          break;
          case 'Failed to register Event':
            toastr.error('Failed to book Event')
            break;
          case 'Meeting Period should be between 30 minutes to 1 hour':
            toastr.error('Meeting Period should be between 30 minutes to 1 hour')
            break;
          default:
            toastr.info(data.message, 'Info');
        }

      })
      .catch((error) => {
        console.error(error);
      });
  };

  toastr.options = {
    closeButton: true, // Show a close button
    timeOut: 5000, // Notification timeout in milliseconds
    extendedTimeOut: 1000, // Extended timeout when the user hovers over the notification
    positionClass: 'toast-top-center' 
};
 
  useEffect(() => {
    setLoading(true);
    const apiUrl = 'http://127.0.0.1:4001/getEmpAndRoom';
 
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response was not Okay');
        }
        return response.json();
      })
      .then((data) => {
        setBookingData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
 
  return (
    <div className="container">
      <Navbar/>
      <div className="form-container">
        <form id="edit-form" onSubmit={handleSubmit}>
          <label htmlFor="employeeId">Employee Name:</label>
          <select
            id="employeeId"
            name="employeeId"
            value={formValues.employeeId}
            onChange={handleFormChange}
            required
          >
            <option value="">Select your Name</option>
            {bookingData &&
              bookingData.employees.map((employee) => (
                <option key={employee._id} value={employee.employeeId}>
                  {employee.name}
                </option>
              ))}
          </select>
          <label htmlFor="roomName">Room Name:</label>
          <select
            id="roomName"
            name="roomName"
            value={formValues.roomName}
            onChange={handleFormChange}
            required
          >
            <option value="">Select your Room</option>
            {bookingData &&
              bookingData.rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
          </select>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formValues.date}
            onChange={handleFormChange}
            required
          />
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formValues.startTime}
            onChange={handleFormChange}
            required
          />
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formValues.endTime}
            onChange={handleFormChange}
            required
          />
          <button className="book-button1" type="submit" id="save-button">Save Changes</button>
        </form>
      </div>
    </div>
    
  );
}
 
export default BookingForm;