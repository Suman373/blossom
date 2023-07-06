import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEvent.scss';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import BlueButton from '../../../components/BlueButton/BlueButton';
import { useState } from 'react';
import eventImage from '../../../assets/blossom_event.jpg';
import useAuth from '../../../hooks/useAuth';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

const AddEvent = () => {

    const navigate = useNavigate();
    const { _id: userId } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    // form data states
    const [name, setName] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    // upload to storage bucket
    const uploadImage = async () => {
        if (image == null) return;
        const imageRef = ref(storage, `eventImages/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        return url;
    }

    const handleEventForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // upload image to fire bucket
        const imageURL = await uploadImage();
        // send data to backend 
        const data = await axios.post("http://localhost:5000/events/", {
            userId,
            name,
            organisation,
            date,
            time,
            location,
            imageURL
        })
            .catch((e) => {
                if (e.response) {
                    console.log(e.response);
                } else {
                    console.log(e.message);
                }
            });
        console.log(data?.data?.message);
        setName(""); setOrganisation(""); setDate("");
        setTime(""); setLocation(""); setImage(null);
        setIsLoading(false);
        navigate('/');
    }

    return (
        <main className='add-event-wrapper'>
            <div className="form-wrapper">
                <h1>Add <span>Event Details</span></h1>
                <p>Please fill up the details correctly </p>
                <div>
                    {
                        isLoading ?
                            <>
                                <div style={{ display: 'grid', placeContent: 'center' }}>
                                    <MoonLoader
                                        color='#0b0b9b'
                                        size={100}
                                    />
                                    <p>Submitting...</p>
                                </div>
                            </>
                            :
                            <>
                                <form onSubmit={handleEventForm}>
                                    <TextField
                                        type="text"
                                        label="Event name"
                                        id="outlined-basic"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder='Event name' />

                                    <TextField
                                        type="text"
                                        label="Organisation name"
                                        id="outlined-basic"
                                        value={organisation}
                                        onChange={(e) => setOrganisation(e.target.value)}
                                        required
                                        placeholder='Organisation name' />

                                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                    <Select
                                        label="Select location"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={location}
                                        required
                                        onChange={(e) => setLocation(e.target.value)}>
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
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />

                                    <TextField
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        id="outlined-basic"
                                        required
                                    />

                                    <input type="file"
                                        accepts="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        required />

                                    <BlueButton
                                        text={"Create event"}
                                    />
                                </form>
                            </>
                    }
                </div>
            </div>
            <img src={image ? URL.createObjectURL(image) : eventImage} className="uploaded-image" alt="add event illustration" />
        </main>
    )
}

export default AddEvent;
