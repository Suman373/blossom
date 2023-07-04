import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFundRaise.scss';
import { TextField } from '@mui/material';
import BlueButton from '../../../components/BlueButton/BlueButton';
import { useState } from 'react';
import donationImg from '../../../assets/donation box.png';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import {MoonLoader} from 'react-spinners';

const AddFundRaise = () => {

  // route navigator 
  const navigate = useNavigate();

  // states for forms
  const [title, setTitle] = useState("");
  const [orgName, setOrgName] = useState("");
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);


  // upload image to bucket
  const uploadImage = ()=>{
    if (image == null) return;
    const imageRef = ref(storage, `fundraiseImages/${image.name + v4()}`); // the refernce to the image in the bucket
     uploadBytes(imageRef, image)
     .then((snapshot)=> {
      console.log("Image uploaded");
      getDownloadURL(snapshot.ref)
      .then((url)=>{
        console.log(url);
        setImageURL(url);
      })
     })
     .catch((err)=>console.log(err));
     
  }

  // submission of form
  const handleFundRaiseForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await uploadImage();
    // send data to backend 
    
    setTitle(""); setOrgName(""); setDeadline(""); setAmount(0); setImage(null);
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
              <div>
                <MoonLoader
                  color='##0b0b9b'
                  size={200}
                />
              </div>
            </> 
            :
            <>
              <form onSubmit={handleFundRaiseForm}>
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
                  label="Organisation name"
                  id="outlined-basic"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                  placeholder='Organisation name' />

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
