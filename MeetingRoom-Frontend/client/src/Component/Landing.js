import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "./Landing.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Landing() {
    const [landingData, setLandingData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        const apiUrl = 'http://127.0.0.1:4001/bookings';

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new error('Response was not Okay');
                }
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setLandingData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (false) {
        return null;
    }

    if (!landingData) {
        return <div> No data</div>;
    }
    //  if(lan)


    return (
        <div>
            <Navbar/>
            
            <h1 class="header-name">Meeting Dashboard</h1>
            <div className='table-cont'>
            <table>
                <thead>
                    <tr>
                        <th className='name'>Employee Name</th>
                        <th>Room Name</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
               
                <tbody>
                    {landingData.bookings.map((booking) => (
                        <tr>
                            <td>{booking.employeeName}</td>
                            <td>{booking.roomName}</td>
                            <td>{booking.date}</td>
                            <td>{booking.startTime}</td>
                            <td>{booking.endTime}</td>
                            <td className="button-container">
                  <button className="update-button">
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                  <button className="delete-button">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
                        </tr>
                    ))}
                </tbody>
               
            </table>
            </div>
            
        </div>
    )
}

export default Landing;