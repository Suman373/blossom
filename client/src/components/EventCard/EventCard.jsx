import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EventCard.scss';
import BlueButton from '../BlueButton/BlueButton';
import defaultImage from '../../assets/blossom_fallback.jpg';
import { GoLocation } from 'react-icons/go';
import { BsClock } from 'react-icons/bs';
import moment from 'moment';

const EventCard = ({ event }) => {

    const handleAttendEvent = async () => {
        // attend the event
        return;
    }

    return (
        <div className='event-item'>
            <img src={event?.imageURL ? event?.imageURL : defaultImage} alt="event item banner" />
            <div className="event-details">
                <p className="event-name">{event.name}</p>
                <p>By {event.organisation}</p>
                <p><GoLocation /><span>{event.city}</span>
                    <BsClock />{moment(event?.date).format("MMM Do")} {event?.time}</p>
            </div>

            <div style={{ padding:'0.8rem'}}>
                <Link to={`/event/details?id=${event?._id}`}>Know more</Link>
            </div>

        </div>
    )
}

export default EventCard;
