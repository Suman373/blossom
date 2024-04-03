import React, { useEffect, useState } from 'react';
import './UserDetails.scss';
import axios from 'axios';
import fallback from '../../../assets/blossom_fallback.jpg';
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { MdWork, MdEmail } from 'react-icons/md';
import { HiPencilAlt } from 'react-icons/hi';
import { FaBirthdayCake } from 'react-icons/fa';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Link } from 'react-router-dom';
import FundCard from '../../../components/FundCard/FundCard';
import EventCard from '../../../components/EventCard/EventCard';
import { Line, LineChart, Tooltip, CartesianGrid,XAxis,YAxis } from 'recharts';


const donationChartData = [
  {
    month:"Jan",
    donated:2000,
  },
  {
    month:"Feb",
    donated:400,
  },
  {
    month:"Mar",
    donated:5999,
  },
  {
    month:"Apr",
    donated:2000,
  },
  {
    month:"May",
    donated:1440,
  },
  {
    month:"Jun",
    donated:0,
  },
  {
    month:"Jul",
    donated:2000,
  },
  {
    month:"Aug",
    donated:0,
  },
  {
    month:"Sep",
    donated:0,
  },
  {
    month:"Oct",
    donated:5999,
  },
  {
    month:"Nov",
    donated:3000,
  },
  {
    month:"Dec",
    donated:1300,
  },

]
const eventsChartData = [
  {
    month:"Jan",
    eventsHeld:2,
  },
  {
    month:"Feb",
    eventsHeld:4,
  },
  {
    month:"Mar",
    eventsHeld:5,
  },
  {
    month:"Apr",
    eventsHeld:2,
  },
  {
    month:"May",
    eventsHeld:0,
  },
  {
    month:"Jun",
    eventsHeld:0,
  },
  {
    month:"Jul",
    eventsHeld:2,
  },
  {
    month:"Aug",
    eventsHeld:0,
  },
  {
    month:"Sep",
    eventsHeld:0,
  },
  {
    month:"Oct",
    eventsHeld:5,
  },
  {
    month:"Nov",
    eventsHeld:3,
  },
  {
    month:"Dec",
    eventsHeld:1,
  },
];

// fundraise section
const FundRaiseSection = () => {
  const [fundraises, setFundRaises] = useState([]);
  const { id: profileId } = useParams();
  // const [feeds, setFeeds] = useState([]);
  // const [followers, setFollowers] = useState([]);
  // const [following, setFollowing] = useState([]);


  const fetchFundRaise = async () => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/funds?userId=${profileId}`);
      if (!data?.data?.result) {
        console.log(data?.data?.message);
        console.log("Failed to fetch fundraises");
      }
      setFundRaises(data?.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFundRaise();
  }, []);

  return (
    <>
      <div className="fundraise-section">
        <h1>Fundraises created by you</h1>
        {
          fundraises?.length >= 1 ?
            fundraises?.map((fund, index) => (
              <>
                <FundCard fund={fund} key={index} />
              </>
            ))
            :
            <p>Nothing to show here •—•</p>
        }
      </div>
    </>
  );
}

// events section
const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const { id: profileId } = useParams();

  const fetchEvents = async () => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/events?userId=${profileId}`);
      if (!data?.data?.result) {
        console.log(data?.data?.message);
        console.log("Failed to fetch events");
      }
      setEvents(data?.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="events-section">
        <h1>Events created by you</h1>
        {
          events?.length >= 1 ?
            events?.map((event, index) => (
              <>
                <EventCard event={event} key={index} />
              </>
            ))
            :
            <p>Nothing to show here •—•</p>
        }
      </div>
    </>
  );
}




// this page is common for self(user) and other profiles(public)
const UserDetails = () => {

  const [userDetails, setUserDetails] = useState({});
  // get type and id from route param
  const { id: profileId, type } = useParams();
  const [activeOption, setActiveOption] = useState("Fundraises");
  // profile sections
  const compoentsMap = {
    "Fundraises": <FundRaiseSection />,
    "Events": <EventsSection/>,
    "Feeds": <>Feeds</>,
    "Followers": <>Followers</>,
    "Following": <>Following</>,
    "Donations": <>Donations</>
  };
  const selectedComponent = compoentsMap[activeOption] || <><FundRaiseSection /></>;

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


  document.title = `${userDetails?.name}`;

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <div className='user-details-wrapper'>
        <Link id='back' to="/">←</Link>
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
              <p className="bio">{userDetails?.bio}</p>
              <p className="email"><span><MdEmail /></span> {userDetails?.email}</p>
              <p className='profession'><span><MdWork /></span> {userDetails?.profession ? userDetails?.profession : "Just chilling here"}</p>
              <p className="dob"><span><FaBirthdayCake /></span> {moment(userDetails?.dob).format('DD-MM-yyyy')}</p>
            </div>
            <div className="info-right-wrap">
              <div className="numeric-items">
                <h1>{userDetails?.followers?.length}</h1>
                <p>Followers</p>
              </div>
              <div className="numeric-items">
                <h1>{userDetails?.following?.length}</h1>
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
        <ul className='profile-sections-ul'>
          <li onClick={() => setActiveOption("Fundraises")}>Fundraises</li>
          <li onClick={() => setActiveOption("Events")}>Events</li>
          <li onClick={() => setActiveOption("Feeds")}>Feeds</li>
          <li onClick={() => setActiveOption("Followers")}>Followers</li>
          <li onClick={() => setActiveOption("Following")}>Following</li>
          <li onClick={() => setActiveOption("Donations")}>Donations</li>
        </ul>
        <div className="options-analytics-flexbox">
          <section className="profile-options">
            {
              selectedComponent
            }
          </section>
          <section className="profile-analytics">
            <h1>
              {userDetails?.name}'s Analytics
            </h1>
            <div className="chart-holder">
              <h2>Donations in 2023</h2>
              <LineChart width={600} height={300} data={donationChartData}>
                <Line type="monotone" dataKey="donated" stroke="#0b0b9b" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <Tooltip/>
                <YAxis />
              </LineChart>
              <h2>Events Held in 2023</h2>
              <LineChart width={600} height={300} data={eventsChartData}>
                <Line type="monotone" dataKey="eventsHeld" stroke="#0b0b9b" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <Tooltip/>
                <YAxis />
              </LineChart>
            </div>
          </section>
        </div>

      </div>
    </>
  )
}

export default UserDetails;