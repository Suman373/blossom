import React, { useEffect, useState } from 'react';
import './FundDetails.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BlueButton from '../../../components/BlueButton/BlueButton';
import useAuth from '../../../hooks/useAuth';
import fallback from '../../../assets/blossom_fallback.jpg';
import toast from 'react-hot-toast';
import { BsClock } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';
import Warning from '../../../components/Warning/Warning';
import { loadStripe } from '@stripe/stripe-js';
import { IoEye } from "react-icons/io5";

const FundDetails = () => {

    const navigate = useNavigate();
    const { id: fundId } = useParams();
    const { _id: selfId } = useAuth();

    // states
    const [fundDetails, setFundDetails] = useState({});
    const [donors, setDonors] = useState([]);
    const [showDonate, setShowDonate] = useState(false);
    const [donationAmount, setDonationAmount] = useState(20);

    const goback = () => navigate('/');

    const fetchFundDetails = async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/funds/${fundId}`);
            if (!data?.data?.result) {
                toast.error(data?.data?.message);
                return;
            }
            toast.success("Fetched fundraise");
            setFundDetails(data?.data?.result);
            console.log(data?.data?.result);
            selfId === data?.data?.result?.userId ? setShowDonate(false) : setShowDonate(true);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    // stripe session 
    const stripeSession = async () => {
        try {
            const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PK}`);
            const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/donations/checkout-session/${fundDetails?._id}`, {
                product: {
                    name: fundDetails?.title,
                    amount: donationAmount,
                    userId: selfId,
                },
            }, { withCredentials: true });
            console.log(data);
            if (!data?.data?.sessionId) {
                toast.error("Session failed");
            }
            const result = await stripe.redirectToCheckout({
                sessionId: data?.data?.sessionId
            });
            if (!result) {
                toast.error("Donation failed. Please try again later");
            }
            console.log(result);
            // navigate(`success/${sessionId}`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    // donation amount and invoke checkout session
    const makePayment = (e) => {
        e.preventDefault();
        if (donationAmount < 20) {
            toast.error("Minimum donation amount is INR 20");
            return;
        }
        if (donationAmount > (fundDetails?.amount - fundDetails?.amountRaised)) {
            toast.error("Amount exceeds acceptance limit");
            return;
        }
        stripeSession();
    }

    // fetch donors
    const fetchDonors = async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/funds/donors/${fundId}`);
            if (!data?.data?.result) throw new Error("Failed to fetch donors");
            // success
            setDonors(data?.data?.result);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchFundDetails();
        fetchDonors();
    }, []);

    return (
        <>
            <div className='fund-details-wrapper'>
                <BlueButton
                    text={"←"}
                    handleClick={goback}
                />
                <h1>{fundDetails?.title}</h1>
                <h2> - {fundDetails?.orgName}</h2>
                <div className="details-subparent">
                    <div className="main-content">
                        <img src={fundDetails?.imageURL} alt="event" />
                        <div className="text-content">
                            <p>{fundDetails?.description}</p>
                            <p><b>Cause</b> : {fundDetails?.cause}</p>
                            <p><b>Deadline</b> : <BsClock />{moment(fundDetails?.deadline).format("DD MMM YYYY")}</p>
                            <p className={fundDetails?.status === "Open" ? "status open" : fundDetails?.status === "Close" ? "status close" : 'status hold'}>{fundDetails?.status}</p>
                            <h3>Amount Raising : {fundDetails?.amount}</h3>
                            <h3>Amount Raised : {fundDetails?.amountRaised}</h3>
                            <div>
                                {/* {showDonate && (<BlueButton text={"Donate"} />)} */}
                                <form
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        height: '5rem',
                                    }}
                                    onSubmit={makePayment}>
                                    {fundDetails?.status === "Open" ?
                                        <>
                                            <span>&#8377;</span>
                                            <input
                                                type="number"
                                                value={donationAmount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                            />
                                            <BlueButton
                                                text={"Donate"} />
                                        </>
                                        :
                                        <h4 style={{ color: 'red', textAlign: 'center' }}>No donation to closed fundraise</h4>
                                    }
                                </form>

                            </div>
                        </div>
                    </div>
                    <ul className="donors-list">
                        <h2 style={{fontSize:'1.8rem','textAlign':'center', margin:'1rem 0'}}>Donors 🌈</h2>
                        {
                            donors?.length > 0 ?
                                donors?.map((item, index) => (
                                    <div className='donor-card' key={index}>
                                        <img src={item?.profileImage ? item?.profileImage : fallback} alt="donor-profile" />
                                        <p>{item.name}</p>
                                        <Link to={`/profile/public/${item?._id}`}><IoEye/></Link>
                                    </div>
                                ))
                                :
                                <p className='result-message' style={{marginTop:'50%'}}>No donations yet ☹️</p>
                        }
                    </ul>
                </div>
            </div>
            <div style={{}}>
                <Warning text={"Make sure to read all the details before making any payment. In case of any discrepancy report to us right away."} />
            </div>
        </>
    )
}

export default FundDetails;