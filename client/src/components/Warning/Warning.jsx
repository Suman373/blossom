import React from 'react';
import { AiFillWarning } from "react-icons/ai";


const Warning = ({ text }) => {
    return (
        <div
            style={{
                margin:'1rem auto',
                background: '#f9e9a0',
                fontSize: '1rem',
                color:'#b56f2a',
                padding:'1rem',
                textAlign:'center'
            }}
        >
            <p>
                <AiFillWarning />{" "}
                {text}
            </p>
        </div>
    )
}

export default Warning;