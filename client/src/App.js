import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
//import Home from './components/Home';
import Dashboard from './pages/dashboard';
import People from './pages/People';
import TextBook from './pages/TextBook'
import Roomates from './pages/Roomates';
import Meals from './pages/Meals';
import BusTicket from './pages/BusTicket';
import Activities from './pages/Activities';
import Elections from './pages/Elections';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Card from './pages/Card';
import CreditCardForm from './pages/creditcard'
import BusPaymentForm from "./pages/ticketsCard"
// import AuthComponent from './components/AuthContainer'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/people" element={<People />} />
        <Route path="/textbooks" element={<TextBook />} />
        <Route path="/roommates" element={<Roomates />} />
        <Route path='/meals' element={<Meals />} />
        <Route path='/bustickets' element={<BusTicket />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/elections' element={<Elections />} />
        <Route path='/updateInfo' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path={`/card/:id`} element={<Card />} />
        <Route path ={`/CreditCardForm/:plantype`} element = {<CreditCardForm />} />
        
        <Route path ={`/BusPaymentForm/:BusPaymentForm`} element = {<BusPaymentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
