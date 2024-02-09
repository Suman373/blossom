import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as BRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserHome from './pages/user/UserHome/UserHome';
import AddFundRaise from './pages/user/AddFundRaise/AddFundRaise';
import AddEvent from './pages/user/AddEvent/AddEvent';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import UserDetails from './pages/user/UserDetails/UserDetails';
import Landing from './pages/nonuser/Landing/Landing';
import Signup from './pages/nonuser/Signup/Signup';
import useAuth from './hooks/useAuth';

const App = () => {
  const [user, setUser] = useState(null);
  // user details
  // const getUser = async () => {
  //   try {
  //     const url = `${import.meta.env.VITE_API_ENDPOINT}/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     console.log("User data", data);
  //     setUser(data.user);
  //     localStorage.setItem('blossomUserObj', JSON.stringify(data.user));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    const userData = useAuth();
    if (userData === null) {
      setUser(null);
    } else {
      setUser(userData);
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
                  <Route path="/" element={<UserHome user={user} setUser={setUser} />}>
                  </Route>
                  <Route path="/new/fundraise" element={<AddFundRaise />}>
                  </Route>
                  <Route path="/new/event" element={<AddEvent />}></Route>
                  <Route path="/profile/:type/:id" element={<UserDetails />}>
                  </Route>
                  <Route path="/fundraise/details" element={
                    <>
                      <h1>THIS IS FUND DETAILS PAGE</h1>
                    </>
                  }></Route>
                  <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
              </>
              :
              <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
                <Route path="*" element={<Navigate to="/" />}></Route>
              </Routes>
          }
          <Footer />
        </div>
      </BRouter>
    </>
  )
}

export default App;
