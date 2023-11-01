import React from 'react'
 
function Navbar() {
  return (
    <div id="app">
      <div className="header"> {/* Use "className" instead of "class" for specifying CSS classes */}
        <div className="right">
          <button onClick={() => { window.location.href = 'http://localhost:3001/bookform'; }} type="button" className="book"> {/* Use "onClick" instead of "onclick" */}
            Book a meet
          </button>
        </div>
        <div className="left">
          <img src="https://www.vuedata.com/assets/vuedata%20light.png" alt="Logo" style={{ width: '250px', height: '25px' }} /> {/* Use double curly braces for inline styles */}
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;