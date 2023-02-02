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
                                <h1>Total donation</h1>
                                <p>xxxx</p>

                            </div>
                            <div className="data-box">
                                <h1>Events donated</h1>
                                <p>xxx</p>
                            </div>
                            <div className="data-box">
                                <h1>Fundraise created</h1>
                                <p>XX</p>
                            </div>
                            <div className="data-box">
                                <h1>Redeem points</h1>
                                <p>XXX</p>        
                            </div>
                    </section>
            </div>
    )
}

export default UserSynopsis;
