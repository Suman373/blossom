import React, { useState } from 'react';
import './FundCard.scss';
import BlueButton from '../BlueButton/BlueButton';
import fallback from '../../assets/blossom_fallback.jpg';
import moment from 'moment';

const FundCard = ({ fund }) => {


    return (
        <div className='fund-item'>
            <img src={fund?.imageURL? fund?.imageURL : fallback} alt="fund item banner" />
            <div className="fund-details">
                <p className="fund-title">{fund?.title}  <span className='fund-amount'> &#8377; {fund?.amount}</span></p>
                <p>By {fund?.orgName}</p>
                <p>Deadline {moment(fund?.deadline).format("MMM Do YY")}</p>
            </div>

            <div style={{textAlign:'center'}}>
                <BlueButton
                    text="Donate ❤"
                  />
                <BlueButton text="Message ✉"/>
            </div>
        </div>
    )
}

export default FundCard;
