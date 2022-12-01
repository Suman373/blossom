import React from 'react';
import './BlueButton.scss';

const BlueButton = ({text,handleClick}) => {

  return (
   <>
        <button
            onClick={handleClick}>
            {text}
        </button>
   </>
  )
}

export default BlueButton;
