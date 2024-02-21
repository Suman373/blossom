import React, { useState } from 'react';
import './DetailsForm.scss';
import { TextField } from '@mui/material';
import logo from '../../../assets/blossomLogo.png';
import Warning from '../../../components/Warning/Warning';
import BlueButton from '../../../components/BlueButton/BlueButton';
import toast from 'react-hot-toast';
import { CiCirclePlus } from "react-icons/ci";
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../config/firebase';
import { v4 } from 'uuid';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DetailsForm = ({ setUser }) => {

    const navigate = useNavigate();
    let userObj = useAuth();
    const [loading, setLoading] = useState(false);
    // form states
    const [profileImage, setProfileImage] = useState(null);
    const [profession, setProfession] = useState("");
    const [bio, setBio] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [dob, setDob] = useState("");


    // upload file to storage bucket using 
    const uploadImage = async () => {
        if (profileImage == null) return;
        const imageRef = ref(storage, `profileImages/${profileImage.name + v4()}`);
        await uploadBytes(imageRef, profileImage);
        const url = await getDownloadURL(imageRef);
        return url;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        try {
            if (!profession || !bio || !dob || !profileImage || !phoneNumber) {
                toast('Fill the required details', { icon: '⚠️' });
                return;
            } else if (phoneNumber.length !== 10) {
                toast('Phone number must be 10digits', { icon: '⚠️' });
                return;
            }
            const imageURL = await uploadImage();
            const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/user/details/${userObj?._id}`, {
                profession,
                bio,
                phoneNumber,
                profileImage: imageURL,
                dob
            });
            if (!data?.data) {
                toast.error(data?.data?.message);
            }
            toast.success("Details saved");
            setBio(""); setProfession(""); setDob(""); setProfession(null); setPhoneNumber(null);
            userObj.completedDetails = true;
            setUser(userObj);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <div className='details-form-wrapper'>
                <img src={logo} className='logo' alt="logo" />
                <h1>Before we get started...</h1>
                <p>We want to know you better ✨</p>
                <div className="details-form">
                    <form>
                        <label>Profile picture</label>
                        <div className="display-pfp">
                            {
                                profileImage && (<img id='upload-img' src={URL.createObjectURL(profileImage)} alt="" />)
                            }
                            <label htmlFor="file-input" >
                                <CiCirclePlus />
                                <input
                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                    multiple={false}
                                    type='file'
                                    id='file-input'
                                    required
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                        <TextField
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            type="text"
                            label="Bio" />

                        <TextField
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            type="profession"
                            label="Profession" />
                        <TextField
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type='number'
                            label="Phone number" />

                        <label>Date of Birth</label>
                        <TextField
                            type="date"
                            id="outlined-basic"
                            value={dob}
                            required
                            onChange={(e) => setDob(e.target.value)}
                        />

                        <div style={{textAlign:'center'}}>
                            <BlueButton
                                loading={loading}
                                handleClick={handleFormSubmit}
                                text={"Save"} />
                        </div>
                    </form>
                    <Warning text={"In case of discrepancy your data might get deleted"} />
                </div>
            </div>
        </>
    )
}

export default DetailsForm;