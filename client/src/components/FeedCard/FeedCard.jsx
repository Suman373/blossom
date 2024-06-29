import React, { useEffect, useState } from 'react';
import './FeedCard.scss';
import moment from 'moment';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa';
import pfpFallback from '../../assets/blossom_fallback.jpg';
import useAuth from '../../hooks/useAuth';

const FeedCard = ({ item }) => {
    // feedcard is same for both public view and user profile view
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [testLikeCount, setTestLikeCount] = useState(0);
    const [threeDots, setThreeDots] = useState(false);
    const [selfProfilepage, setSelfProfilePage] = useState(false); // true-> user's own profile page
    const [userOwnFeed, setUserOwnFeed] = useState(false); // true -> user's own feed card

    const {_id} = useAuth();

    const heartBtnClick = () => {
        if (isLiked) {
            // already liked post
            setIsLiked(false); // unlike it
            setTestLikeCount((prevCount) => prevCount - 1);
        } else {
            // post is not liked yet
            setIsLiked(true); // mark it as liked
            setTestLikeCount((prevCount) => prevCount + 1);
        }
    }

    console.log(item);

    const bookMarkClick = () => isSaved ? setIsSaved(false) : setIsSaved(true);

    useEffect(()=>{
        item?.userId === _id ? setUserOwnFeed(true) : setUserOwnFeed(false);
    },[]);

    return (
        <div className='feed-card-wrapper'>
            <div className="feed-header">
                <img src={item?.profileImage ? item?.profileImage : pfpFallback} alt="pfp" />
                <div className='feed-meta'>
                    <p id='name'>{item?.name}</p>
                    <p id='timestamp'>{moment(item?.createdAt).fromNow()}</p>
                </div>
                <i onClick={()=>setThreeDots(!threeDots)}>
                    <FiMoreVertical />
                </i>
                {
                    threeDots && (<>
                        <ul className='feed-three-dots'>
                           {!userOwnFeed && (<li>Report</li>)}
                           {userOwnFeed && <li>Edit</li>}
                           {userOwnFeed && <li>Delete</li>}
                        </ul>
                    </>)
                }

            </div>
            <div className="feed-body">
                {item?.caption}
                <img src={item?.feedImg} alt="feed" />
            </div>
            <div className="feed-footer">
                <button className='feed-icons'
                    onClick={() => heartBtnClick()}>
                    <i id="feed-icon-heart">{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}</i>
                    <p>{testLikeCount}</p>
                </button>
                <button className='feed-icons'
                    onClick={() => bookMarkClick()}>
                    <i id="feed-icon-bookmark">{isSaved ? <BsBookmarkFill /> : <BsBookmark />}</i>
                </button>
                <button className='feed-icons'>
                    <i id="feed-icon-share"><FaShare /></i>
                </button>
            </div>
        </div>
    )
}

export default FeedCard;
