import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as BRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserHome from './pages/user/UserHome/UserHome';
import AddFundRaise from './pages/user/AddFundRaise/AddFundRaise';
import AddEvent from './pages/user/AddEvent/AddEvent';
import Footer from './components/Footer/Footer';
import UserDetails from './pages/user/UserDetails/UserDetails';
import Landing from './pages/nonuser/Landing/Landing';
import Signup from './pages/nonuser/Signup/Signup';
import useAuth from './hooks/useAuth';
import FundDetails from './pages/user/FundDetails/FundDetails';
import EventDetails from './pages/user/EventDetails/EventDetails';
import DetailsForm from './pages/user/DetailsForm/DetailsForm';
import Success from './pages/user/Success/Success';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = useAuth();
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <BRouter>
        <div className='App'>
          {
            user ?
              <>
                <Routes>
                  <Route path="/" element={<UserHome user={user} setUser={setUser}/>}></Route>
                  <Route path='/user-details' element={<DetailsForm setUser={setUser}/>}></Route>
                  <Route path="/new/fundraise" element={<AddFundRaise />}></Route>
                  <Route path="/new/event" element={<AddEvent />}></Route>
                  <Route path="/profile/:type/:id" element={<UserDetails />}></Route>
                  <Route path="/fundraise/details/:id" element={<FundDetails/>}></Route>
                  <Route path="/event/details/:id" element={<EventDetails/>}></Route>
                  <Route path="/success" element={<Success/>}></Route>
                  <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
              </>
              :
              <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
              </Routes>
          }
          <Footer />
        </div>
      </BRouter>
    </>
  )
}

export default App;
