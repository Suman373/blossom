import React from 'react';
import './AddFundRaise.scss';
import {TextField, MenuItem } from '@mui/material';
import BlueButton from '../../../components/BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddFundRaise = () => {

  // route navigator 
  const navigate = useNavigate();

  // states for forms
  const [fundRaiseName, setFundRaiseName] = useState("");
  const [fundOrgName, setFundOrgName] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [fundCurrency , setFundCurrency] = useState("");

  // submission of form
  const handleFundRaiseForm = async (e) => {
    e.preventDefault();
    alert("Yay form submitted");
    console.log(fundRaiseName, fundOrgName, fundAmount, fundCurrency);
    // api
    setFundRaiseName("");setFundOrgName(""); setFundCurrency("");setFundAmount("");
    navigate('/userhome');
  }
  
  return (
    <main className='add-fundraise-wrapper'>
      <h1>Add <span>Fundraise Details</span></h1>
      <p>You are required to fill up the necessary details</p>
      <div>
        <form>
          <TextField
            type="text"
            label="Fundraise name"
            id="outlined-basic"
            value={fundRaiseName}
            onChange={(e)=> setFundRaiseName(e.target.value)}
            placeholder='Fund raise name' />

          <TextField
            type="text"
            label="Organisation name"
            id="outlined-basic"
            value={fundOrgName}
            onChange={(e)=> setFundOrgName(e.target.value)}
            placeholder='Fund raise name' />

          <TextField
            type="text"
            label="Amount"
            id="outlined-basic"
            value={fundAmount}
            onChange={(e)=> setFundAmount(e.target.value)}
            placeholder='Amount to be raised' />

          <TextField 
            id="select" 
            label="Currency"
            value={fundCurrency}
            onChange={(e)=> setFundCurrency(e.target.value)}
            select>
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="YEN">YEN</MenuItem>
          </TextField>

          <BlueButton
            text={"Create"}
            handleClick={handleFundRaiseForm} />
        </form>
      </div>

    </main>
  )
}

export default AddFundRaise;
