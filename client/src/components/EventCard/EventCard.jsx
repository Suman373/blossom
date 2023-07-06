import React, { useState } from 'react';
import './EventCard.scss';
import BlueButton from '../BlueButton/BlueButton';
import defaultImage from '../../assets/blossom_fallback.jpg';
import {GoLocation} from 'react-icons/go';
import {BsClock} from 'react-icons/bs';
import moment from 'moment';

const EventCard = ({event}) => {

    const handleAttendEvent = async()=>{
        // attend the event
        return;
    }

    return (
        <div className='event-item'>
            <img src={event?.imageURL ? event?.imageURL : defaultImage} alt="event item banner" />
            <div className="event-details">
                <p className="event-name">{event.name}</p>
                <p>By {event.organisation}</p>
                <p><i className="event-icon"><GoLocation/></i><span> {event.location}</span>
                {" "}
                <i className="event-icon"><BsClock/></i>{moment(event?.date).format("MMM Do")} {event?.time}</p>
            </div>

            <div style={{textAlign:'center'}}>
                <BlueButton
                    text="Attend "
                    handleClick={handleAttendEvent} />
            </div>

        </div>
    )
}

export default EventCard;
