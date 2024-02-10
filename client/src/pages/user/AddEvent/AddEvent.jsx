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
import toast from 'react-hot-toast';

const AddEvent = () => {

    const navigate = useNavigate();
    const { _id: userId } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    // form data states
    const [name, setName] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState([]);
    const [time, setTime] = useState("");
    const [city, setCity] = useState("");
    const [place, setPlace] = useState("");
    const [image, setImage] = useState(null);
    const [dateTime, setDateTime] = useState(Date);

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
        // uploading image to fire bucket
        const imageURL = await uploadImage();
        // sending data to backend 
        const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/events/`, {
            userId,
            name,
            organisation,
            description,
            date,
            time,
            city,
            place,
            imageURL
        })
            .catch((e) => {
                if (e.response) {
                    console.log(e.response);
                } else {
                    console.log(e.message);
                }
                toast.error("Failed to add event");
            });
        console.log(data?.data?.message);
        toast.success("Event uploaded");
        setName(""); setOrganisation(""); setDate("");
        setTime(""); setPlace(""); setCity(""); setImage(null);
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

                                    <TextField
                                        type="text"
                                        label="Description"
                                        id="outlined-basic"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        placeholder='Description' />

                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        label="Select city"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        required
                                        onChange={(e) => setCity(e.target.value)}>
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
                                        type="text"
                                        label="Place"
                                        id="outlined-basic"
                                        value={place}
                                        onChange={(e) => setPlace(e.target.value)}
                                        required
                                        placeholder='Place' />

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
                                        id="outlined-basic" z
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
