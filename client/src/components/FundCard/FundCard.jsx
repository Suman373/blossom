import React, { useState } from 'react';
import './FundCard.scss';
import BlueButton from '../BlueButton/BlueButton';
import fundItemImg from '../../assets/children.jpeg';

const FundCard = ({ fund }) => {

    const [donateAmt , setDonateAmt] = useState(0);

    const handleDonation = ()=>{
        if(donateAmt === 100){ return; }
        setDonateAmt(donateAmt+50);
    }

    return (
        <div className='fund-item'>
            <img src={fundItemImg} alt="fund item banner" />
            <div className="fund-details">
                <p className="fund-title">{fund.title}</p>
                <p>By {fund.orgName}</p>
                <p>Ends on {fund.deadline}</p>
                <div className="progress-flex">
                    <div className="progress-container">
                        <div className="progress"
                            style={{ width: `${donateAmt}%` }}>

                        </div>
                    </div>
                    <div className="amount-raised">
                        <p>{donateAmt !== 100 ? donateAmt : 'Max'} %</p>
                    </div>
                </div>

            </div>

            <div style={{textAlign:'center'}}>
                <BlueButton
                    text="Donate ❤"
                    handleClick={handleDonation} />
            </div>

        </div>
    )
}

export default FundCard;
