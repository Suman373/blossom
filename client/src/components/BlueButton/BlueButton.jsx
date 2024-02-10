import React from 'react';
import './BlueButton.scss';
import { Link } from 'react-router-dom';

const ButtonLoader = () => {
  return (
    <div className="btn-loader"></div>
  )
}

const BlueButton = ({ text, handleClick, loading }) => {

  return (
    <>
      <button
        type='submit'
        className="blue-button"
        disabled={loading}
        onClick={handleClick}>
        <p> {text} {loading && (<ButtonLoader />)}</p>
      </button>
    </>
  )
}

export default BlueButton;
