import React, { useState } from 'react';
import './EventCard.scss';
import BlueButton from '../BlueButton/BlueButton';
import eventItemImg from '../../assets/children.jpeg';
import {GoLocation} from 'react-icons/go';
import {BsClock} from 'react-icons/bs';

const EventCard = ({event}) => {

    const [donateAmt , setDonateAmt] = useState(0);

    const handleDonation = ()=>{
        if(donateAmt === 100){ return; }
        setDonateAmt(donateAmt+50);
    }

    return (
        <div className='event-item'>
            <img src={eventItemImg} alt="event item banner" />
            <div className="event-details">
                <p className="event-title">{event.title}</p>
                <p>By {event.orgName}</p>
                <p><GoLocation/><span> {event.location}</span>
                {" "}
                <BsClock/> {event.datetime}</p>
            </div>

            <div style={{textAlign:'center'}}>
                <BlueButton
                    text="Attend "
                    handleClick={handleDonation} />
            </div>

        </div>
    )
}

export default EventCard;
