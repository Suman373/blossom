import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEvent.scss';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import BlueButton from '../../../components/BlueButton/BlueButton';
import { useState } from 'react';
import donationImg from '../../../assets/donation box.png';

const AddEvent = () => {

    // route navigator 
    const navigate = useNavigate();

    // states for forms
    const [eventName, setEventName] = useState("");
    const [eventOrgName, setEventOrgName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventLocation, setEventLocation] = useState("");


    // submission of form
    const handleEventForm = async (e) => {
        e.preventDefault();
        alert("Event created! ");
        console.log(eventName, eventOrgName, eventDate, eventTime,eventLocation);
        setEventName(""); setEventOrgName(""); setEventDate(""); setEventTime("");setEventLocation("");
        navigate('/userhome');
    }

    return (
        <main className='add-event-wrapper'>
            <div className="form-wrapper">
                <h1>Add <span>Event Details</span></h1>
                <p>Please fill up the details correctly </p>
                <div>
                    <form>
                        <TextField
                            type="text"
                            label="Event name"
                            id="outlined-basic"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder='Event name' />

                        <TextField
                            type="text"
                            label="Organisation name"
                            id="outlined-basic"
                            value={eventOrgName}
                            onChange={(e) => setEventOrgName(e.target.value)}
                            placeholder='Organisation name' />

                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            label="Select location"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}>
                            <MenuItem value="Kolkata" defaultValue >Kolkata</MenuItem>
                            <MenuItem value="Bangalore">Bangalore</MenuItem>
                            <MenuItem value="Mumbai">Mumbai</MenuItem>
                            <MenuItem value="New Delhi">New Delhi</MenuItem>
                            <MenuItem value="Chennai">Chennai</MenuItem>
                            <MenuItem value="Pune">Pune</MenuItem>
                            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                            <MenuItem value="Bhopal">Bhopal</MenuItem>
                        </Select>

                        <TextField
                            type="date"
                            id="outlined-basic"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />

                        <TextField
                            type="time"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                            id="outlined-basic"
                        />

                        <BlueButton
                            text={"Create"}
                            handleClick={handleEventForm} />
                    </form>
                </div>
            </div>
            <img src={donationImg} alt="add event illustration" />
        </main>
    )
}

export default AddEvent;
