// import React from 'react'
// import { ProfileHeader } from './ProfilePage/Profile'
import { IoIosArrowBack } from 'react-icons/io';
import AllSuggestion from './Suggestion/AllSuggestion';
// const Notifications = () => {
//   return (
//     <div className='notification'>
// <ProfileHeader heading="Notifications"/>
//     <div className='fs-3 p-5 ms-5 me-5 p-md-0 m-md-0 mt-md-5 text-center border border-primary position-relative' style={{top:"100px"}}>No Notification Available</div>
//     </div>
//   )
// }
// export {Notifications}

import React from 'react';
import { useNavigate } from 'react-router-dom';
const Notifications = () => {
const navigate= useNavigate();

  const notifications = {
    week: [
      {
        username: 'mohd.akram408',
        description: 'who you might know, is on Instagram.',
        time: '5d',
        action: 'Follow',
      },
    ],
    month: [
      {
        usernames: 'aakib_official05 and tomar__jt_',
        description: 'liked your story.',
        time: '1w',
        imageSrc: 'https://via.placeholder.com/40', // Placeholder image
      },
      {
        usernames: 'tomar__jt_ and aakib_official05',
        description: 'liked your story.',
        time: '2w',
        imageSrc: 'https://via.placeholder.com/40', // Placeholder image
      },
      {
        usernames: 'up_20__abhishek, nitin_saini_0 and others',
        description: 'liked your story.',
        time: '3w',
        imageSrc: 'https://via.placeholder.com/40', // Placeholder image
      },
      {
        username: 'rajagholot288',
        description: 'started following you.',
        time: '3w',
        action: 'Follow',
      },
      {
        usernames: 'up_20__abhishek',
        description: 'liked your story.',
        time: '3w',
        imageSrc: 'https://via.placeholder.com/40', // Placeholder image
      },
      {
        usernames: 'up_20__abhishek',
        description: 'liked your story.',
        time: '4w',
        imageSrc: 'https://via.placeholder.com/40', // Placeholder image
      },
    ],
  };

  return (<>
  <div
      className="d-md-none text-center position-relative top-0 w-100"
      style={{ borderBottom: "1px solid #c8c8c8", height: "44px"}}
    >
      <div onClick={()=>navigate(-1)}
        className="position-absolute start-0 m-2 text-decoration-none"
      >
        <IoIosArrowBack size={22} />
      </div>
      <div className="p-2 fw-normal fs-4 pt-1 bg-white" 
      style={{ borderBottom: "1px solid #c8c8c8",}}>Notifications</div>
    </div>
    <div className="container position-relative" style={{zIndex:"5", maxWidth: '600px', margin: '20px auto' }}>
      {/* <h5 className="fw-bold">Notifications</h5> */}
 
      {/* This week */}
      <div className="mt-4">
        <h6>This week</h6>
        {notifications.week.map((notification, index) => (
          <div key={index} className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary"
                style={{ width: '40px', height: '40px', backgroundColor: '#f0f0f0' }}
              />
             <div className="ms-3">
  <p className="m-0 text-muted" style={{ fontSize: '12px' }}>
    <strong style={{ color: 'black', fontSize:"14px", fontWeight:"600"  }}>{notification.username}</strong> &nbsp; 
   <span style={{fontSize:"14px", fontWeight:"400"}}> {notification.description} </span>&nbsp; 
    <span style={{fotnSize:"14px", fontWeight:"400"}}>{notification.time}</span>
  </p>
</div>

            </div>
            <button className="btn text-white" style={{ fontSize: '14px', fontWeight:"600", backgroundColor:"rgb(0, 149, 246)",height:"32px", width:"81px" }}>
              {notification.action}
            </button>
          </div>
        ))}
      </div>

      {/* This month  insta-app*/}
      <div className="mt-4">
        <h6>This month</h6>
        {notifications.month.map((notification, index) => (
          <div key={index} className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary"
                style={{ width: '40px', height: '40px', backgroundColor: '#f0f0f0' }}
              >
                {notification.imageSrc && (
                  <img
                    src={notification.imageSrc}
                    alt=""
                    className="rounded-circle"
                    style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="ms-3">
  <p className="m-0 text-muted" style={{ fontSize: '12px' }}>
    <strong style={{ color:"black", fontSize:"14px", fontWeight:"600" }}>{notification.usernames}</strong> &nbsp; 
    <span style={{fontSize:"14px", fontWeight:"400"}}> {notification.description}</span> &nbsp; 
    <span style={{fotnSize:"14px", fontWeight:"400"}}>{notification.time}</span>
  </p>
</div>

            </div>
           
            {notification.action && (
              <button className="btn text-white" style={{ fontSize: '14px', fontWeight:"600", backgroundColor:"rgb(0, 149, 246)",height:"32px", width:"81px" }}>
                {notification.action}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    <AllSuggestion/>
    </>  );
};

export  {Notifications};
