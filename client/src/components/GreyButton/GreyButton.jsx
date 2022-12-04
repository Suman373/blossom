import React from 'react';
import './GreyButton.scss';

const GreyButton = ({text, addNewEvent}) => {
  return (
    <>
      <button className='grey-button'
      onClick={addNewEvent}>
        {text}
      </button>
    </>
  )
}

export default GreyButton;
