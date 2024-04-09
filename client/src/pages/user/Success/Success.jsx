import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import BlueButton from '../../../components/BlueButton/BlueButton';


const Success = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // get session_id from URLSearchParams object
    const sessionId = searchParams.get('session_id');
    const [verifyResult, setVerifyResult] = useState({});
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const verifyPayment = async () => {
        try {
            setLoading(true);
            const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/donations/payment-verification/${sessionId}`, { withCredentials: true });
            console.log(data);
            if (!data?.data?.result) throw new Error();
            toast.success("Verification successful");
            setVerifyResult(data?.data?.result);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
            setErrMsg("Verification failed. We will reach you soon");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <>
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                display: 'grid',
                placeContent: 'center',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '3rem', color: 'green' }}>Donation Successful</h1>
                {errMsg && (<h1 style={{ fontSize: '1.7rem', color: 'red' }}>{errMsg}</h1>)}
                <p style={pStyle}> We have received your payment request, please wait while we are verifying.</p>
                {
                    !loading ?
                        <>
                            <p>Name: {verifyResult?.customerDetails?.name}</p>
                            <p>Email: {verifyResult?.customerDetails?.email}</p>
                            <p>Currency: {verifyResult?.currency}</p>
                            <p>Amount: {verifyResult?.amount_total}</p>
                        </>
                        :
                        null
                }
                {loading && (
                    <>
                        <div style={{ height: "60", display: "grid", placeContent: 'center', marginTop: '2rem' }}>
                            <MoonLoader size={50} color="#067676" />
                        </div>
                    </>)
                }
                {
                    !loading && (
                        <div style={{textAlign:'center'}}>
                            <BlueButton
                                handleClick={() => navigate('/')}
                                text={"Go Back"} />
                        </div>
                    )
                }

            </div>
        </>
    )
}

const pStyle = {
    fontSize: '1.2rem',
    color: '#000',
    margin: '0.4rem auto'
};

export default Success;