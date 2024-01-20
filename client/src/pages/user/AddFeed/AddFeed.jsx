import React, { useState } from 'react';
import './AddFeed.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BlueButton from '../../../components/BlueButton/BlueButton';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../config/firebase';
import { v4 } from 'uuid';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #276ecc',
    boxShadow: 20,
    p: 4,
    borderRadius: 5
};

const AddFeed = ({ modalOpen, setModalOpen }) => {

    // user's id
    const userObj = useAuth();

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // modal toggle function
    const handleClose = () => setModalOpen(false);

    // upload file to storage bucket using 
    const uploadImage = async()=>{
        if(image == null) return;
        const imageRef = ref(storage, `feedImages/${image.name+v4()}`);
        await uploadBytes(imageRef,image);
        const url = await getDownloadURL(imageRef);
        return url;
    }

    const handleCreateFeed = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // uploading feed image to fire bucket
            const imageURL = await uploadImage();
            // sending payload to server
            const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/feeds/`,{
                name:userObj.name,
                userId:userObj._id,
                profileImage:userObj.profileImage,
                caption,
                feedImg:imageURL
            });
            if(!data){
                throw Error({message:"Feed upload failed"});
            }
            alert("Feed uploaded successfully");
            setCaption(""); setImage(null);
            handleClose();
        } catch (error) {
            if(error.response){
                console.log(error.response);
            }else{
                console.log(error.message);
            }
        }
        setLoading(false);
    }


    return (
        <>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create your feed
                    </Typography>
                    <div>
                        <form className='create-feed-form' onSubmit={handleCreateFeed}>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows={5}
                                cols={30}
                                placeholder="Share the joy with all of us"
                                required={true} />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])} />

                            {
                                !loading ? (
                                    <BlueButton
                                        text={'Post feed'} />
                                )
                                    :
                                    (
                                        <>
                                            <p className='result-message'>
                                                Posting
                                            </p>
                                        </>
                                    )
                            }
                            {
                                image && (
                                    <img className='selected-image' src={URL.createObjectURL(image)} />
                                )
                            }
                        </form>
                        <p
                            style={{ color: "#e0bc1a" }}>
                            Warning! Only image files are accepted</p>
                    </div>
                </Box>
            </Modal>

        </>
    )
}

export default AddFeed;