import React from 'react';
import './BlueButton.scss';
import { Link } from 'react-router-dom';

const BlueButton = ({text,handleClick,redirect}) => {

  return (
   <>
        <button
            type='submit'
            className="blue-button"
            onClick={handleClick}>
            <Link to={redirect}>
              {text}
            </Link>
        </button>
   </>
  )
}

export default BlueButton;
