import React, { useState } from 'react';
import './UserSynopsis.scss';

const UserSynopsis = () => {

    // states for user details from api
    const [username, setUsername] = useState("");


    return (
            <div className="synopsis" id="events">
                    <header>
                        <h1>Suman373</h1>
                    </header>
            </div>
    )
}

export default UserSynopsis;
