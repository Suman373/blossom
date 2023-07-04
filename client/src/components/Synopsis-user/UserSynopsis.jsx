import React, { useState } from 'react';
import './UserSynopsis.scss';

const UserSynopsis = () => {

    const [username, setUsername] = useState("");

    const userLevel = "Platinum";

    return (
            <div className="synopsis" id="events">
                    <header>
                        <h1>Suman373
                             <span className={
                                userLevel==="Bronze" ? 'bronze' :
                                userLevel==="Gold" ? 'gold':
                                userLevel==="Platinum" ? 'platinum':
                                ''
                             }>
                                {userLevel}
                             </span>
                        </h1>
                        <div className="usage-period">
                            {/* <p>Current usage : (Dec 1 - Dec 31)</p> */}
                        </div>
                    </header>
                    <div className='welcome'>
                        <p>Welcome back 💙</p>
                    </div>
            </div>
    )
}

export default UserSynopsis;
