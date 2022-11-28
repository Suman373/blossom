import React from 'react';
import './App.scss';
import {BrowserRouter as BRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/public/Home/Home';

const App = () => {
  return (
    <>
    <BRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <Home/>
          }></Route>
        </Routes>
      </div>
    </BRouter>
    </>
  )
}

export default App;
