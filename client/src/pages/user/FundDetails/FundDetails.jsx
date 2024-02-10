import React from 'react';
import './FundDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import BlueButton from '../../../components/BlueButton/BlueButton';

const FundDetails = () => {
    const {id:fundId} = useParams();
    const navigate = useNavigate();
    const goback=()=>navigate('/')

    return (
        <div className='fund-details-wrapper'>
            <BlueButton 
            text={"🏠 Back"}
            handleClick={goback}
            />
            <h1>Fund raise details page</h1>
        </div>
    )
}

export default FundDetails;