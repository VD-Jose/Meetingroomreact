import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "./Landing.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
 
function Landing() {
    const [landingData, setLandingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
 
    useEffect(() => {
        const apiUrl = 'http://127.0.0.1:4001/bookings';
 
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Response was not Okay');
                }
                return response.json();
            })
            .then((data) => {
                setLandingData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);
 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = landingData ? landingData.bookings.slice(indexOfFirstItem, indexOfLastItem) : [];
 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
    const nextPage = () => {
        if (currentPage < Math.ceil(landingData.bookings.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
 
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
 
 
    const handleDelete = (bookingId) => {
        const confirmation = window.confirm('Are you sure you want to delete this booking?');
 
        if (confirmation) {
            fetch(`http://127.0.0.1:4001/deletebooking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: bookingId }),
            })
                .then((response) => {
                    if (response.status === 200) {
                        setLandingData((prevData) => ({
                            ...prevData,
                            bookings: prevData.bookings.filter((booking) => booking._id !== bookingId),
                        }));
                        toastr.success('Booking Deleted Successfully', 'Success');
                       

                    } else if (response.status === 404) {
                        toastr.error('Booking not found', 'Error');
                    } else {
                        toastr.error('An error occurred while deleting the booking', 'Error');
                    }
                })
                .catch((error) => {
                    toastr.error('An error occurred while deleting the booking', 'Error');
                });
        }
    };
 
    toastr.options = {
        closeButton: true,
        timeOut: 5000,
        extendedTimeOut: 1000,
        positionClass: 'toast-top-center',
    };
 
    if (loading) {
        return <div>Loading...</div>;
    }
 
    if (error) {
        return <div>Error: {error.message}</div>;
    }
 
    if (!landingData) {
        return <div>No data</div>;
    }
 
    return (
        <div className='app-container'>
             <Navbar/>
             <div className='content-container'>
        <div className="meeting-table-container">
           
    <table className="meeting-table">
        <thead>
            <tr>
                <th>Employee Name</th>
                <th>Room Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {currentItems&&currentItems
                .slice() // Use currentItems for rendering
                .map((booking) => (
                    <tr key={booking._id}>
                        <td className="employee-name">{booking.employeeName}</td>
                        <td>{booking.roomName}</td>
                        <td>{booking.date}</td>
                        <td>{booking.startTimeLocal}</td>
                        <td>{booking.endTimeLocal}</td>
                        <td className="button-container">
                            <button className="update-button">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(booking._id)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </td>
                    </tr>
                ))}
        </tbody>
    </table>
    </div>
    <ul className="pagination">
        <li className="pagination-button" onClick={prevPage}>
            Previous
        </li>
        {Array.from({ length: Math.ceil(landingData.bookings.length / itemsPerPage) }, (_, index) => (
    <li key={index} className={currentPage === index + 1 ? 'active' : ''} onClick={() => paginate(index + 1)}>
        {index + 1}
    </li>
))}
        <li className="pagination-button" onClick={nextPage}>
            Next
        </li>
    </ul>
</div>
</div>
    );
 
 
       
}
 
export default Landing;