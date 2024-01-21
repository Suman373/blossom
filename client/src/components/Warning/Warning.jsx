import React from 'react';
import { AiFillWarning } from "react-icons/ai";


const Warning = ({ text }) => {
    return (
        <div
            style={{
                margin:'1rem auto',
                background: '#f8e387',
                fontSize: '1rem',
                color:'#CD7F32',
                padding:'1rem',
                textAlign:'center'
            }}
        >
            <p>
                <AiFillWarning />
                {text}
            </p>
        </div>
    )
}

export default Warning;