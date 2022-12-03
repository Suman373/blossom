import React from 'react';
import './FundRaise.scss';
import {TextField } from '@mui/material';
import { useState } from 'react';

const FundRaise = () => {

  const [fundRaiseSearch, setFundRaiseSearch] = useState("");

  const funds = [];
 
  return (
    <section className="fund-raise-container">
      <header>
          <TextField
            id="outlined-search"
            className="search-field"
            value={fundRaiseSearch}
            onChange={(e) => setFundRaiseSearch(e.target.value)}
            type="search"
            label="Search field"
          />
      </header>

      <section className="fund-list-container">
        <h1>Lists of Funds</h1>
        <ul className='fund-list'>
          {
            funds?.length>0?
              funds.map((fund,index)=>(
                fund?.toLowerCase().includes((fundRaiseSearch.toLowerCase())) ?
                  <li
                  key={index}>
                      {fund}
                  </li>
                  :
                  ""
              ))
              :
              <>
                <p className='no-fund-raise-message'>No fund raises available</p>
              </>
          }
        </ul>
      </section>
    </section>
  )
}

export default FundRaise;
