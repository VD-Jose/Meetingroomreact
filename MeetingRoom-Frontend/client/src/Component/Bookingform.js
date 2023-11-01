import React from 'react'

function Bookingform() {
  return (
    <div>
        <h1>Booking Form</h1>
        <div className='form-cont'>
            <form>
        <label htmlFor="employeeId">Employee ID:</label>
        <select id="employeeId" name="employeeId" required>
          <option value="">Select your employee Id</option>
          {/* {formvalues.employees.map((employee, index) => (
            <option key={index} value={employee.employeeId}>
              {employee.employeeId}
            </option>
          ))} */}
        </select>
        <label htmlFor="roomName">Room Name:</label>
        <select id="roomName" name="roomName" required>
          <option value="">Select your room</option>
          {/* {formvalues.rooms.map((room, index) => (
            <option key={index} value={room.name}>
              {room.name}
            </option>
          ))} */}
        </select>

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" required />

        <label htmlFor="startTime">Start Time:</label>
        <input type="time" id="startTime" name="startTime" required />

        <label htmlFor="endTime">End Time:</label>
        <input type="time" id="endTime" name="endTime" required />

        <button type="submit" id="save-button">Save Changes</button>
      </form>
        </div>
    </div>
  )
}

export default Bookingform