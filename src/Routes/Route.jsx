import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import {Insta} from '../Insta'
import 'bootstrap/dist/css/bootstrap.min.css';  // Import the CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import the JS bundle (with Popper.js)

import Chat from '../chat/Chat'

import Login from '../Authencation/Login'
// import Register from '../Register'
import '../insta.css'
import '../ProfilePage/profile.css'
// import '../ProfilePage/profile.css'
import Message from '../Message'
import {Profile} from '../ProfilePage/Profile'
import {Reels} from '../Reels'
import { Notifications } from '../Notifications'
import Otp from '../Authencation/Otp'
import Birth from '../Authencation/Birth'
// import EditProfile from '../EditPage/EditProfile'
import EditMain from '../EditPage/EditMain'
import SuggestionMain from '../Suggestion/SuggestionMain';
const PathTo = () => {
  
  return (
  
    <Routes>
        <Route path="/insta-app" element={<Insta/>}  />
        <Route path="/insta-app/login" element={<Login/>}  />
        <Route path="/insta-app/Otp" element={<Otp/>}  />
        <Route path="/insta-app/dob" element={<Birth/>}  />
        <Route path="/insta-app/edit" element={<EditMain/>}  />
        <Route path="/insta-app/chat" element={<Chat/>}  />
        <Route path="/insta-app/all" element={<SuggestionMain/>}  />
       
        {/* <Route path="/insta-app/register" element=/{<Register/>}  /> */}
        <Route path="/insta-app/messages" element={<Chat/>}  />
        {/* <Route path="/insta-app/profile" element={<Profile/>}  />   */}
        <Route path="/insta-app/profile/:userId" element={<Profile/>}  />
        <Route path="/insta-app/reels" element={<Reels/>}  />    
        <Route path="/insta-app/notifications" element={<Notifications/>}  />    



    </Routes>
    
  )
}

export default PathTo
