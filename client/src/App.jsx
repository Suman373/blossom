import React from 'react';
import './App.scss';
import {BrowserRouter as BRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/nonuser/Home/Home';
import UserHome from './pages/user/UserHome/UserHome';
import AddFundRaise from './pages/user/AddFundRaise/AddFundRaise';
import AddEvent from './pages/user/AddEvent/AddEvent';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
    <BRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <Home/>
          }></Route>
          <Route path="/userhome" element={
            <UserHome/>
          }></Route>
          <Route path="/userhome/new-fundraise" element={
            <AddFundRaise/>
          }></Route>
          <Route path="/userhome/new-event" element={
            <AddEvent/>
          }></Route>
        </Routes>
        <Footer/>
      </div>
    </BRouter>
    </>
  )
}

export default App;
