import React, { useEffect, useState } from 'react';
import './FundDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import BlueButton from '../../../components/BlueButton/BlueButton';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { BsClock } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';
import Warning from '../../../components/Warning/Warning';

const FundDetails = () => {

    const navigate = useNavigate();
    const { id: fundId } = useParams();
    const { _id: selfId } = useAuth();

    // states
    const [fundDetails, setFundDetails] = useState({});
    const [showDonate, setShowDonate] = useState(false);

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

    useEffect(() => {
        fetchFundDetails();
    }, []);

    return (
        <div className='fund-details-wrapper'>
            <BlueButton
                text={"←"}
                handleClick={goback}
            />
            <h1>{fundDetails?.title}</h1>
            <h2> - {fundDetails?.orgName}</h2>
            <div className="main-content">
                <img src={fundDetails?.imageURL} alt="event" />
                <div className="text-content">
                    <p>{fundDetails?.description}</p>
                    <p><b>Cause</b> : {fundDetails?.cause}</p>
                    <p><b>Deadline</b> : <BsClock />{moment(fundDetails?.date).format("MMM Do")}</p>
                    <p className={fundDetails?.status==="Open" ? "status open" : fundDetails?.status==="Close" ?  "status close" : 'status hold'}>{fundDetails?.status}</p>
                    <h3>Amount Raising : {fundDetails?.amount}</h3>
                    <div style={{ textAlign: 'center' }}>
                        {showDonate && (<BlueButton text={"Donate"} />)}
                    </div>
                </div>
            </div>
            <div style={{maxWidth:'30rem'}}>
            <Warning text={"Make sure to read all the details before making any payment. In case of any discrepancy report to us right away."}/>
            </div>
        </div>
    )
}

export default FundDetails;