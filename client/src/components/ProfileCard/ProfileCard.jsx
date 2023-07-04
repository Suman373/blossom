import React, { useState, useEffect } from 'react';
import './ProfileCard.scss';
import defaultCover from '../../assets/blossom_fallback.jpg';

const ProfileCard = () => {
    /** 
const [profileDetails, setProfileDetails] = useState([]);
const {_id} = useAuth();
 
// api to get user details
const fetchProfileDetails = async()=>{
  const data = await axios.get(`http://localhost:5000/users/${_id}`)
  .catch((e)=>{
    if(e.response){
      console.log(e.response.data);
    }else{
      console.log(e.message);
    }
  });
  alert(data?.data?.message);
  // setProfileDetails(data?.data);
}

useEffect(()=>{
  fetchProfileDetails();
},[]);

**/
    return (
        <div className="profile">
            <div className="cover">
                <img className='cover-pic' src={defaultCover} alt="cover" />
                <img className="profile-pic" src={defaultCover} alt="pfp" />
            </div>
            <div className="details">
                <h3 className="name">Suman Roy</h3>
                <p className="email">reachsuman.roy@gmail.com</p>
                <div className="count">
                    <div className="count-slots">
                        Amount donated <span>$200</span>
                    </div>
                    <div className="count-slots">
                        Events held <span>1</span>
                    </div>
                    <div className="count-slots">
                        Followers <span>15</span>
                    </div>
                    <div className="count-slots">
                        Following <span>23</span>
                    </div> 
                </div>
                <button>
                    Show Profile
                </button>
            </div>
        </div>
    )
}

export default ProfileCard;