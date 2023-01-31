import React from 'react';
import './FundCard.scss';
import { FaArrowRight } from 'react-icons/fa';
import {MdPublic} from 'react-icons/md';

const FundCard = ({ fund }) => {
    let progressVal = 90;
    return (
        <div className='fund-item'>

            <div className="fund-header">
                <h1>FundCard raise name</h1>
                <button>
                    <FaArrowRight />
                </button>
            </div>
            <div className="fund-time">
               <i><MdPublic/></i>
               <p>1d</p>
            </div>
            <div className="fund-details">
                <p>created by Random Name</p>
                <div className="progress-flex">
                    <div className="progress-container">
                        <div className="progress"
                            style={{ width: `${progressVal}%` }}>

                        </div>
                    </div>
                    <div className="amount-raised">
                        <p>272/2727</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default FundCard;
