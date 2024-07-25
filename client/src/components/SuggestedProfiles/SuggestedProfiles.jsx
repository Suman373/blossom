import React, { useEffect, useState } from 'react';
import './SuggestedProfiles.scss';
import fallback from '../../assets/blossom_fallback.jpg';
import { Link } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Skeleton from 'react-loading-skeleton';

const SuggestedProfiles = () => {
    const { _id: selfId } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSuggestedProfiles = async () => {
        setLoading(true);
        try {
            const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user`, { withCredentials: true });
            if (!data?.data?.result) {
                throw new Error("Failed to fetch suggested profiles");
            }
            setUsers(data?.data?.result);
            setTimeout(()=>{
                setLoading(false);
            },2000);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSuggestedProfiles();
    }, []);

    return (
        <div className="suggested-profile-section">
            <h3>People you may know</h3>
            {
                users?.length >= 1 && !loading ?
                    users?.map((item, index) => {
                        return item?._id === selfId ? null :
                            <div className='suggested-profile-card' key={index}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem'
                                }}>
                                    <img src={item?.profileImage ? item?.profileImage : fallback} alt="pfp" />
                                    <p style={{ textOverflow: 'clip' }}>{item?.name || <Skeleton width={80}/>}</p>
                                </div>
                                <Link to={`/profile/public/${item?._id}`}><IoEye /></Link>
                            </div>
                    })
                    : !loading && <p style={{ textAlign: 'center' }}>No suggesstions</p>
            }
            {
                loading && <Skeleton count={3} height={70} width={300}/>
            }
        </div>
    )
}

export default SuggestedProfiles;