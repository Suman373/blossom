import React from 'react';
import './BlueButton.scss';
import { Link } from 'react-router-dom';

const ButtonLoader = () => {
  return (
    <div className="btn-loader"></div>
  )
}

const BlueButton = ({ text, handleClick, redirect, loading }) => {

  return (
    <>
      <button
        type='submit'
        className="blue-button"
        onClick={handleClick}>
        {/* show redirect only when redirect is passed */}
        {redirect && (<Link>{text}</Link>)}
        <p> {text} {loading && (<ButtonLoader />)}</p>
      </button>
    </>
  )
}

export default BlueButton;
