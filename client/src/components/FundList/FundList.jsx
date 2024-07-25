import React from 'react';
import './FundList.scss';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import FundCard from '../FundCard/FundCard';
import BlueButton from '../BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FundEventSk from '../Skeletons/FundEventSk';


const FundList = () => {

  document.title = "HH | Fundraises"
  const navigate = useNavigate();
  const [fundRaiseSearch, setFundRaiseSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fundraises, setFundRaises] = useState([]);

  const fetchFundRaises = async () => {
    setLoading(true);
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/funds/`,{withCredentials:true})
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        } else {
          console.log(e.message);
        }
      });
    //  console.log(data?.data);
    setFundRaises(data?.data);
    setTimeout(()=>{
      setLoading(false);
    },2000);
  }

  const addNewFundRaise = (e) => {
    e.preventDefault();
    navigate('/new/fundraise');
  }

  useEffect(() => {
    fetchFundRaises();
  }, []);

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
          <div className='fund-list'>
            {
              fundraises?.length > 0 && !loading ?
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
                  {!loading  && (<p className='result-message'>No fundraises to show</p>)}
                </>
            }
            {loading && <FundEventSk cards={4}/>}
          </div>
        </section>
      </section>
    </>
  )
}

export default FundList;
