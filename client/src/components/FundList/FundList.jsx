import React from 'react';
import './FundList.scss';
import { TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import FundCard from '../FundCard/FundCard';
import BlueButton from '../BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import {MoonLoader} from 'react-spinners';
import axios from 'axios';


const FundList = () => {

  document.title = "HH | Fundraises"
  const navigate = useNavigate();
  const [fundRaiseSearch, setFundRaiseSearch] = useState("");

  const [fundraises, setFundRaises] = useState([]);

  const fetchFundRaises = async()=>{
     const data = await axios.get('http://localhost:5000/funds/')
     .catch((e)=>{
      if(e.response){
        console.log(e.response);
      }else{
        console.log(e.message);
      }
     });
    //  console.log(data?.data);
     setFundRaises(data?.data);
  }

  const addNewFundRaise = (e) => {
    e.preventDefault();
    navigate('/new/fundraise');
  }

  useEffect(()=>{
    fetchFundRaises();
  },[]);

  return (
   <>
    <section className="fund-raise-container" >
      <header>
        <TextField
          id="outlined-search"
          className="search-field"
          value={fundRaiseSearch}
          onChange={(e) => setFundRaiseSearch(e.target.value)}
          type="search"
          label="Search fundraise"
        />
        <BlueButton
           text={"Add new fundraise"}
           handleClick={addNewFundRaise}
        />

      </header>

      <section className="fund-list-container">
        <h1>Fund-raises you can donate to</h1>
        <ul className='fund-list'>
          {
            fundraises?.length > 0 ?
              fundraises?.map((fund, index) => (
                fund?.title?.toLowerCase().includes((fundRaiseSearch.toLowerCase())) ?
                  <FundCard
                    key={index}
                    fund={fund}
                    />
                  :
                  ""
              ))
              :
              <>
                <div style={{height:"fitContent",display:"grid", placeContent:'center'}}>
                <MoonLoader size={80} color="#067676"/>
                </div>
              </>
          }
        </ul>
      </section>
    </section>
   </>
  )
}

export default FundList;
