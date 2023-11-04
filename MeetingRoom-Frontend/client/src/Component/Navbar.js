import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import "./Navbar.css";
 
function Navbar() {

  const location = useLocation();
  return (
    <div id="app">
      <div className="header"> 
        <div className="right">
        <ul>
        {location.pathname === '/' && (
          <li>
            <NavLink to="/BookingForm">
              <button type="button" className="button">
                Book a meet
              </button>
            </NavLink>
          </li>
        )}
        {location.pathname === '/BookingForm' && (
          <li>
            <NavLink to="/">
              <button type="button" className="button button-back">
                Back
              </button>
            </NavLink>
          </li>
        )}
      </ul>
        </div>
        <div className="left">
          <img src="https://www.vuedata.com/assets/vuedata%20light.png" alt="Logo" style={{ width: '250px', height: '25px' }} /> {/* Use double curly braces for inline styles */}
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;