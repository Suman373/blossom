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
        <h1>FUND RAISE</h1>
          <TextField
            id="outlined-search"
            color="secondary"
            value={fundRaiseSearch}
            onChange={(e) => setFundRaiseSearch(e.target.value)}
            label="Search field"
            type="search"
          />
      </header>

      <section className="fund-list-container">
        <h1>Lists of Funds</h1>
        <ul>
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
                <p>No fund rasises available</p>
              </>
          }
        </ul>
      </section>
    </section>
  )
}

export default FundRaise;
