import React from 'react';
import './EventDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import BlueButton from '../../../components/BlueButton/BlueButton';

const EventDetails = () => {
    // const {id:fundId} = useParams();
    const navigate = useNavigate();
    const goback=()=>navigate('/');

    const fetchEventDetails = async()=>{

    };


    return (
        <div className='event-details-wrapper'>
            <BlueButton 
            text={"⬅️ Back"}
            handleClick={goback}
            />
            <h1>Event details page</h1>
        </div>
    )
}

export default EventDetails;