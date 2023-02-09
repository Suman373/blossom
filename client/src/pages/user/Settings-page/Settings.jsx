import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.scss';
import { TextField } from '@mui/material';
import BlueButton from '../../../components/BlueButton/BlueButton';
import { useState } from 'react';
import donationImg from '../../../assets/donation box.png';

const Settings = () => {

    // route navigator 
    const navigate = useNavigate();


    // submission of form
    const handleUpdateProfile = async (e) => {
    }

    return (
        <main className='settings-wrapper'>
            <img alt="settings illustration" />
            <div className="form-wrapper">
                <h1>Your <span>Account Settings</span></h1>
                <p>Edit your account details and settings from here</p>
                <div>
                    <form>
                        <TextField
                            type="text"
                            label=""
                            id="outlined-basic" />

                        <TextField
                            type="text"
                            label=""
                            id="outlined-basic" />

                        <TextField
                            type="text"
                            label=""
                            id="outlined-basic" />

                        <TextField
                            type="text"
                            id="outlined-basic"
                        />

                        <label>
                            Insert profile avatar{"  "}
                            <input
                                type="file"
                                accept="image/png,image/jpeg" />
                        </label>

                        <BlueButton
                            text={"Update"}
                            handleClick={handleUpdateProfile} />
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Settings;
