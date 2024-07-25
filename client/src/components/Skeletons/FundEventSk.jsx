import React from 'react';
import Skeleton from 'react-loading-skeleton';

const FundEventSk = ({ cards }) => {
    return Array(cards).fill(0).map((item, index) => (
        <div className='fund-item' key={index}>
            {/* img */}
            <Skeleton height={240} />
            <p style={{ lineHeight: 2 }}><Skeleton height={25} count={3} /></p>
            <button className=''></button>
            <div style={{ textAlign: 'center' }}>
                <button style={{ padding: '1rem 4rem', border: 'none' }}><Skeleton /></button>
            </div>
        </div>
    ))
}

export default FundEventSk;