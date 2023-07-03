import React from 'react';
import './BlueButton.scss';

const BlueButton = ({text,handleClick}) => {

  return (
   <>
        <button
            type='submit'
            className="blue-button"
            onClick={handleClick}>
            {text}
        </button>
   </>
  )
}

export default BlueButton;
