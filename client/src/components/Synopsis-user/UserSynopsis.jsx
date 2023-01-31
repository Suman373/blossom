import React, { useState } from 'react';
import './UserSynopsis.scss';

const UserSynopsis = () => {

    // states for user details from api
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
                    <section className='user-data-container'>
                            <div className="data-box">
                                <h1>Donations done</h1>
                                <p>currency 54500 </p>

                            </div>
                            <div className="data-box">
                                <h1>Events created</h1>
                                <p>5</p>
                            </div>
                            <div className="data-box">
                                <h1>Organisations</h1>
                                <p>3</p>
                            </div>
                            <div className="data-box">
                                <h1>Redeem points</h1>
                                <p>29</p>        
                            </div>
                    </section>
            </div>
    )
}

export default UserSynopsis;
