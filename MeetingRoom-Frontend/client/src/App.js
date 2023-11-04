import logo from './logo.svg';
import './App.css';
import Landing from './Component/Landing';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import BookingForm from './Component/Bookingform';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/BookingForm' element={<BookingForm/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
