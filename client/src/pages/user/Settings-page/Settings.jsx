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

    const [editedName, setEditedName] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileAvatar, setProfileAvatar] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(true);

    // submission of form
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log(editedName, editedPassword, confirmPassword,profileAvatar);
        if(editedPassword !== confirmPassword){
            setPasswordMatch(false);
            return;
        }else{
            setPasswordMatch(true);
            alert("Updated!");
        }
    }

    return (
        <main className='settings-wrapper'>
            {profileAvatar&&<>

            <img src={URL.createObjectURL(profileAvatar)} alt="Not selected" />

            </>}
            <div className="form-wrapper">
                <h1>Your <span>Account Settings</span></h1>
                <p>Edit your account details and settings from here</p>
                <div>
                    <form>
                        <TextField
                            value={editedName}
                            onChange={(e)=> setEditedName(e.target.value)}
                            type="text"
                            label="Edit name"/>

                        <TextField
                            value={editedPassword}
                            onChange={(e)=> setEditedPassword(e.target.value)}
                            type="password"
                            label="Edit password"/>

                        <TextField
                            value={confirmPassword}
                            type="password"
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            label="Confirm password"/>
                        
                        {!passwordMatch ? 
                            <p style={{color:'red',fontSize:'1rem'}}>Password did not match</p>:""}

                        <label>
                            Insert profile avatar{"  "}
                            <input
                                type="file"
                                onChange={(e)=> setProfileAvatar(e.target.files[0])}
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
