import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFundRaise.scss';
import { TextField, Button } from '@mui/material';
import BlueButton from '../../../components/BlueButton/BlueButton';
import { useState } from 'react';
import donationImg from '../../../assets/donation box.png';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';



const AddFundRaise = () => {

  const navigate = useNavigate();
  const { _id: userId } = useAuth();
  // states for forms and image
  const [title, setTitle] = useState("");
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const [cause, setCause] = useState("");
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


  // upload image to bucket
  const uploadImage = async () => {
    if (image == null) return;
    const imageRef = ref(storage, `fundraiseImages/${image.name + v4()}`); // the refernce to the image in the bucket
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  }

  // submission of form
  const handleFundRaiseForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imageURL = await uploadImage();
    // send data to backend
    const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/funds/`, {
      userId,
      title,
      orgName,
      description,
      cause,
      amount,
      deadline,
      imageURL
    }).catch((e) => {
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(e.message);
      }
    });
    alert(data?.data?.message);
    console.log(data?.data?.newFundraise);
    setTitle(""); setOrgName(""); setDeadline(""); 
    setDescription(""); setCause(""); setAmount(0); setImage(null);
    setLoading(false);
    navigate('/');
  }

  return (
    <main className='add-fundraise-wrapper'>
      {
        !image ? <img className="uploaded-image" src={donationImg} alt="add fund illustration" /> :
          <img className="uploaded-image" src={URL.createObjectURL(image)} alt="banner" />
      }
      <div className="form-wrapper">
        <h1>Add <span>Fundraise Details</span></h1>
        <p>You are required to fill up the necessary details</p>
        <div>
          {loading ?
            <>
              <div style={{ display: 'grid', placeContent: 'center' }}>
                <MoonLoader
                  color='#0b0b9b'
                  size={100}
                />
                <p>Submitting...</p>
              </div>
            </>
            :
            <>
              <form onSubmit={handleFundRaiseForm}>

                <TextField
                  type="text"
                  label="Organisation name"
                  id="outlined-basic"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                  placeholder='Organisation name' />

                <TextField
                  type="text"
                  label="Title"
                  id="outlined-basic"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder='Title' />

                <TextField
                  type="text"
                  label="Description"
                  id="outlined-basic"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder='Description' />

                <TextField
                  type="text"
                  label="Cause"
                  id="outlined-basic"
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  required
                  placeholder='Cause' />


                <TextField
                  type="number"
                  label="Amount"
                  id="outlined-basic"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder='Amount to be raised' />

                <label>Deadline</label>
                <TextField
                  type="date"
                  id="outlined-basic"
                  value={deadline}
                  required
                  onChange={(e) => setDeadline(e.target.value)}
                />

                <input className="file-upload"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  type="file" />
                <BlueButton
                  text={"Create"} />
              </form>
            </>
          }
        </div>
      </div>
    </main>
  )
}

export default AddFundRaise;
