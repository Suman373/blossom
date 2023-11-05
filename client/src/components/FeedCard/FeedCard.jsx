import React, { useState } from 'react';
import './FeedCard.scss';
import moment from 'moment';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa';

const FeedCard = ({ item }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved]= useState(false);
    const [testLikeCount, setTestLikeCount] = useState(0);
    
    const heartBtnClick=()=>{
        if(isLiked){
            // already liked post
            setIsLiked(false); // unlike it
            setTestLikeCount((prevCount)=>prevCount-1);
        }else{ 
            // post is not liked yet
            setIsLiked(true); // mark it as liked
            setTestLikeCount((prevCount)=>prevCount+1);
        }
    }

    const bookMarkClick=()=>isSaved ? setIsSaved(false) : setIsSaved(true);


    return (
        <div className='feed-card-wrapper'>
            <div className="feed-header">
                <img src={item?.profileImage} alt="pfp" />
                <div className='feed-meta'>
                    <p id='name'>{item?.name}</p>
                    <p id='timestamp'>{moment(item?.createdAt).fromNow()}</p>
                </div>
                <i>
                    <FiMoreVertical />
                </i>

            </div>
            <div className="feed-body">
                {item?.caption}
                <img src={item?.feedImg} alt="feed" />
            </div>
            <div className="feed-footer">
                <button className='feed-icons'
                onClick={()=> heartBtnClick()}>
                    <i id="feed-icon-heart">{isLiked ? <AiFillHeart/> : <AiOutlineHeart />}</i>
                    <p>{testLikeCount}</p>
                </button>
                <button className='feed-icons'
                onClick={()=> bookMarkClick()}>
                    <i id="feed-icon-bookmark">{isSaved ? <BsBookmarkFill/> : <BsBookmark />}</i>
                </button>
                <button className='feed-icons'>
                    <i id="feed-icon-share"><FaShare /></i>
                </button>
            </div>
        </div>
    )
}

export default FeedCard;
