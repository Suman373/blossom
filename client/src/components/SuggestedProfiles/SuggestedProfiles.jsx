import React, { useEffect, useState } from 'react';
import './SuggestedProfiles.scss';
import fallback from '../../assets/blossom_fallback.jpg';
import { Link } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const SuggestedProfiles = () => {
    const{_id:selfId} = useAuth();
    const [users, setUsers] = useState([]);

    const fetchSuggestedProfiles = async()=>{
        try {
            const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user`,{withCredentials:true});
            if(!data?.data?.result){
                throw new Error("Failed to fetch suggested profiles");
            }
            setUsers(data?.data?.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchSuggestedProfiles();
    },[]);

    return (
        <div className="suggested-profile-section">
            <h3>People you may know</h3>
            {
                users?.length >= 1 ?
                    users?.map((item, index) => {
                       return item?._id === selfId ? null : 
                        <>
                            <div className='suggested-profile-card' key={index}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem'
                                }}>
                                    <img src={item?.profileImage ? item?.profileImage : fallback} alt="pfp" />
                                    <p style={{textOverflow:'clip'}}>{item?.name}</p>
                                </div>
                                <Link to={`/profile/public/${item?._id}`}><IoEye /></Link>
                            </div>
                        </>
                    })
                    :
                    <p style={{ textAlign: 'center' }}>No suggestions</p>
            }
        </div>
    )
}

export default SuggestedProfiles;