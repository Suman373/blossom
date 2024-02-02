import React, { useEffect, useState } from 'react';
import './UserDetails.scss';
import axios from 'axios';
import fallback from '../../../assets/blossom_fallback.jpg';
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { MdWork, MdEmail } from 'react-icons/md';
import { HiPencilAlt } from 'react-icons/hi';
import { FaBirthdayCake } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import toast from 'react-hot-toast';

// this page is common for self(user) and other profiles(public)
const UserDetails = () => {

  const [userDetails, setUserDetails] = useState({});
  // get type and id from route param
  const { id: profileId, type } = useParams();

  const fetchUserDetails = async () => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user/${profileId}`, { withCredentials: true });
      if (!data?.data?.result) {
        toast.error("Failed to fetch details");
      }
      // console.log(data?.data);
      toast.success("Profile loaded");
      setUserDetails(data?.data?.result);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
      toast.error("Something went wrong");
    }
  }


  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <div className='user-details-wrapper'>
        <div className="user-header">
          <div className="cover">
            <img
              className='cover-img'
              src={fallback}
              alt="" />
            <img
              className='pfp-img'
              src={userDetails?.profileImage ? userDetails?.profileImage : fallback}
              alt="" />
            {/* show edit on self profile pages */}
            {
              type === "self" && (<i className="edit-icon">
                <HiPencilAlt />
              </i>)
            }
          </div>
          <div className="info">
            <div className="info-left-wrap">
              <p className="name">{userDetails?.name}</p>
              <p className="bio">I am a student, aspiring remote software developer</p>
              <p className="email"><span><MdEmail /></span> {userDetails?.email}</p>
              <p className='profession'><span><MdWork /></span> {userDetails?.profession ? userDetails?.profession : "Just chilling here"}</p>
              <p className="dob"><span><FaBirthdayCake /></span> 26-06-2001</p>
            </div>
            <div className="info-right-wrap">
              <div className="numeric-items">
                <h1>{userDetails?.followers?.length}</h1>
                <p>Followers</p>
              </div>
              <div className="numeric-items">
                <h1>{userDetails?.followers?.length}</h1>
                <p>Following</p>
              </div>
              <div className="numeric-items">
                <h1><span>
                  &#x20B9;
                </span>
                  {userDetails?.amountDonated}
                </h1>
                <p>Donation</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default UserDetails;