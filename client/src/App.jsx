import React, { useState, useEffect, lazy } from 'react';
import './App.scss';
import { BrowserRouter as BRouter, Routes, Route, Navigate } from 'react-router-dom';
import {UserHome, AddFundRaise, AddEvent, UserDetails,
  FundDetails, EventDetails, DetailsForm, Success
} from './pages/user/index';
import {Signup, About} from './pages/nonuser/index';
const Landing = lazy(()=> import('./pages/nonuser/Landing/Landing'));
import Footer from './components/Footer/Footer';
import useAuth from './hooks/useAuth';

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
                <Route path="/about" element={<About/>}></Route>
              </Routes>
          }
          <Footer />
        </div>
      </BRouter>
    </>
  )
}

export default App;
