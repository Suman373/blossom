import React, { useState, useEffect } from 'react';
import './ProfileCard.scss';
import defaultCover from '../../assets/blossom_fallback.jpg';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const ProfileCard = () => {

    const navigate = useNavigate();
    const [profileDetails, setProfileDetails] = useState([]);
    const { _id } = useAuth();


    // unique user details
    const fetchProfileDetails = async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user/${_id}`, { withCredentials: true });
            if (!data?.data?.result) {
                toast.error("Failed to load profile");
                return;
            }
            console.log(data.data.result);
            setTimeout(() => {
                setProfileDetails(data?.data?.result);
            }, 2000);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchProfileDetails();
    }, []);


    return (
        <div className="profile">
            <div className="cover">
                <img className='cover-pic' src={defaultCover} alt="cover" />
                <img className="profile-pic" src={profileDetails?.profileImage ? profileDetails?.profileImage : defaultCover} alt="pfp" />
            </div>
            <div className="details">
                <h3 className="name">{profileDetails?.name || <Skeleton width={200} />}</h3>
                <p className="email">{profileDetails?.email || <Skeleton width={200} />}</p>
                <p className="profession">{profileDetails?.profession || <Skeleton width={200} />}</p>
                <button onClick={() => navigate(`/profile/self/${_id}`)}>
                    Show Profile
                </button>
            </div>
        </div>
    )
}

export default ProfileCard;