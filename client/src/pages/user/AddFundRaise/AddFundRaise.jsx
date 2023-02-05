import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFundRaise.scss';
import { TextField } from '@mui/material';
import BlueButton from '../../../components/BlueButton/BlueButton';
import { useState } from 'react';
import donationImg from '../../../assets/donation box.png';

const AddFundRaise = () => {

  // route navigator 
  const navigate = useNavigate();

  // states for forms
  const [fundRaiseName, setFundRaiseName] = useState("");
  const [fundOrgName, setFundOrgName] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [fundDeadline , setFundDeadline] = useState();

  // submission of form
  const handleFundRaiseForm = async (e) => {
    e.preventDefault();
    alert("Yay form submitted");
    console.log(fundRaiseName, fundOrgName, fundAmount, fundDeadline);
    // api
    setFundRaiseName(""); setFundOrgName(""); setFundDeadline(); setFundAmount("");
    navigate('/userhome');
  }

  return (
    <main className='add-fundraise-wrapper'>
      <img src={donationImg} alt="add fund illustration" />
      <div className="form-wrapper">
        <h1>Add <span>Fundraise Details</span></h1>
        <p>You are required to fill up the necessary details</p>
        <div>
          <form>
            <TextField
              type="text"
              label="Fundraise name"
              id="outlined-basic"
              value={fundRaiseName}
              onChange={(e) => setFundRaiseName(e.target.value)}
              placeholder='Fund raise name' />

            <TextField
              type="text"
              label="Organisation name"
              id="outlined-basic"
              value={fundOrgName}
              onChange={(e) => setFundOrgName(e.target.value)}
              placeholder='Organisation name' />

            <TextField
              type="text"
              label="Amount"
              id="outlined-basic"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              placeholder='Amount to be raised' />

            <TextField
            type="date"
            id="outlined-basic"
            value={fundDeadline}
            onChange={(e)=> setFundDeadline(e.target.value)}
            />

            <BlueButton
              text={"Create"}
              handleClick={handleFundRaiseForm} />
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddFundRaise;
