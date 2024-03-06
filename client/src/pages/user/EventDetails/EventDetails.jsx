import React, { useEffect, useState } from 'react';
import './EventDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import BlueButton from '../../../components/BlueButton/BlueButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GoLocation } from 'react-icons/go';
import { BsClock } from 'react-icons/bs';
import moment from 'moment';
import useAuth from '../../../hooks/useAuth';

const EventDetails = () => {

    const navigate = useNavigate();
    const {_id:selfId} = useAuth();
    const { id: eventId } = useParams();
    
    // states
    const [showAttend, setShowAttend] = useState(false);
    const [eventDetails, setEventDetails] = useState({});

    // home
    const goback = () => navigate('/');


    const fetchEventDetails = async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/events/${eventId}`);
            if (!data?.data?.result) {
                toast.error(data?.data?.message);
                return;
            }
            toast.success("Fetched event");
            setEventDetails(data?.data?.result);
            selfId === data?.data?.result?.userId ? setShowAttend(false) : setShowAttend(true);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    useEffect(() => {
        fetchEventDetails();
    }, []);

    return (
        <div className='event-details-wrapper'>
            <BlueButton
                text={"←"}
                handleClick={goback}
            />
            <h1>{eventDetails?.name}</h1>
            <h2> - {eventDetails?.organisation}</h2>
            <div className="main-content">
                <img src={eventDetails?.imageURL} alt="event" />
                <div className="text-content">
                    <p>{eventDetails?.description}</p>
                    <p><GoLocation /><span>{eventDetails.city}</span>
                        <BsClock />{moment(eventDetails?.date).format("MMM Do")} {eventDetails?.time}</p>
                    <div style={{textAlign:'center'}}>
                       {showAttend && ( <BlueButton text={"Attend"} />)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EventDetails;