import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import {Insta} from '../Insta'
import 'bootstrap/dist/css/bootstrap.min.css';  // Import the CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import the JS bundle (with Popper.js)
import Explore from '../Explore';
import Chat from '../chat/Chat'
import Login from '../Authencation/Login'
import '../insta.css'
import '../ProfilePage/profile.css'
import {Profile} from '../ProfilePage/Profile'
import {Reels} from '../Reels'
import { Notifications } from '../Notifications'
import Otp from '../Authencation/Otp'
import Birth from '../Authencation/Birth'
import EditMain from '../EditPage/EditMain'
import NavigatePost from '../ProfilePage/NavigatePost'
import StoryFeature from '../story/StoryFeature';
import CreateStory from '../story/CreateStory';
const PathTo = () => {
  
  return (
  
    <Routes>
      <Route path="/insta/story/:userId" element={<StoryFeature/>} />
        <Route path="/insta" element={<Insta/>}  />
        <Route path="/insta/login" element={<Login/>}  />
        <Route path="/insta/create/story" element={<CreateStory/>}  />

        <Route path="/insta/Otp" element={<Otp/>}  />
        <Route path="/insta/dob" element={<Birth/>}  />
        <Route path="/insta/edit" element={<EditMain/>}  />
        <Route path="/insta/chat" element={<Chat/>}  />
        <Route path="/insta/explore" element={<Explore/>}  />
        <Route path="/insta/:postorreel/:userId" element={< NavigatePost/>}  />
        <Route path="/insta/messages" element={<Chat/>}  />
        <Route path="/insta/profile/:userId" element={<Profile/>}  />
        <Route path="/insta/reels" element={<Reels/>}  />    
        <Route path="/insta/notifications" element={<Notifications/>}  />    



    </Routes>
    
  )
}

export default PathTo
