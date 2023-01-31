import React from 'react';
import './FundRaise.scss';
import { TextField } from '@mui/material';
import { useState } from 'react';
import FundCard from '../FundCard/FundCard';
import BlueButton from '../BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';

const FundRaise = () => {

  // title set
  document.title = "HH | Fundraises"

  // const navigator
  const navigate = useNavigate();

  const [fundRaiseSearch, setFundRaiseSearch] = useState("");

  const funds = ["A","B","C","D"];


  // adding new event button click
  const addNewFundRaise = (e) => {
    e.preventDefault();
    navigate('/userhome/new-fundraise');
  }

  return (
    <section className="fund-raise-container" >
      <header>
        <TextField
          id="outlined-search"
          className="search-field"
          value={fundRaiseSearch}
          onChange={(e) => setFundRaiseSearch(e.target.value)}
          type="search"
          label="Search fund raise"
        />
        <BlueButton
           text={"Add new fundraise"}
           handleClick={addNewFundRaise}
        />

      </header>

      <section className="fund-list-container">
        <h1>Fund raises available</h1>
        <ul className='fund-list'>
          {
            funds?.length > 0 ?
              funds.map((fund, index) => (
                fund?.toLowerCase().includes((fundRaiseSearch.toLowerCase())) ?
                  <FundCard
                    key={index}
                    fund={fund}
                    />
                  :
                  ""
              ))
              :
              <>
                <p className='no-fund-raise-message'>No fund raises to show</p>
              </>
          }
        </ul>
      </section>
    </section>
  )
}

export default FundRaise;
