import React, { useState,useEffect } from 'react';
import './App.scss';
import {BrowserRouter as BRouter, Routes, Route} from 'react-router-dom';
import Signup from './pages/nonuser/Signup/Signup';
import UserHome from './pages/user/UserHome/UserHome';
import AddFundRaise from './pages/user/AddFundRaise/AddFundRaise';
import AddEvent from './pages/user/AddEvent/AddEvent';
import Footer from './components/Footer/Footer';
import axios from 'axios';

const App = () => {
  const [user,setUser] = useState(null);
  // user details
  const getUser = async()=>{
    try {
      const url = `http://localhost:5000/auth/login/success`;
      const {data} = await axios.get(url,{withCredentials:true});
      console.log("User data",data);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUser();

  },[]);

  return (
    <>
    <BRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            user ? <UserHome user={user}/> : <Signup/>
          }></Route>
        </Routes>
        <Footer/>
      </div>
    </BRouter>
    </>
  )
}

export default App;
