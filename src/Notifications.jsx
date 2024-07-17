import React from 'react'
import { ProfileHeader } from './ProfilePage/Profile'
const Notifications = () => {
  return (
    <div className='notification'>
<ProfileHeader heading="Notifications"/>
    <div className='fs-3 p-5 ms-5 me-5 p-md-0 m-md-0 mt-md-5 text-center border border-primary position-relative' style={{top:"100px"}}>No Notification Available</div>
    </div>
  )
}
export {Notifications}