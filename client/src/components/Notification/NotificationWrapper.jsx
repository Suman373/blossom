import React from 'react';
import './NotificationWrapper.scss';
import notifications from '../../data/notifications';

const NotificationWrapper = ({setNotificationCount}) => {
    setNotificationCount(0);
    return (
        <>
            <ul className="notifications-wrapper">
              {
                    notifications?.length > 0 ?
                        notifications?.map((notification, index) => (
                            <>
                                <li className="notification-item" key={index}>
                                   {notification?.title}
                                </li>
                            </>
                        ))
                        :
                        <p 
                        style={{marginTop:'2rem'}}
                        className='result-message'>No new notifications</p>
                }
              </ul>
        </>
    )
}

export default NotificationWrapper;